import React, { useEffect } from 'react'
import { TodoItem } from '../TodoItem'


import styles from './index.module.css'

import { useTodoStore } from '../../store/useToDoStore'
import { useFavoritesStore } from '../../store/useFavoritesStore'
import InfiniteScroll from 'react-infinite-scroll-component'
import MyLoader from '../Skeleton'



type TodoListProps = {
	selectedValue: string
}

export const TodoList: React.FC<TodoListProps> = ({ selectedValue }) => {

	const { todos, fetchTodos, currentPage, totalTodos } = useTodoStore((state) => state)
	const { favoritesTodos } = useFavoritesStore((state) => state)

	console.log(currentPage)

	useEffect(() => {
		fetchTodos()
	}, [])

	return (
		<div
			className={styles.todoList}
			id="scrollableDiv"
			style={{
				height: 300,
				overflow: 'auto',
				padding: '0 16px',
			}}
		>

			{selectedValue !== 'favorites' ?

			<InfiniteScroll
				dataLength={todos.length}
				next={() => fetchTodos(currentPage)}
				hasMore={todos.length < totalTodos}
				loader={<MyLoader />}
				scrollableTarget="scrollableDiv"
			>
				{todos.filter(todo => {
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
                ))}
			</InfiniteScroll>                

            :
			<InfiniteScroll
				dataLength={todos.length}
				next={() => fetchTodos(currentPage)}
				hasMore={todos.length < totalTodos}
				loader={<MyLoader />}
				scrollableTarget="scrollableDiv"
			>
                {favoritesTodos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
				</InfiniteScroll>                

            }
		</div>

	);
}
