import React, { memo, useState } from 'react'
import styled from 'styled-components'
import { Button, Checkbox, Flex, Tooltip } from 'antd'
import { CheckOutlined, DeleteOutlined, EditOutlined, StarOutlined } from '@ant-design/icons'
import { TTaskType, TUpdateDataType } from '../../store/useTasksStore'

const Task = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 10px;
  border-radius: 5px;
  border: 1px solid rgba(0,0,0, .3);
  min-height: 95px;
  transition: transform .2s ease-in-out;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 1px 1px 5px rgba(0,0,0, .3);
  }
`

const WrapperTaskContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  width: 100%;
  margin: 0 12px;
  text-align: left;
`
const TitleTask = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
  text-transform: uppercase;
`

const Description = styled.p`
  font-size: 16px;
`

const InputTitle = styled.input`
  padding: 0;
  height: 20px;
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 5px;
  border: none;
  border-bottom: 1px solid #d9d9d9;
  &:focus-visible {
    border: none;
    outline: none;
  }
  &:focus {
    border-bottom: 1px solid #1677ff;
  }
`
const InputDescription = styled.input`
  padding: 0;
  height: 20px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #d9d9d9;
  &:focus-visible {
    border: none;
    outline: none;
  }
  &:focus {
    border-bottom: 1px solid #1677ff;
  }
`

type TTaskItemPropsType = {
  task: TTaskType,
  updateTask: (task: TUpdateDataType) => void,
  deleteTask: (id: number) => void,
  addToFavorites: (newTask: TTaskType) => void,
  deleteFromFavorites: (id: number) => void,
  updateFavorites: (updateTask: TTaskType) => void,
  taskElementRef?: ((el: HTMLDivElement) => void) | null
}

export const TaskItem: React.FC<TTaskItemPropsType> = memo(
  function TaskItem({
    task,
    deleteTask,
    updateTask,
    addToFavorites,
    deleteFromFavorites,
    updateFavorites,
    taskElementRef
  }) {

    const [isEditMode, setIsEditMode] = useState(false)
    const [statusValue, setStatusValue] = useState(task.attributes.status)
    const [titleValue, setTitleValue] = useState(task.attributes.title)
    const [descriptionValue, setDescriptionValue] = useState(task.attributes.description)

    
    const changeTitleInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitleValue(e.target.value)
    }

    const changeDescriptionInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setDescriptionValue(e.target.value)
    }

    const checkboxHandler = () => {
      if (statusValue === 'active') {
        setStatusValue('completed')
      } else {
        setStatusValue('active')
      }
      if (task.favorite) {
        const updateFavoriteTask = {
          ...task,
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
      if (task.favorite) {
        deleteFromFavorites(task.id)
      } else {
        deleteTask(task.id)
      }
    }

    const onClickFavoritesHandler = () => {
      addToFavorites(task)
    }

    const onClickBtnEdit = () => {
      setIsEditMode(true)
    }

    const onClickBtnSave = () => {
      setIsEditMode(false)
      if (task.favorite) {
        const updateFavoriteTask = {
          ...task,
          attributes: {
            ...task.attributes,
            status: statusValue,
            title: titleValue,
            description: descriptionValue
          }
        }
        updateFavorites(updateFavoriteTask)

      } else {

        const updateData: TUpdateDataType = {
          id: task.id,
          payload: {
            data: {
              status: statusValue,
              title: titleValue,
              description: descriptionValue
            }
          }
        }
        updateTask(updateData)
      }
    }

    return (
      <Task ref={taskElementRef}>

        <Flex gap='small'>
          <Checkbox
            data-testid='checkboxTask'
            onChange={checkboxHandler}
            checked={statusValue === 'active' ? false : true}
          />
          <Tooltip
            title='favorites'
          >
            <Button
              data-testid='btnFavorites'
              onClick={onClickFavoritesHandler}
              type='primary'
              shape='circle'
              icon={<StarOutlined />}
            />
          </Tooltip>
        </Flex>

        {isEditMode ? (

          <WrapperTaskContent>
            <InputTitle
              data-testid='inputTitle'
              value={titleValue} 
              onChange={changeTitleInputHandler}
            />
            <InputDescription
              data-testid='inputDescription'
              value={descriptionValue} 
              onChange={changeDescriptionInputHandler}
            />
          </WrapperTaskContent>

        ) : (

          <WrapperTaskContent>
            <TitleTask data-testid='titleTask'>{task.attributes.title}</TitleTask>
            <Description data-testid='descriptionTask'>{task.attributes.description}</Description>
          </WrapperTaskContent>

        )}

        <Flex gap='small'>
          {isEditMode ? (
            <Tooltip title="save">
              <Button
                data-testid='btnSave'
                onClick={onClickBtnSave}
                type="primary"
                shape="circle"
                icon={<CheckOutlined />}
              />
            </Tooltip>
          ) : (
            <Tooltip title="edit">
              <Button
                data-testid='btnEdit'
                onClick={onClickBtnEdit}
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
              />
            </Tooltip>
          )}
          <Tooltip title='delete'>
            <Button
              data-testid='btnDelete'
              onClick={onClickDeleteHandler}
              type='primary'
              shape='circle'
              icon={<DeleteOutlined />}
            />
          </Tooltip>
        </Flex>
      </Task>
    )
  })