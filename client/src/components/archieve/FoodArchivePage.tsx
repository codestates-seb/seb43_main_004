import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../Common/Button'
import Input from '../Common/Input'
import PaginationComponent from '../Common/Pagination'
import { dtoResponsePage } from '../../dto'

const FoodArchive = () => {
  const [inputVal, setInputVal] = useState('')
  const [nutrientData, setNutrientData] =
    useState<dtoResponsePage<nutrient> | null>(null)
  console.log(nutrientData)

  const onClick = () => {
    console.log('hi')
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value)
  }

  useEffect(() => {
    axios.get('http://localhost:4000/nutrient').then((res) => {
      setNutrientData(res.data)
    })
  }, [])

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
      <div className="archive">
        <ul className="archive__lists">
          {nutrientData &&
            nutrientData.data.map((nutrient, idx) => {
              return (
                <li className="archive__list" key={idx}>
                  <p>{nutrient.foodName}</p>
                  <p>{nutrient.kcal} kcal</p>
                </li>
              )
            })}
        </ul>
        <div className="list__detail">good</div>
      </div>
      <PaginationComponent totalItemsCount={7000} />
    </FoodArchiveWrapper>
  )
}

export default FoodArchive

export interface nutrient {
  foodName: string
  carbohydrate: number
  protein: number
  fat: number
  kcal: number
  sugar: number
}

export interface nutrientResponse {
  data: nutrient[]
}

const FoodArchiveWrapper = styled.div`
  width: 70vw;

  .archive {
    display: flex;
  }

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
  .search__form {
    display: flex;
    align-items: center;

    button {
      align-self: flex-start;
      margin-left: 1rem;
    }
  }

  .archive__lists {
    flex: 6;
    border-radius: 8px;
    margin-right: 1.5rem;
  }

  .archive__list {
    display: flex;
    justify-content: space-between;
    padding: 1.5rem 2rem;
    font-weight: 600;
    border: 1px solid var(--color-light-gray);
  }

  .list__detail {
    flex: 4;
    border: 1px solid var(--color-light-gray);
    border-radius: 8px;
  }
`
