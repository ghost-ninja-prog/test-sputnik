import React, { useCallback, useEffect, useRef } from 'react'
import { TaskItem } from '../TaskItem/TaskItem'
import styled from 'styled-components'

import { useTasksStore } from '../../store/useTasksStore'

import MyLoader from '../Skeleton/Skelelton'
import { useFavoritesStore } from '../../store/useFavoritesStore'


const TaskList = styled.div`
    padding: 8px 6px;
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    height: 400px;
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: #afaeae #fff;
    `

type TTodoListPropsType = {
    selectedCategory: string
}


export const TasksList: React.FC<TTodoListPropsType> = ({ selectedCategory }) => {

    

    const { tasks, page, pageCount, loading, totalTasks, fetchTasks, changePage, updateTask, deleteTask } = useTasksStore(state => state)
    const { favoritesTasks, addToFavorites, deleteFromFavorites, updateFavorites  } = useFavoritesStore(state => state)

    const observer = useRef<IntersectionObserver>(null)

    const filteredTasks = tasks.filter(task => {
		if (selectedCategory === 'all') {
			return task
		} else if (selectedCategory === 'completed') {
			return task.attributes.status === 'completed'
		} else if (selectedCategory === 'active') {
			return task.attributes.status === 'active'
		}
	})

    useEffect(() => {
        fetchTasks(page)
    }, [page, fetchTasks])


    const taskElementRef: (el: HTMLDivElement) => void = useCallback(
        (el) => {
            if(loading) return
            if(observer.current) observer.current.disconnect()
            if(tasks.length === totalTasks || page === pageCount) return
            
            observer.current = new IntersectionObserver((entries) => {
                if(entries[0].isIntersecting) {
                    changePage(page + 1)
                }
            },
            {
                root: document.querySelector('#listTaskRef'),
                rootMargin: '0px',
                threshold: 1.0
            })
            if(el) observer.current?.observe(el)
        },
        [loading, changePage, page, pageCount, totalTasks, tasks.length]
    )

  return (
    <TaskList id='listTaskRef'>
        { selectedCategory === 'favorites' ? 
            favoritesTasks.map(task => (
                <TaskItem 
                    key={task.id}
                    task={task}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                    addToFavorites={addToFavorites}
                    deleteFromFavorites={deleteFromFavorites}
                    updateFavorites={updateFavorites}
                />
            ))
            :
            filteredTasks.map((task, index) => (
                <TaskItem 
                    key={task.id}
                    task={task}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                    addToFavorites={addToFavorites}
                    deleteFromFavorites={deleteFromFavorites}
                    updateFavorites={updateFavorites}
                    taskElementRef={filteredTasks.length === index + 1 ? taskElementRef : null}

                />
            ))
        }
        {loading && <MyLoader />}
    </TaskList>
  )
}