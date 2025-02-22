import React, { useEffect } from 'react'
import { TaskItem } from '../TaskItem/TaskItem'
import styled from 'styled-components'

import { useTasksStore } from '../../store/useTasksStore'

import MyLoader from '../Skeleton/Skelelton'
import { useFavoritesStore } from '../../store/useFavoritesStore'

type TodoListPropsType = {
    selectedCategory: string
}

const TaskList = styled.div`
    padding: 8px 6px;
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    height: 300px;
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: #afaeae #fff;
`

export const TasksList: React.FC<TodoListPropsType> = ({ selectedCategory }) => {

    const { tasks, page, loading, fetchTasks } = useTasksStore(state => state)
    const { favoritesTasks } = useFavoritesStore(state => state)

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
    }, [page])

  return (
    <TaskList>
        { selectedCategory === 'favorites' ? 
            favoritesTasks.map(task => (
                <TaskItem 
                    key={task.id}
                    task={task}
                />
            ))
            :
            filteredTasks.map(task => (
                <TaskItem 
                    key={task.id}
                    task={task}
                />
            ))
        }
        {loading && <MyLoader />}
    </TaskList>
  )
}