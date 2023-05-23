/* eslint-disable space-before-function-paren */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import Button from '../components/Common/Button'
import Input from '../components/Common/Input'
import FoodItem from '../components/diary/FoodItem'
import axios from 'axios'
import Modal from '../components/Common/Modal'
import { useLocation, useParams } from 'react-router-dom'

const StyledDiaryAdd = styled.main`
  width: 98%;
  max-width: 1250px;

  h2 {
    font-size: ${({ theme }) => theme.fontSize.smmh};
    margin-bottom: 5rem;
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSize.smh};
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
        top: 70%;
        left: 0;
        width: 100%;
        border: 1px solid ${({ theme }) => theme.color.darkGray};
        border-radius: 0.6rem;
        overflow: hidden;
        box-shadow: ${({ theme }) => theme.shadow};
        z-index: 5;
        max-height: 226px;
        overflow-y: auto;

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
  foodId: number
  foodName: string
  servingSize: number
  kcal: number
  carbohydrate: number
  protein: number
  fat: number
  totalSugar: number
  salt: number
  custom?: boolean | undefined
}

const DiaryWrite = () => {
  // 상태 & 변수
  const url = process.env.REACT_APP_SERVER_URL
  const param = useParams()
  const location = useLocation()
  const diaryData = location.state?.meal || null // 식단 등록, 수정할 때 제공되는 데이터
  const sendType = location.pathname.split('/')[3]
  console.log(diaryData)
  const [timeCheck, setTimeCheck] = useState(
    sendType === 'add' ? '' : diaryData[0].mealType
  ) // 식사시간 상태
  const [searchTxt, setSearchTxt] = useState('') // 검색 인풋 상태
  const [searchList, setSearchList] = useState<FoodList[]>([]) // 자동완성 검색어의 목록
  const [foodList, setFoodList] = useState<FoodList[]>(
    sendType === 'add' ? [] : diaryData
  ) // 등록할 음식 리스트의 상태
  const [isEmpty, setIsEmpty] = useState(false) // 모달 상태
  const [isUnchecked, setIsUnchecked] = useState(false) // 모달 상태
  const customId = useRef<number>(0) // custom 음식의 id

  const mealTime = [
    {
      id: 'BREAKFAST',
      label: '아침',
    },
    {
      id: 'LUNCH',
      label: '점심',
    },
    {
      id: 'DINNER',
      label: '저녁',
    },
    {
      id: 'SNACK',
      label: '간식',
    },
  ]

  const debounce = <T extends (...args: any[]) => any>(
    fn: T,
    delay: number
  ) => {
    let timeout: ReturnType<typeof setTimeout>

    return (...args: Parameters<T>): ReturnType<T> => {
      let result: any
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => {
        result = fn(...args)
      }, delay)
      return result
    }
  }

  // 검색요청
  const getSearchList = useCallback(
    debounce(async (value) => {
      try {
        const res = await axios.get(
          `${url}/nutrient/search?page=1&size=10&search=${value}`,
          {
            headers: {
              'Content-Type': `application/json`,
              'ngrok-skip-browser-warning': '69420',
            },
          }
        )
        setSearchList(res.data.data)
      } catch (error) {
        setSearchList([])
      }
    }, 300),
    []
  )

  const handleSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTxt(e.target.value)
    getSearchList(e.target.value)
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeCheck(e.target.id)
  }

  const createCustomFoodItem = () => {
    const newItem: FoodList = {
      foodId: customId.current,
      foodName: '',
      servingSize: 100,
      kcal: 0,
      carbohydrate: 0,
      protein: 0,
      fat: 0,
      totalSugar: 0,
      salt: 0,
      custom: true,
    }
    customId.current++

    setFoodList([newItem, ...foodList])
  }

  const deleteFoodItem = (title: string) => {
    setFoodList(foodList.filter((item) => item.foodName !== title))
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
          item.foodId === id ? { ...item, ...content } : item
        )
      )
    },
    [foodList]
  )

  const checkValidation = () => {
    // 유효성검사
    // 시간 선택했는지
    if (timeCheck === '') setIsUnchecked(true)

    // 빈칸이 있는지
    const values = []
    for (const item of foodList) {
      values.push(...Object.values(item))
    }
    const result = values.filter((el) => el === '').length
    if (result > 0) setIsEmpty(true)
  }

  const sendDiary = () => {
    checkValidation()
    const sendData = foodList.map((item) => {
      let time = ''
      if (timeCheck === '아침') {
        time = 'BREAKFAST'
      } else if (timeCheck === '점심') {
        time = 'LUNCH'
      } else if (timeCheck === '저녁') {
        time = 'DINNER'
      } else {
        time = 'SNACK'
      }

      if (item.custom) {
        return {
          diaryId: param.id,
          title: item.foodName,
          mealType: time,
          kcal: item.kcal,
          carbohydrate: item.carbohydrate,
          protein: item.protein,
          fat: item.fat,
          sugar: item.totalSugar,
          salt: item.salt,
          custom: item.custom,
          servingSize: item.servingSize,
        }
      } else {
        return {
          diaryId: param.id,
          title: item.foodName,
          mealType: time,
          kcal: item.kcal,
          carbohydrate: item.carbohydrate,
          protein: item.protein,
          fat: item.fat,
          sugar: item.totalSugar,
          salt: item.salt,
        }
      }
    })
    console.log(sendData)

    const sendUrl =
      sendType === 'add'
        ? `/diaries/${param.id}/meal/write`
        : `/diaries/${param.id}/meal/update/${param.id}`
    console.log(sendType, sendUrl)
  }

  useEffect(() => {
    if (sendType === 'add') {
      ;(async () => {
        try {
          const res = await axios.get(`${url}/nutrient?page=1&size=1`, {
            headers: {
              'Content-Type': `application/json`,
              'ngrok-skip-browser-warning': '69420',
            },
          })
          customId.current = res.data.pageInfo.totalElements
        } catch (error) {
          console.log(error)
        }
      })()
    } else {
      customId.current = diaryData[diaryData.length - 1].mealId + 1
    }
  }, [])

  return (
    <>
      <StyledDiaryAdd>
        <h2>나의 식단일기</h2>
        <div className="when">
          <h3>언제 먹었나요?</h3>
          <ul className="meal-time">
            {sendType === 'add'
              ? diaryData.map((data: any, idx: number) => {
                  return (
                    <li key={idx}>
                      <input
                        type="radio"
                        name="mealType"
                        id={data.mealType}
                        disabled={data.hasData}
                        checked={timeCheck === data.mealType}
                        onChange={handleTimeChange}
                      />
                      <label htmlFor={data.mealType}>
                        {timeCheck === data.mealType ? (
                          <span className="material-icons-round">
                            check_circle_outline
                          </span>
                        ) : (
                          <span className="material-icons-round">
                            radio_button_unchecked
                          </span>
                        )}
                        <span>{data.mealType}</span>
                      </label>
                    </li>
                  )
                })
              : mealTime.map((data: any, idx: number) => {
                  return (
                    <li key={idx}>
                      <input
                        type="radio"
                        name="mealType"
                        id={data.id}
                        disabled={data.id !== diaryData[0].mealType}
                        checked={data.id === diaryData[0].mealType}
                        onChange={handleTimeChange}
                      />
                      <label htmlFor={data.id}>
                        {timeCheck === data.id ? (
                          <span className="material-icons-round">
                            check_circle_outline
                          </span>
                        ) : (
                          <span className="material-icons-round">
                            radio_button_unchecked
                          </span>
                        )}
                        <span>{data.label}</span>
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
              onChange={(e) => handleSearchOnChange(e)}
            />
            {searchTxt.length > 0 && (
              <ul className="search-food-list">
                {searchList.length === 0 ? (
                  <li>검색 결과가 없습니다.</li>
                ) : (
                  searchList.map((item) => {
                    return (
                      <li key={item.foodId} onClick={() => addToFoodList(item)}>
                        <span className="food-name">{item.foodName}</span>
                        <span className="material-icons-round">add</span>
                      </li>
                    )
                  })
                )}
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
                    key={data.foodId}
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
        <Button
          disabled={!timeCheck || foodList.length === 0}
          onClick={sendDiary}
        >
          <span className="material-icons-round">edit</span>
          일기 등록하기
        </Button>
        {isEmpty && (
          <Modal
            state={isEmpty}
            setState={setIsEmpty}
            msg={`빈 칸이 있습니다.\n다시 확인하고 등록해주세요.`}
            icon="error"
          >
            <Button onClick={() => setIsEmpty(false)}>확인</Button>
          </Modal>
        )}
        {isUnchecked && (
          <Modal
            state={isUnchecked}
            setState={setIsUnchecked}
            msg={`식사시간을 선택하지 않으셨습니다.\n다시 확인하고 등록해주세요.`}
            icon="error"
          >
            <Button onClick={() => setIsUnchecked(false)}>확인</Button>
          </Modal>
        )}
      </StyledDiaryAdd>
    </>
  )
}

export default React.memo(DiaryWrite)
