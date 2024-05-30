import React, { useEffect } from 'react'
import { TodoItem } from '../TodoItem'
import { Spin } from 'antd'


import styles from './index.module.css'

import { useTodoStore } from '../../store/useToDoStore'
import { useFavoritesStore } from '../../store/useFavoritesStore'



type TodoListProps = {
	selectedValue: string
}

export const TodoList: React.FC<TodoListProps> = ({ selectedValue }) => {

	const { todos, fetchTodos, loading } = useTodoStore((state) => state)
	const { favoritesTodos } = useFavoritesStore((state) => state)


	console.log(todos)



	useEffect(() => {

		fetchTodos()

	}, [])


	return (
		<div className={styles.todoList}>

			<Spin spinning={loading} />

			{todos.length === 0 && <h5>No todos...</h5>}


			{selectedValue !== 'favorites' ?

				todos.filter(todo => {
					if (selectedValue === 'all') {
						return todo
					} if (selectedValue === 'active') {
						return todo.attributes.status === 'active'
					} if (selectedValue === 'completed') {
						return todo.attributes.status === 'completed'
					}
					return todo
				}).map((todo) => (
					<TodoItem key={todo.id} todo={todo} />
				))

				:

				favoritesTodos.map((todo) => (
					<TodoItem key={todo.id} todo={todo} />
				))

			}
		</div>

	);
}
