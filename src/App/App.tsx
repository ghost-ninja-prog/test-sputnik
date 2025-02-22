import { useState } from "react"
import styled from "styled-components"
import { Typography } from 'antd'

import { TasksList } from "../components/TaskList/TasksList"
import { Categories } from "../components/Categories/Categories"
import { AddTask } from "../components/AddTask/AddTask"
  
  
  
const AppWrapper = styled.div`
  padding: 5px;
  max-width: 500px;
  background-color: #fff;
  border-radius: 6px;
  text-align: center;
`

const TitleWrapper = styled.div`
  text-align: center;
`

function App() {

  const [ selectedCategory, setSelectedCategory ] = useState('all')

  return (
    <AppWrapper>
      <TitleWrapper>
        <Typography.Title
          level={1}
        >
          Tasks List
        </Typography.Title>
      </TitleWrapper>
      <AddTask />
      <Categories setSelectedCategory={setSelectedCategory} />
      <TasksList selectedCategory={selectedCategory} />

    </AppWrapper>
  )
}

export default App
