import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import Button from '../components/Common/Button'
import Input from '../components/Common/Input'
import FoodItem from '../components/FoodItem'
import axios from 'axios'

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

interface FoodList {
  nutrientId: number
  title: string
  intake: number
  carbohydrate: number
  protein: number
  fat: number
  kcal: number
}

const DiaryWrite = () => {
  // 상태 & 변수
  const [timeCheck, setTimeCheck] = useState('') // 식사시간 상태
  const [searchTxt, setSearchTxt] = useState('') // 검색 인풋에서 사용할 상태
  const [searchList, setSearchList] = useState([]) // 자동완성 검색어의 목록
  const [foodList, setFoodList] = useState<FoodList[]>([]) // 등록할 음식 리스트의 상태

  useEffect(() => {
    // 검색어 자동완성
    // eslint-disable-next-line space-before-function-paren
    const getSearchList = async () => {
      const res = await axios.get(
        `http://localhost:3001/nutrient?title=${searchTxt}`
      )

      setSearchList(res.data)
    }

    getSearchList()
  }, [searchTxt])

  const filterResults = (results: FoodList[]) => {
    // 한글 자모음 정규식
    const pattern = new RegExp(
      searchTxt
        .split('')
        .map((char: string) => {
          if (/[\u3131-\uD7A3]/.test(char)) {
            // 한글 자모음으로 변환
            const base = char.charCodeAt(0) - 44032
            const cho = Math.floor(base / 588)
            const jung = Math.floor((base - cho * 588) / 28)
            const jong = base - cho * 588 - jung * 28
            const choChar = String.fromCharCode(0x1100 + cho)
            const jungChar = String.fromCharCode(0x1161 + jung)
            const jongChar =
              jong === 0 ? '' : String.fromCharCode(0x11a7 + jong)
            return `[${choChar}${jungChar}${jongChar}]`
          }
          // 그 외의 문자는 그대로 반환
          return char
        })
        .join(''),
      'i'
    )

    // 검색어(query)와 매칭되는 결과만 필터링하여 반환
    return results.filter((result) => pattern.test(result.title))
  }

  // 칼로리 계산에 사용할 상태
  // 칼로리 = (탄수화물 그램 수 x 4) + (단백질 그램 수 x 4) + (지방 그램 수 x 9)

  // Todo: 검색 아이템 어떻게 가져올건지(임시)
  const searchResult = [
    '김치만두',
    '김치전골',
    '김치피자탕수육',
    '김치찌개',
    '김치전',
    '김치등갈비찜',
  ]

  // Todo: api로 일기 데이터 받아와서 현재 기록된것만 isDisable true 설정해주기
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

  // const addCustomFoodItem = () => {}

  const onclick = () => {
    console.log('onclick')
  }

  return (
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
                  name="meal-time"
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
          <Button onClick={onclick}>
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
          {searchList && (
            <ul className="search-food-list">
              {filterResults(searchList).map((item, idx) => {
                return (
                  <li key={idx}>
                    <span className="food-name">{item.title}</span>
                    <span className="material-icons-round">add</span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
        <div className="food-list">
          {/* {foodList.length === 0 ? (
            <h3>
              아직 등록된 음식이 없어요. <br />
              오늘 먹은 음식을 등록해주세요!
            </h3>
          ) : ( */}
          <ul>
            {/* {foodList.map((item) => (
                <FoodItem key={item.id} />
              ))} */}
            <FoodItem custom={true} />
            <FoodItem />
          </ul>
          {/* )} */}
        </div>
      </div>
      <Button onClick={onclick}>
        <span className="material-icons-round">edit</span>
        일기 등록하기
      </Button>
    </StyledDiaryAdd>
    // 모달 넣어야됨!! - 직접 추가하기 작성시 빈값이 있는 경우 / 등록중 뒤로가기나 페이지를 벗어나려고 할때
  )
}

export default DiaryWrite
