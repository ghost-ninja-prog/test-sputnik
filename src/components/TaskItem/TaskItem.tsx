import React from 'react'
import styled from 'styled-components'
import { Button, Checkbox, Flex, Tooltip } from 'antd'
import { DeleteOutlined, StarOutlined } from '@ant-design/icons'

import { TaskType } from '../TaskList/TasksList'


type TaskItemPropsType = {
    task: TaskType 
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

export const TaskItem: React.FC<TaskItemPropsType> = ({ task }) => {


  const onChangeHandler = () => {
    console.log('Click checkbox')
  }

  const favoritesHandler = () => {
    console.log('Click Favorites button')
  }

  return (
    <Task>
      <Flex gap='small'>
        <Checkbox
          onChange={onChangeHandler} 
          checked={task.attributes.status === 'completed' ? true : false}
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
        <p>{task.attributes.title}</p>
        <p>{task.attributes.description}</p>
      </div>
      <Tooltip title='delete'>
        <Button
          type='primary'
          danger
          icon={<DeleteOutlined />}
        />
      </Tooltip>
    </Task>
  )
}