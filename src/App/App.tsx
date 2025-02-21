import { useState } from "react"
import styled from "styled-components"
import { Typography } from 'antd'

import { TodoList } from "../components/TodoList/TodoList"
import { Categories } from "../components/Categories/Categories"
  
  
  
const AppWrapper = styled.div`
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 6px;
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
          Todo List
        </Typography.Title>
      </TitleWrapper>
      <Categories setSelectedCategory={setSelectedCategory} />
      <TodoList selectedCategory={selectedCategory} />

    </AppWrapper>
  )
}

export default App
