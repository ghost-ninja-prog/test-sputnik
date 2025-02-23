import { Button, Form, FormProps, Input, Space } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { useTasksStore } from '../../store/useTasksStore'


const WrapperForm = styled.div`
  margin: 20px auto;
`



export const AddTask: React.FC = () => {

  const { addTask } = useTasksStore(state => state)

  const [form] = Form.useForm()

  type FieldType = {
    inputTitle: string,
    inputDesc: string
  }

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    const payload = {
      title: values.inputTitle,
      description: values.inputDesc,
      status: 'active'
    }
    addTask(payload)
    form.resetFields(['inputTitle', 'inputDesc'])
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
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
        <Form.Item<FieldType>
          wrapperCol={{ span: 60 }}
          label={null}
          name="inputTitle"
          rules={[{ required: true, message: 'Please enter task title!' }]}
        >
          <Space.Compact>
            <Input placeholder='Enter task title' style={{ width: 350 }} />
          </Space.Compact>
        </Form.Item>

        <Form.Item<FieldType>
          wrapperCol={{ span: 60 }}
          label={null}
          name="inputDesc"
          rules={[{ required: true, message: 'Please enter task description' }]}
        >
          <Space.Compact>
            <Input placeholder='Enter task description' style={{ width: 350 }} />
          </Space.Compact>
        </Form.Item>

        <Space.Compact>
          <Button type="primary" htmlType='submit'>Add Task</Button>
        </Space.Compact>
        
      </Form>
    </WrapperForm>
  )
}
