import React, { useEffect } from 'react'
import { TaskItem } from '../TaskItem/TaskItem'
import styled from 'styled-components'
import { useTasksStore } from '../../store/useTasksStore'

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
                <TaskItem task={task} key={task.id} />
            ))
        }
        {loading && <p>Loading...</p>}
    </TaskList>
  )
}