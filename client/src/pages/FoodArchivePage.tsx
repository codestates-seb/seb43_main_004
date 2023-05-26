import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../components/Common/Button'
import Input from '../components/Common/Input'
import PaginationComponent from '../components/Common/Pagination'
import { dtoResponsePage } from '../dto'
import mealTypeMap from '../utils/mealTypeMap'
import SearchHighlight from '../components/archieve/SearchHighlight'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { BeatLoader } from 'react-spinners'
import {
  fetchNutrientDataStart,
  fetchNutrientDataSuccess,
  fetchNutrientDataFailure,
} from '../store/slices/nutrientSlice'

const FoodArchive = () => {
  const [inputVal, setInputVal] = useState('')

  // const [filteredData, setFilteredData] = useState<nutrient[]>([]) // 검색하여 필터링 된 데이터
  const [selectData, setSelectData] = useState<nutrient | null>(null) // 클릭한 음식 데이터
  const [isHighlighted, setIsHighlighted] = useState(false) // 검색어 강조 여부 상태 추가
  const [activePage, setActivePage] = useState(1)

  const dispatch = useDispatch()
  const nutrientData = useSelector((state: RootState) => state.nutrient.data)
  const loading = useSelector((state: RootState) => state.nutrient.loading) // false or true
  const error = useSelector((state: RootState) => state.nutrient.error) // null or error
  console.log(nutrientData)

  // // 데이터 정렬 함수
  // const handleSortData = () => {
  //   if (nutrientData) {
  //     const inputKeywords = inputVal.split(/\s+/)
  //     const filtered = nutrientData.data.filter((item) => {
  //       const foodNameWithoutWhitespace = item.foodName.replace(/\s/g, '')
  //       return inputKeywords.every((keyword) =>
  //         foodNameWithoutWhitespace.includes(keyword)
  //       )
  //     })

  //     // 정렬: 가장 유사한 항목 먼저 보여주기
  //     const sortedData = filtered.sort((a, b) => {
  //       const similarityA = calculateSimilarity(a.foodName, inputVal)
  //       const similarityB = calculateSimilarity(b.foodName, inputVal)
  //       return similarityB - similarityA
  //     })

  //     setFilteredData(sortedData)
  //     setIsNoResult(sortedData.length === 0)
  //     setIsHighlighted(true)
  //   }
  // }

  // 첫 렌더링 때 실행되는 함수
  const fetchNutrientData = () => {
    dispatch(fetchNutrientDataStart()) // 요청 시작 액션 디스패치
    const url = `${process.env.REACT_APP_SERVER_URL}/nutrient?page=${activePage}&size=10`
    axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      })
      .then((res) => {
        dispatch(fetchNutrientDataSuccess(res.data)) // 성공 액션 디스패치
      })
      .catch((error) => {
        dispatch(fetchNutrientDataFailure(error.message)) // 실패 액션 디스패치
      })
  }

  // 검색을 할 때 실행되는 함수
  const onClickSearchBtn = () => {
    dispatch(fetchNutrientDataStart()) // 요청 시작 액션 디스패치
    const url = `${process.env.REACT_APP_SERVER_URL}/nutrient/search?page=${activePage}&size=10&search=${inputVal}`

    axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      })
      .then((res) => {
        dispatch(fetchNutrientDataSuccess(res.data)) // 성공 액션 디스패치
        setIsHighlighted(true)
        setSelectData(null)
      })
      .catch((error) => {
        dispatch(fetchNutrientDataFailure(error.message)) // 실패 액션 디스패치
      })
  }

  const handleKeyDownEnter = (e: any) => {
    if (e.key === 'Enter') {
      onClickSearchBtn()
    }
  }

  const handleClickFood = (select: nutrient) => {
    setSelectData(select)
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value)
    setIsHighlighted(false) // 강조 상태 초기화
  }

  useEffect(() => {
    if (inputVal) {
      onClickSearchBtn()
    } else {
      fetchNutrientData()
    }
  }, [activePage]) // activePage 상태가 변경될 때마다 호출

  const handlePageChange = (activePage: number) => {
    setActivePage(activePage)
  }

  return (
    <FoodArchiveWrapper>
      <header>
        <h2>음식 영양 성분</h2>
      </header>
      <div className="search__form">
        <Input
          type="text"
          placeholder="음식을 입력하세요"
          name="인풋"
          onChange={onChangeInput}
          onKeyDown={handleKeyDownEnter}
        />
        <Button onClick={onClickSearchBtn}>검색</Button>
      </div>
      {nutrientData?.data.length === 0 && (
        <p className="no-result-message">검색 결과가 없습니다.</p>
      )}

      {loading ? (
        <BeatLoader color="#ffd90f" margin={5} size={20} />
      ) : nutrientData === null ? (
        <li className="error-msg">
          <span className="material-icons-round">search_off</span>
          <h4>검색 결과가 없습니다.</h4>
        </li>
      ) : (
        <div className="archive">
          <ul className="archive__lists">
            {nutrientData?.data?.map((nutrient) => (
              <SearchHighlight
                key={nutrient.foodId}
                nutrient={nutrient}
                isHighlighted={isHighlighted}
                handleClickFood={handleClickFood}
                value={inputVal}
              />
            ))}
          </ul>

          <div className="list__detail">
            {selectData ? (
              <div className="detail__container">
                <header>
                  <h3>{selectData.foodName}</h3>
                  <p>{selectData.servingSize}g</p>
                </header>
                <section className="detail">
                  <div className="detail__data">
                    <p className="detail__kcal">칼로리</p>
                    <p>{selectData.kcal}kcal</p>
                  </div>
                  <p className="nutrient__detail">상세영양소</p>
                  {Object.entries(selectData).map(
                    ([key, value]) =>
                      key !== 'foodId' &&
                      key !== 'foodDetailType' &&
                      key !== 'foodRoughType' &&
                      key !== 'foodName' &&
                      key !== 'servingSize' &&
                      key !== 'kcal' && (
                        <div className="detail__data" key={key}>
                          <p>{mealTypeMap[key]}</p>
                          <p>{`${value}${
                            mealTypeMap[key] === '나트륨' ? 'mg' : 'g'
                          }`}</p>
                        </div>
                      )
                  )}
                </section>
              </div>
            ) : (
              <div className="click-no-result">
                <p>선택된 음식이 없습니다.</p>
                <p>
                  음식을 선택하여
                  <br />
                  영양성분을 확인해보세요!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      <PaginationComponent
        totalItemsCount={nutrientData?.pageInfo.totalElements || 0}
        activePage={activePage}
        onPageChange={handlePageChange}
      />
    </FoodArchiveWrapper>
  )
}

export default FoodArchive

export interface nutrient {
  foodId: number
  foodName: string
  servingSize: number
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

  span {
    text-align: center;
  }

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
    flex: 6.5;
    border-radius: 8px;
    margin-right: 1.5rem;
  }

  .archive__list:last-child {
    border-radius: 0px 0px 15px 15px;
    border: 1px solid var(--color-light-gray);
  }

  .archive__list:first-child {
    border-radius: 15px 15px 0px 0px;
  }

  .archive__list {
    display: flex;
    justify-content: space-between;
    padding: 1.5rem 2rem;
    font-weight: 600;
    border: 1px solid var(--color-light-gray);
    border-bottom: none; /* 아래쪽 테두리 스타일 제거 */
  }

  .archive__list:hover {
    background-color: #eeeeee;
    cursor: pointer;
  }

  .list__detail {
    flex: 3.5;
    border: 1px solid var(--color-light-gray);
    border-radius: 8px;
    padding: 1rem;
  }

  .detail__container {
    header {
      display: flex;
      padding: 0.5rem 1rem;
      border-bottom: 2px solid var(--color-light-gray);
      margin-bottom: 1rem;
      font-size: 24px;
      font-family: 'Pretendard', sans-serif;
      h3 {
        font-family: 'Pretendard', sans-serif;
        margin-right: 1rem;
        font-weight: 600;
      }
    }
  }

  .detail {
    padding: 2rem 3.5rem;
    font-size: 18px;
    font-weight: 500;

    .nutrient__detail {
      margin-bottom: 2rem;
      font-weight: 700;
      font-size: 20px;
    }

    p:first-child {
      margin-bottom: 1.5rem;
    }
  }

  .detail__data {
    display: flex;
    justify-content: space-between;
  }

  .detail__data:first-child {
    margin-bottom: 2rem;
  }

  .no-result-message {
    margin-bottom: 1rem;
    color: var(--color-point);
  }

  .highlight {
    color: var(--color-primary);
  }

  .error-msg {
    text-align: center;
    width: 100%;
    height: 100%;
    color: ${({ theme }) => theme.color.darkGray};
    font-size: ${({ theme }) => theme.fontSize.smmh};

    span {
      font-size: 10rem;
      margin-bottom: 3rem;
    }
  }

  .click-no-result {
    height: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;

    p {
      font-family: 'yg-jalnan';
      font-size: 22px;
      margin-bottom: 3rem;
    }
  }
`
