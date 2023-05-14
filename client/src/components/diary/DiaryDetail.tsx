import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { DiaryPageWrapper } from './DiaryCheck'
import Button from '../Common/Button'

const DiaryDetailWrapper = styled.div`
  display: flex;

  .diary__container {
    flex: 5;
    display: flex;
    flex-direction: column;

    button {
      display: flex;
      align-items: center;
      padding: 0.9rem;
      margin-right: 0.5rem;

      .material-symbols-outlined {
        font-size: 16px;
      }
    }

    .diary__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;

      p {
        font-size: 20px;
        font-family: 'yg-jalnan';
        margin-right: 0.5rem;
      }
      .diary__header__btn {
        display: flex;
      }
    }
  }

  .diary__lists {
    p {
      font-size: 17px;
      font-weight: 500;
    }
  }

  .diary__list {
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .meal__lists {
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }

  .meal__list {
    position: relative;
    border: 1px solid var(--color-light-gray);
    border-radius: 9px;
    padding: 1.2rem;

    p:first-child {
      font-size: 14px;
      margin-bottom: 0.4rem;
    }

    p:last-child {
      font-size: 12px;
      color: #757575;
    }

    span {
      position: absolute;
      top: 2rem;
      right: 0;
    }
  }

  .status__container {
    flex: 1;
    padding: 1rem;
    width: 230px;
    border: 1px solid var(--color-light-gray);
    border-radius: 15px;
    margin-left: 2rem;

    h2 {
      text-align: center;
      font-size: 2.5rem;
    }
  }
`

interface Diary {
  userDate: string
  memo: string
  diaryStatus: string
  meal: Meal[]
  standardIntake: StandardIntake[]
  calcul: Calcul[]
  recipe: Recipe[]
  comment: string
}

interface Meal {
  foodName: string
  mealType: string
  kcal: string
  intake: string
}

interface StandardIntake {
  carbohydrate: number
  protein: number
  fat: number
  kcal: number
  sugar: number
}

interface Calcul {
  탄수화물: number
  단백질: number
  지방: number
  칼로리: number
  당: number
  나트륨: number
}

interface Recipe {
  foodName: string
}

const DiaryDetail = () => {
  const [diary, setDiary] = useState<Diary | null>(null)
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'] // 요일을 구하기 위한 배열
  const { id } = useParams()
  console.log(diary)

  const onClickBtn = () => {
    console.log('hi')
  }

  useEffect(() => {
    axios.get(`http://localhost:4000/diary/${id}`).then((res) => {
      setDiary(res.data)
    })
  }, [])
  return (
    <DiaryPageWrapper>
      <h2>나의 식단 일기</h2>
      {diary && (
        <DiaryDetailWrapper>
          <div className="diary__container">
            <h3 className="diary__header">
              <p>{`${new Date(diary.userDate).getMonth() + 1}월 ${new Date(
                diary.userDate
              ).getDate()}일 ${
                weekdays[new Date(diary.userDate).getDay()]
              }요일`}</p>
              <div className="diary__header__btn">
                <Button onClick={onClickBtn} outline={true}>
                  <span className="material-symbols-outlined">delete</span>
                  모든 기록 삭제
                </Button>
                <Button onClick={onClickBtn}>
                  <span className="material-symbols-outlined">edit</span>
                  등록하기
                </Button>
              </div>
            </h3>
            <ul className="diary__lists">
              <li className="diary__list">
                <header>
                  <p>아침 500Kcal</p>
                  <div>
                    <span className="material-symbols-outlined">edit</span>
                    <span className="material-symbols-outlined">delete</span>
                  </div>
                </header>
                <ul className="meal__lists">
                  <li className="meal__list">
                    <p>대패삼겹살</p>
                    <p>180g</p>
                    <span>280kcal</span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="status__container">
            <h2>오늘의 식단</h2>
          </div>
        </DiaryDetailWrapper>
      )}
    </DiaryPageWrapper>
  )
}

export default DiaryDetail
