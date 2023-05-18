/* eslint-disable space-before-function-paren */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import Button from '../components/Common/Button'
import Input from '../components/Common/Input'
import FoodItem from '../components/diary/FoodItem'
import axios from 'axios'
import Modal from '../components/Common/Modal'

const StyledDiaryAdd = styled.main`
  h2 {
    font-size: ${({ theme }) => theme.fontSize.lgh};
    margin-bottom: 5rem;
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSize.mdh};
  }

  button {
    display: flex;
    gap: 0.5rem;
    font-size: ${({ theme }) => theme.fontSize.large};
    font-weight: 700;
  }

  & > button {
    margin: 0 auto;
  }

  .when {
    margin-bottom: 5rem;

    h3 {
      margin-bottom: 3rem;
    }

    .meal-time {
      display: flex;
      justify-content: flex-start;
      gap: 1rem;

      label {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        border: 2px solid ${({ theme }) => theme.color.point};
        border-radius: 1.5rem;
        color: ${({ theme }) => theme.color.point};
        font-weight: 700;
        font-size: ${({ theme }) => theme.fontSize.large};
        padding: 1.5rem 2rem;
        cursor: pointer;

        .material-icons-round {
          font-size: ${({ theme }) => theme.fontSize.smh};
        }
      }

      input {
        display: none;

        &:disabled + label {
          border-color: ${({ theme }) => theme.color.lightGray};
          color: ${({ theme }) => theme.color.lightGray};
        }

        &:checked + label {
          color: ${({ theme }) => theme.color.white};
          background-color: ${({ theme }) => theme.color.point};
        }
      }
    }
  }

  .what {
    margin-bottom: 10rem;

    .what-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3rem;
    }

    .search-food {
      position: relative;
      margin-bottom: 3rem;

      .search-food-list {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        border: 1px solid ${({ theme }) => theme.color.darkGray};
        border-radius: 0.6rem;
        overflow: hidden;
        box-shadow: ${({ theme }) => theme.shadow};
        z-index: 5;

        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid ${({ theme }) => theme.color.lightGray};
          background-color: ${({ theme }) => theme.color.white};
          cursor: pointer;

          &:last-child {
            border-bottom: 0;
          }

          &:hover {
            background-color: ${({ theme }) => theme.color.primary};
          }

          .material-icons-round {
            font-size: ${({ theme }) => theme.fontSize.smh};
          }
        }
      }
    }

    .food-list {
      h3 {
        text-align: center;
        color: ${({ theme }) => theme.color.darkGray};
        line-height: 1.5em;
        margin-top: 10rem;
      }
    }
  }

  @media ${({ theme }) => theme.device.mobile} {
    h2 {
      font-size: ${({ theme }) => theme.fontSize.smh};
      margin-bottom: 2rem;
    }

    h3 {
      font-size: ${({ theme }) => theme.fontSize.large};
    }

    button {
      font-size: ${({ theme }) => theme.fontSize.small};
    }

    .when {
      margin-bottom: 3rem;

      h3 {
        margin-bottom: 2rem;
      }

      .meal-time {
        gap: 0.5rem;

        label {
          font-size: ${({ theme }) => theme.fontSize.small};
          padding: 0.5rem 1rem;
          gap: 0.5rem;

          .material-icons-round {
            font-size: ${({ theme }) => theme.fontSize.middle};
          }
        }
      }
    }

    .what {
      margin-bottom: 5rem;

      .what-title {
        margin-bottom: 2rem;
      }

      .search-food {
        margin-bottom: 2rem;
      }

      .food-list {
        h3 {
          margin-top: 5rem;
        }
      }
    }
  }
`

export interface FoodList {
  nutrientId: number
  title: string
  intake: number
  carbohydrate: number
  protein: number
  fat: number
  sugar: number
  salt: number
  kcal: number
  custom?: boolean | undefined
}

