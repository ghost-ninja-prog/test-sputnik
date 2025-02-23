import { Button, Form, FormProps, Input } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { useTasksStore } from '../../store/useTasksStore'


const WrapperForm = styled.div`
  padding: 20px 20px;
`



export const AddTask: React.FC = () => {

  const { addTask } = useTasksStore(state => state)

  const [form] = Form.useForm()

  type TFieldType = {
    inputTitle: string,
    inputDesc: string
  }

  const onFinish: FormProps<TFieldType>['onFinish'] = (values) => {
    const payload = {
      title: values.inputTitle,
      description: values.inputDesc,
      status: 'active'
    }
    addTask(payload)
    form.resetFields(['inputTitle', 'inputDesc'])
  }

  const onFinishFailed: FormProps<TFieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }


  return (
    <WrapperForm>
      <Form
        form={form}
        name="todoPlus"
        layout='vertical'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<TFieldType>
          label={null}
          name="inputTitle"
          rules={[{ required: true, message: 'Please enter task title!' }]}
        >
            <Input placeholder='Enter task title' />
        </Form.Item>

        <Form.Item<TFieldType>
          label={null}
          name="inputDesc"
          rules={[{ required: true, message: 'Please enter task description' }]}
        >
            <Input placeholder='Enter task description' />
        </Form.Item>

        <Button type="primary" htmlType='submit'>Add Task</Button>
        
      </Form>
    </WrapperForm>
  )
}
