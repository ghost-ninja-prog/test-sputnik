import React, { useEffect, useState } from 'react'
import { TaskItem } from '../TaskItem/TaskItem'
import styled from 'styled-components'

type TodoListPropsType = {
    selectedCategory: string
}

export type TaskType = {
    id: number,
    attributes: {
        status: string,
        title: string,
        description: string,
        createdAt: string,
        updatedAt: string,
        publishedAt: string
    }
}

const TaskList = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 5px;

`

export const TasksList: React.FC<TodoListPropsType> = ({ selectedCategory }) => {

    const [tasks, setTasks] = useState<TaskType[]>([])

    useEffect(() => {
        (async () => {
            const response = await fetch('https://cms.laurence.host/api/tasks')
            const fetchTasks = await response.json()
            setTasks(fetchTasks.data)
        })()
    }, [])

  return (
    <TaskList>
        <p>{selectedCategory}</p>
        {
            tasks.map(task => (
                <TaskItem task={task} key={task.id} />
            ))
        }
    </TaskList>
  )
}