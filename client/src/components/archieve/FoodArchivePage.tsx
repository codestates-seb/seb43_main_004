import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../Common/Button'
import Input from '../Common/Input'

const FoodArchive = () => {
  const [inputVal, setInputVal] = useState('')
  console.log(inputVal)

  const onClick = () => {
    console.log('hi')
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value)
  }

  return (
    <FoodArchiveWrapper>
      <header>
        <h2>음식 영양 성분</h2>
        <span className="material-symbols-outlined">question_mark</span>
      </header>
      <div className="search__form">
        <Input
          type="text"
          placeholder="음식을 입력하세요"
          name="인풋"
          onChange={onChangeInput}
        />
        <Button onClick={onClick}>검색</Button>
      </div>
    </FoodArchiveWrapper>
  )
}

export default FoodArchive

const FoodArchiveWrapper = styled.div`
  width: 80%;

  header {
    display: flex;
    align-items: center;
    margin-bottom: 2.5rem;

    h2 {
      font-size: 28px;
      margin-right: 1rem;
    }

    span {
      position: relative;
      bottom: 3px;
      color: white;
      background-color: black;
      border-radius: 50%;
      padding: 0.1rem;
    }
  }
`
