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

  .food-edit {
    margin-bottom: 1rem;

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3rem;
    }

    .search-food {
      position: relative;

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
  }

  .food-stage {
    margin-bottom: 10rem;

    .empty {
      border: 5px dashed ${({ theme }) => theme.color.lightGray};
      padding: 5rem 0;
      border-radius: 1.5rem;
      text-align: center;

      h4 {
        font-size: ${({ theme }) => theme.fontSize.smh};
        color: ${({ theme }) => theme.color.lightGray};
      }
    }

    .full {
      padding: 2rem;
      border: 1px solid ${({ theme }) => theme.color.lightGray};
      border-radius: 1.5rem;

      > .btns {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        margin-top: 2rem;
      }
    }
  }

  .food-list {
    h3 {
      margin-bottom: 2rem;
    }

    .empty {
      color: ${({ theme }) => theme.color.darkGray};
      line-height: 1.5em;
      font-size: ${({ theme }) => theme.fontSize.smh};
      text-align: center;
      font-family: 'yg-jalnan';
    }

    ul {
      border: 1px solid ${({ theme }) => theme.color.lightGray};
      border-radius: 1.5rem;
      overflow: hidden;
      max-height: 1000px;
      overflow-y: auto;
    }

    li {
      border-bottom: 1px solid ${({ theme }) => theme.color.lightGray};
      padding: 2rem;

      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;

        > p {
          font-size: ${({ theme }) => theme.fontSize.larger};
          font-weight: 700;
        }

        .intake {
          display: flex;
          align-items: center;
          gap: 5rem;

          .kcal {
            font-weight: 500;
          }
        }

        .btns {
          display: flex;
          align-items: center;
          gap: 1rem;

          button {
            font-size: ${({ theme }) => theme.fontSize.larger};
          }
        }
      }

      .food-info {
        color: ${({ theme }) => theme.color.darkGray};
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        margin-top: 3rem;
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

    .food-edit {
      .title {
        margin-bottom: 2rem;
      }
    }

    .food-stage {
      margin-bottom: 5rem;

      .empty {
        h4 {
          font-size: ${({ theme }) => theme.fontSize.large};
        }
      }
    }

    .food-list {
      .empty {
        font-size: ${({ theme }) => theme.fontSize.large};
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
  [key: string]: string | number | boolean | undefined | null
}

const DiaryWrite = () => {
  // 상태 & 변수
  const url = process.env.REACT_APP_SERVER_URL
  const param = useParams()
  const location = useLocation()
  const diaryData = location.state?.meal || null // 식단 등록, 수정할 때 제공되는 데이터
  // console.log(diaryData)
  const [searchTxt, setSearchTxt] = useState('') // 검색 인풋 상태
  const [searchList, setSearchList] = useState<FoodList[]>([]) // 자동완성 검색어의 목록
  const [stage, setStage] = useState<FoodList | null>(null)
  const [isEdit, setIsEdit] = useState(false)
  const [foodList, setFoodList] = useState<any[]>([]) // 음식 리스트
  const [isEmpty, setIsEmpty] = useState(false) // 모달 상태
  const customId = useRef<number>(0) // custom 음식의 id

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

    setStage(newItem)
  }

  const deleteFoodItem = async (id: number) => {
    console.log('delete')
    const res = await axios.delete(`${url}/diaries/diaryId/meal/delete/${id}`, {
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    })
    console.log(res)
  }

  const editToStage = (data: FoodList) => {
    setStage(data)
    setIsEdit(true)
  }

  const addToStage = (item: FoodList) => {
    setStage(item)
    setIsEdit(false)
    setSearchList([])
    setSearchTxt('')
  }

  const checkValidation = () => {
    // 유효성검사
    // 빈칸이 있는지
    // for (const item in stage) {
    //   if (!stage[item]) {
    //     setIsEmpty(true)
    //   }
    // }
  }

  const sendDiary = () => {
    checkValidation()
    setFoodList([stage, ...foodList])
    // const sendData = foodList.map((item) => {
    //   if (item.custom) {
    //     return {
    //       diaryId: param.id,
    //       title: item.foodName,
    //       mealType: 'ddd',
    //       kcal: item.kcal,
    //       carbohydrate: item.carbohydrate,
    //       protein: item.protein,
    //       fat: item.fat,
    //       sugar: item.totalSugar,
    //       salt: item.salt,
    //       custom: item.custom,
    //       servingSize: item.servingSize,
    //     }
    //   } else {
    //     return {
    //       diaryId: param.id,
    //       title: item.foodName,
    //       mealType: 'ddd',
    //       kcal: item.kcal,
    //       carbohydrate: item.carbohydrate,
    //       protein: item.protein,
    //       fat: item.fat,
    //       sugar: item.totalSugar,
    //       salt: item.salt,
    //       servingSize: item.servingSize,
    //     }
    //   }
    // })
    // console.log(sendData)
  }

  useEffect(() => {
    if (foodList.length === 0) {
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
        <div className="food-edit">
          <div className="title">
            <h3>☀️ 아침에 먹었어요</h3>
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
                      <li key={item.foodId} onClick={() => addToStage(item)}>
                        <span className="food-name">{item.foodName}</span>
                        <span className="material-icons-round">add</span>
                      </li>
                    )
                  })
                )}
              </ul>
            )}
          </div>
        </div>
        <div className="food-stage">
          {stage === null ? (
            <div className="empty">
              <h4>검색이나 직접 등록하기로 원하는 음식을 선택해주세요.</h4>
            </div>
          ) : (
            <div className="full">
              <FoodItem
                key={stage.foodId}
                data={stage}
                setStage={setStage}
                custom={stage.custom}
              />
              <div className="btns">
                <Button
                  type="button"
                  outline={true}
                  onClick={() => setStage(null)}
                >
                  취소하기
                </Button>
                {isEdit ? (
                  <Button type="button" onClick={sendDiary}>
                    수정하기
                  </Button>
                ) : (
                  <Button type="button" onClick={sendDiary}>
                    등록하기
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="food-list">
          <h3>전체 {foodList.length}개</h3>
          <ul>
            {foodList.length === 0 ? (
              <li className="empty">
                아직 등록된 음식이 없어요. <br />
                오늘 먹은 음식을 등록해주세요!
              </li>
            ) : (
              foodList.map((data, idx) => (
                <li key={idx}>
                  <div className="title">
                    <p>{data.foodName}</p>
                    <div className="intake">
                      <p>섭취량(g) : {data.servingSize}</p>
                      <p className="kcal">{data.kcal}kcal</p>
                      <div className="btns">
                        <button type="button" onClick={() => editToStage(data)}>
                          <span className="material-icons-round">edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteFoodItem(data.mealId)}
                        >
                          <span className="material-icons-round">
                            delete_outline
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="food-info">
                    <p>
                      <span>탄수화물</span>
                      <span>{data.carbohydrate}g</span>
                    </p>
                    <p>
                      <span>단백질</span>
                      <span>{data.protein}g</span>
                    </p>
                    <p>
                      <span>지방</span>
                      <span>{data.fat}g</span>
                    </p>
                    <p>
                      <span>당류</span>
                      <span>{data.protein}g</span>
                    </p>
                    <p>
                      <span>나트륨</span>
                      <span>{data.fat}mg</span>
                    </p>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
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
      </StyledDiaryAdd>
    </>
  )
}

export default React.memo(DiaryWrite)