const DiaryWrite = () => {
  // 상태 & 변수
  const [timeCheck, setTimeCheck] = useState('') // 식사시간 상태
  const [searchTxt, setSearchTxt] = useState('') // 검색 인풋에서 사용할 상태
  const [searchList, setSearchList] = useState<FoodList[]>([]) // 자동완성 검색어의 목록
  const [foodList, setFoodList] = useState<FoodList[]>([]) // 등록할 음식 리스트의 상태
  // 모달 상태
  const [isEmpty, setIsEmpty] = useState(false)
  const [isUnchecked, setIsUnchecked] = useState(false)
  const [isUnsaved, setIsUnsaved] = useState(false)
  const customId = useRef<number>(120) // 사용자등록 음식의 id. 영양성분 DB.length + 1

  // Todo : 검색리스트 가져오기. 추후 전역 스토어에 영양성분 db 가져오는것으로 대체할 예정
  const getSearchList = async () => {
    const res = await axios.get(
      `http://localhost:3001/nutrient?title=${searchTxt}`
    )
    setSearchList(res.data)
  }

  useEffect(() => {
    // 검색어 자동완성
    if (searchTxt !== '') {
      getSearchList()
    } else {
      setSearchList([])
    }
  }, [searchTxt])

  // Todo: 오늘 일기 데이터 가져와서 상태 및 배열 생성. 식사가 기록되지 않은것만 isDisabled false 처리
  const mealTime = [
    {
      label: '아침',
      id: 'breakfast',
      isDisabled: true,
    },
    {
      label: '점심',
      id: 'lunch',
      isDisabled: true,
    },
    {
      label: '저녁',
      id: 'dinner',
      isDisabled: false,
    },
    {
      label: '간식',
      id: 'snack',
      isDisabled: false,
    },
  ]

  // 함수
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeCheck(e.target.id)
  }

  const createCustomFoodItem = () => {
    const newItem: FoodList = {
      nutrientId: customId.current,
      title: '',
      intake: 100,
      carbohydrate: 0,
      protein: 0,
      fat: 0,
      sugar: 0,
      salt: 0,
      kcal: 0,
      custom: true,
    }
    customId.current++

    setFoodList([newItem, ...foodList])
  }

  const deleteFoodItem = (title: string) => {
    setFoodList(foodList.filter((item) => item.title !== title))
  }

  const addToFoodList = (item: FoodList) => {
    setFoodList([item, ...foodList])
    setSearchList([])
    setSearchTxt('')
  }

  const setFoodInfo = useCallback(
    (id: number, content: { [key: string]: number | string }) => {
      setFoodList(
        foodList.map((item) =>
          item.nutrientId === id ? { ...item, ...content } : item
        )
      )
    },
    [foodList]
  )

  const checkValidation = () => {
    // 유효성검사
    // 시간 선택했는지
    // if (timeCheck === '') setIsUnchecked(true)
    // 빈칸이 있는지
    // 배열 안의 객체를 순회해서 빈값이 있는지 확인
  }

  const postDiary = () => {
    checkValidation()
    // console.log('post', '/diaries/{diary-id}/meal/write')
    // console.log(timeCheck)
    // console.log(foodList)
  }

  const patchDiary = () => {
    // 수정하기 클릭시 api patch 전송
    console.log('patch', '/diaries/{diary-id}/meal/update/{meal-id}')
  }

  return (
    <>
      <StyledDiaryAdd>
        <h2>나의 식단일기</h2>
        <div className="when">
          <h3>언제 먹었나요?</h3>
          <ul className="meal-time">
            {mealTime.map((time) => {
              return (
                <li key={time.id}>
                  <input
                    type="radio"
                    name="mealType"
                    id={time.id}
                    disabled={time.isDisabled}
                    checked={timeCheck === time.id}
                    onChange={handleTimeChange}
                  />
                  <label htmlFor={time.id}>
                    {timeCheck === time.id ? (
                      <span className="material-icons-round">
                        check_circle_outline
                      </span>
                    ) : (
                      <span className="material-icons-round">
                        radio_button_unchecked
                      </span>
                    )}
                    <span>{time.label}</span>
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="what">
          <div className="what-title">
            <h3>무엇을 먹었나요?</h3>
            <Button onClick={createCustomFoodItem}>
              <span className="material-icons-round">edit</span>
              직접 등록하기
            </Button>
          </div>
          <div className="search-food">
            <Input
              type="text"
              placeholder="음식의 이름을 입력해 주세요."
              name="search-food"
              value={searchTxt}
              onChange={(e) => setSearchTxt(e.target.value)}
            />
            {searchList.length > 0 && (
              <ul className="search-food-list">
                {searchList.map((item) => {
                  return (
                    <li
                      key={item.nutrientId}
                      onClick={() => addToFoodList(item)}
                    >
                      <span className="food-name">{item.title}</span>
                      <span className="material-icons-round">add</span>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
          <div className="food-list">
            {foodList.length === 0 ? (
              <h3>
                아직 등록된 음식이 없어요. <br />
                오늘 먹은 음식을 등록해주세요!
              </h3>
            ) : (
              <ul>
                {foodList.map((data) => (
                  <FoodItem
                    key={data.nutrientId}
                    data={data}
                    setInfo={setFoodInfo}
                    delete={deleteFoodItem}
                    custom={data.custom}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
        <Button onClick={postDiary}>
          <span className="material-icons-round">edit</span>
          일기 등록하기
        </Button>
      </StyledDiaryAdd>
      <Modal
        state={isEmpty}
        setState={setIsEmpty}
        msg={`빈 칸이 있습니다.\n다시 확인하고 등록해주세요.`}
        icon="error"
      >
        <Button onClick={() => setIsEmpty(false)}>확인</Button>
      </Modal>
      <Modal
        state={isUnchecked}
        setState={setIsUnchecked}
        msg={`식사시간을 선택하지 않으셨습니다.\n다시 확인하고 등록해주세요.`}
        icon="error"
      >
        <Button onClick={() => setIsUnchecked(false)}>확인</Button>
      </Modal>
      <Modal
        state={isUnsaved}
        setState={setIsUnchecked}
        msg={`작성중인 내용은 저장되지 않습니다.\n페이지를 나가시겠습니까?`}
        icon="warning"
      >
        <Button
          type="button"
          outline={true}
          onClick={() => setIsUnsaved(false)}
        >
          취소
        </Button>
        <Button onClick={() => setIsUnsaved(false)}>확인</Button>
      </Modal>
    </>
  )
}

export default DiaryWrite
