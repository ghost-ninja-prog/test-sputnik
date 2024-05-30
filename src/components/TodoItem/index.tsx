import React, { useState } from 'react'

import { Button, Checkbox, Flex, Tooltip } from 'antd'
import { CheckOutlined, DeleteOutlined, EditOutlined, StarOutlined } from '@ant-design/icons'

import styles from './index.module.css'

import { useTodoStore } from '../../store/useToDoStore'
import { useFavoritesStore } from '../../store/useFavoritesStore'

type TodoItemProps = {
	todo: {
		attributes: {
			title: string,
			description: string,
			status: string
		},
		id: number,
		favorites?: boolean
	}
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {


	const { deleteTodo, updateTodo } = useTodoStore(state => state)
	const { addToFavorites, updateFavotites, removeFromFavorites } = useFavoritesStore(state => state)

	const [isEditMode, setIsEditMode] = useState(false)

	const [titleValue, setTitleValue] = useState(todo.attributes.title)
	const [descriptionValue, setDescriptionValue] = useState(todo.attributes.description)
	const [statusValue, setStatusValue] = useState(todo.attributes.status)


	const changeHandler = () => {
		if (statusValue === 'active') {
			setStatusValue('completed')
		} else {
			setStatusValue('active')
		}
		if (todo.favorites) {
			updateFavotites({
				id: todo.id,
				favorites: true,
				attributes: {
					title: titleValue,
					description: descriptionValue,
					status: statusValue === 'active' ? 'completed' : 'active'
				}
			})
		} else {
			updateTodo({
				id: todo.id,
				payload: {
					data: {
						description: todo.attributes.description,
						title: todo.attributes.title,
						status: statusValue === 'active' ? 'completed' : 'active'
					}
				}
			})
		}

	}

	const handlerSaveBtn = () => {
		setIsEditMode(false)
		if(todo.favorites) {
			updateFavotites({
				id: todo.id,
				favorites: true,
				attributes: {
					title: titleValue,
					description: descriptionValue,
					status: statusValue
				}
			})
		} else {
			updateTodo({
				id: todo.id,
				payload: {
					data: {
						title: titleValue,
						description: descriptionValue,
						status: statusValue
					}
				}
			})
		}
	}

	const handlerRemoveBtn = () => {
		if(todo.favorites) {
			removeFromFavorites(todo.id)
		} else {
			deleteTodo(todo.id)
		}
	}


	const handlerClickStar = () => {
		addToFavorites(todo)
	}

 


	return (
		<div className={styles.todoItem}>
			<Flex wrap gap="small">

				<Checkbox 
					onChange={changeHandler} 
					checked={statusValue === 'active' ? false : true}
					/>
				<Tooltip title="favorites">
					<Button onClick={handlerClickStar} type="primary" shape="circle" icon={<StarOutlined />} />
				</Tooltip>
			</Flex>

			<div className={styles.todoText}>

				{isEditMode ? (
					<input
						className={styles.inputTitle}
						value={titleValue}
						onChange={(e) => setTitleValue(e.target.value)}
					/>
				) : (
					<h6 style={ todo.attributes.status === 'completed' ? {"textDecoration" : "line-through"} : {}}>{todo.attributes.title}</h6>
				)}

				{isEditMode ? (
					<input
						className={styles.inputDesc}
						value={descriptionValue}
						onChange={(e) => setDescriptionValue(e.target.value)}
					/>
				) : (
					<p>{todo.attributes.description}</p>
				)}
			</div>

			<div className={styles.btnWrap}>
				{isEditMode ? (
					<Tooltip title="save">
						<Button 
							onClick={handlerSaveBtn}
							type="primary" 
							shape="circle" 
							icon={<CheckOutlined />}
						/>
					</Tooltip>
				) : (
					<Tooltip title="edit">
						<Button 
							onClick={() => {
										setIsEditMode(true)
									}}
							type="primary" 
							shape="circle" 
							icon={<EditOutlined />}
						/>
					</Tooltip>
				)
				}
				<Tooltip title="delete">
					<Button 
						onClick={handlerRemoveBtn}
						type="primary" 
						shape="circle" 
						icon={<DeleteOutlined />}
					/>
				</Tooltip>
				{/* <button
					aria-label='Remove'
					className={styles.todoRemove}
					onClick={handlerRemoveBtn}
				/> */}
			</div>
		</div>
	)
}
