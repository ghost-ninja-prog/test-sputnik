import React, { useState } from 'react'

import styles from './index.module.css'
import { useTodoStore } from '../../store/useToDoStore'
import { Button, Input } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'



export const AddTodo: React.FC = () => {

  const { addTodo } = useTodoStore((state) => state)

  const [inputTitle, setInputTitle] = useState('')
  const [inputDesc, setInputDesc] = useState('')


  const createNewTodo = () => {
    const payload = {
      data: {
        title: inputTitle,
        description: inputDesc,
        status: 'active'
      }
    }
    addTodo(payload)
    setInputTitle('')
    setInputDesc('')
  }

    
  return (
    <div className={styles.addTodo}>
      <Input 
        placeholder='Введите название'
        value={inputTitle}
        onChange={(e) => setInputTitle(e.target.value)}
        onPressEnter={createNewTodo}
        style={{ width: '100%' }}
      />
      <Input
        placeholder='Введите описание'
        value={inputDesc}
        onChange={(e) => setInputDesc(e.target.value)}
        onPressEnter={createNewTodo}
        style={{ width: '100%' }}

      />
      <Button 
          type="primary" 
          shape="round" 
          icon={<DownloadOutlined />} 
          size={'large'}
          onClick={createNewTodo}
      >
        Add Todo
      </Button>
    </div>
  )
}
