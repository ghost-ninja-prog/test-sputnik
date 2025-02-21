import React, { useEffect, useState } from 'react'

type TodoListPropsType = {
    selectedCategory: string
}

export const TodoList: React.FC<TodoListPropsType> = ({ selectedCategory }) => {

    type TaskType = {
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
    const [tasks, setTasks] = useState<TaskType[]>([])

    useEffect(() => {
        (async () => {
            const response = await fetch('https://cms.laurence.host/api/tasks')
            const fetchTasks = await response.json()
            setTasks(fetchTasks.data)
        })()
    }, [])

  return (
    <div>
        <p>{selectedCategory}</p>
        {
            tasks.map(task => (
                <div key={task.id}>
                    <p>{task.attributes.title}</p>
                    <p>{task.attributes.description}</p>
                </div>
            ))
        }
    </div>
  )
}