import { Radio, RadioChangeEvent } from 'antd'
import React, { Dispatch, SetStateAction } from 'react'

type CategoriesPropsType = {
    setSelectedCategory: Dispatch<SetStateAction<string>>
}


export const Categories: React.FC<CategoriesPropsType> = ({ setSelectedCategory }) => {


    const onChangeHandler = (event: RadioChangeEvent) => {
        setSelectedCategory(event.target.value)
    }


  return (
    <Radio.Group onChange={onChangeHandler} defaultValue='all'>
        <Radio.Button value="all">Все</Radio.Button>
        <Radio.Button value="completed" >Выполненные</Radio.Button>
        <Radio.Button value="active">Невыполненные</Radio.Button>
        <Radio.Button value="favorites">Избранное</Radio.Button>
    </Radio.Group>
  )
}