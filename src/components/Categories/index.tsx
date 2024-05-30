import { Radio, RadioChangeEvent } from 'antd'
import React, { Dispatch, SetStateAction } from 'react'

import styles from './index.module.css'

type CategoriesProps = {
    setSelectedValue: Dispatch<SetStateAction<string>>
}

export const Categories: React.FC<CategoriesProps> = ({ setSelectedValue }) => {


    const handlerChange = (e: RadioChangeEvent) => {
        setSelectedValue(e.target.value)
    }

  return (
    <div className={styles.wrapper}>
        <Radio.Group  onChange={handlerChange}>
            <Radio.Button value="all">Все</Radio.Button>
            <Radio.Button value="completed">Выполненные</Radio.Button>
            <Radio.Button value="active">Невыполненные</Radio.Button>
            <Radio.Button value="favorites">Избранное</Radio.Button>
        </Radio.Group>
    </div>
  )
}
