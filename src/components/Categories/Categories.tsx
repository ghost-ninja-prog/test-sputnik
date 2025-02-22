import { Radio, RadioChangeEvent } from 'antd'
import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'


const WrapperCategories = styled.div`
  padding: 8px 6px;
`

type CategoriesPropsType = {
    setSelectedCategory: Dispatch<SetStateAction<string>>
}

export const Categories: React.FC<CategoriesPropsType> = ({ setSelectedCategory }) => {


    const onChangeHandler = (event: RadioChangeEvent) => {
        setSelectedCategory(event.target.value)
    }


  return (
    <WrapperCategories>
      <Radio.Group onChange={onChangeHandler} defaultValue='all'>
          <Radio.Button value="all">Все</Radio.Button>
          <Radio.Button value="completed" >Выполненные</Radio.Button>
          <Radio.Button value="active">Невыполненные</Radio.Button>
          <Radio.Button value="favorites">Избранное</Radio.Button>
      </Radio.Group>
    </WrapperCategories>
  )
}