import { useState } from "react";
import { Typography } from "antd";


import { TodoList } from "../components/TodoList";
import { AddTodo } from "../components/AddTodo";
import { Categories } from "../components/Categories";

import styles from './index.module.css'

export function App() {

	const [selectedValue, setSelectedValue] = useState('all')


  return (
    <div>
      <div className={styles.titleWrap}>
        <Typography.Title 
          level={1} 
          style={{ margin: 0 }}
          >
          Todo List
        </Typography.Title>
      </div>
			<AddTodo />
      <Categories setSelectedValue={ setSelectedValue } />
      <TodoList selectedValue={ selectedValue } />
    </div>
  )
}
