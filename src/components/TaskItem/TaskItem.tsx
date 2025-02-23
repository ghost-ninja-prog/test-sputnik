import React from 'react'
import styled from 'styled-components'
import { Button, Checkbox, Flex, Tooltip } from 'antd'
import { DeleteOutlined, StarOutlined } from '@ant-design/icons'

import { TTaskType, TUpdateDataType, useTasksStore } from '../../store/useTasksStore'
import { useFavoritesStore } from '../../store/useFavoritesStore'





const Task = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 10px;
  border-radius: 5px;
  border: 1px solid rgba(0,0,0, .3);
  transition: transform .2s ease-in-out;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 1px 1px 5px rgba(0,0,0, .3);
  }
  `
  
  type TTaskItemPropsType = {
    task: TTaskType,
    taskElementRef?: ((el: HTMLDivElement) => void) | null
  }

export const TaskItem: React.FC<TTaskItemPropsType> = ({ task, taskElementRef }) => {

  const { updateTask, deleteTask } = useTasksStore(state => state)
  const { addToFavorites, deleteFromFavorites, updateFavorites } = useFavoritesStore(state => state)

  const onChangeHandler = () => {
    if(task.favorite) {

      const updateFavoriteTask = {
        ...task,
        favorite: true,
        attributes: {
          ...task.attributes,
          status: task.attributes.status === 'active' ? 'completed' : 'active',
        }
      }
      updateFavorites(updateFavoriteTask)

    } else {

      const updateData: TUpdateDataType = {
        id: task.id,
        payload: {
          data: {
            status: task.attributes.status === 'active' ? 'completed' : 'active',
            title: task.attributes.title,
            description: task.attributes.description
          }
        }
      }
      updateTask(updateData)

    }
  }

  const onClickDeleteHandler = () => {
    if(task.favorite) {
      deleteFromFavorites(task.id)
    } else {
      deleteTask(task.id)
    }
  }

  const onClickFavoritesHandler = () => {
    addToFavorites(task)
  }


  return (
    <Task ref={taskElementRef}>
      <Flex gap='small'>
        <Checkbox
          onChange={onChangeHandler} 
          checked={ task.attributes.status === 'active' ? false : true }
        />
        <Tooltip 
          title='favorites'
        >
          <Button
            onClick={onClickFavoritesHandler}
            type='primary'
            shape='circle'
            icon={<StarOutlined />}
          />
        </Tooltip>
      </Flex>
      <div>
        <p>{task.attributes.title}</p>
        <p>{task.attributes.description}</p>
      </div>
      <Tooltip title='delete'>
        <Button
          onClick={onClickDeleteHandler}
          type='primary'
          danger
          icon={<DeleteOutlined />}
        />
      </Tooltip>
    </Task>
  )
}