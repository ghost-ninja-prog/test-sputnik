import React, { useEffect } from 'react'
import { TaskItem } from '../TaskItem/TaskItem'
import styled from 'styled-components'

import { useTasksStore } from '../../store/useTasksStore'

import MyLoader from '../Skeleton/Skelelton'

type TodoListPropsType = {
    selectedCategory: string
}

const TaskList = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    height: 300px;
    overflow-x: auto;
`

export const TasksList: React.FC<TodoListPropsType> = ({ selectedCategory }) => {

    const { tasks, page, loading, fetchTasks } = useTasksStore(state => state)

    useEffect(() => {
        fetchTasks(page)
    }, [page])

  return (
    <TaskList>
        <p>{selectedCategory}</p>
        {
            tasks.map(task => (
                <TaskItem 
                    key={task.id}
                    id={task.id}
                    title={task.attributes.title}
                    description={task.attributes.description}
                    status={task.attributes.status}
                />
            ))
        }
        {loading && <MyLoader />}
    </TaskList>
  )
}