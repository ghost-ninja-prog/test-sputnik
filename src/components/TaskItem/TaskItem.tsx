import React from 'react'
import styled from 'styled-components'
import { Button, Checkbox, Flex, Tooltip } from 'antd'
import { DeleteOutlined, StarOutlined } from '@ant-design/icons'

import { UpdateDataType, useTasksStore } from '../../store/useTasksStore'




type TaskItemPropsType = {
  id: number,
  title: string,
  description: string,
  status: string
}

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

export const TaskItem: React.FC<TaskItemPropsType> = ({ id, title, status, description }) => {

  const { updateTask, deleteTask } = useTasksStore(state => state)


  const onChangeHandler = () => {
    const updateData: UpdateDataType = {
      id: id,
      payload: {
        data: {
          status: status === 'active' ? 'completed' : 'active',
          title: title,
          description: description
        }
      }
    }
    updateTask(updateData)
  }

  const onClickDeleteHandler = () => {
    deleteTask(id)
  }

  const favoritesHandler = () => {
    console.log('Click Favorites button')
  }

  console.log(title, status)

  return (
    <Task>
      <Flex gap='small'>
        <Checkbox
          onChange={onChangeHandler} 
          checked={ status === 'active' ? false : true }
        />
        <Tooltip 
          title='favorites'
        >
          <Button
            onClick={favoritesHandler}
            type='primary'
            shape='circle'
            icon={<StarOutlined />}
          />
        </Tooltip>
      </Flex>
      <div>
        <p>{title}</p>
        <p>{description}</p>
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