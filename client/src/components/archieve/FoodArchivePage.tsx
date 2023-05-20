import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../Common/Button'
import Input from '../Common/Input'
import PaginationComponent from '../Common/Pagination'
import { dtoResponsePage } from '../../dto'
import calculateSimilarity from '../../utils/calculateSimilarity'
import nutrientTypeMap from '../../utils/nutrientTypeMap'
import SearchHighlight from './SearchHighlight'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import {
  fetchNutrientDataStart,
  fetchNutrientDataSuccess,
  fetchNutrientDataFailure,
} from '../../store/slices/nutrientSlice'

const FoodArchive = () => {
  const [inputVal, setInputVal] = useState('')
  // const [nutrientData, setNutrientData] =
  //   useState<dtoResponsePage<nutrient> | null>(null) // 서버 응답 데이터
  const [filteredData, setFilteredData] = useState<nutrient[]>([]) // 검색하여 필터링 된 데이터
  const [selectData, setSelectData] = useState<nutrient | null>(null) // 클릭한 음식 데이터
  const [isNoResult, setIsNoResult] = useState(false)
  const [isHighlighted, setIsHighlighted] = useState(false) // 검색어 강조 여부 상태 추가

  const dispatch = useDispatch()
  const nutrientData = useSelector((state: RootState) => state.nutrient.data)
  const loading = useSelector((state: RootState) => state.nutrient.loading)
  const error = useSelector((state: RootState) => state.nutrient.error)

  const onClickSearchBtn = () => {
    if (nutrientData) {
      const inputKeywords = inputVal.split(/\s+/)
      const filtered = nutrientData.data.filter((item) => {
        const foodNameWithoutWhitespace = item.foodName.replace(/\s/g, '')
        return inputKeywords.every((keyword) =>
          foodNameWithoutWhitespace.includes(keyword)
        )
      })

      // 정렬: 가장 유사한 항목 먼저 보여주기
      const sortedData = filtered.sort((a, b) => {
        const similarityA = calculateSimilarity(a.foodName, inputVal)
        const similarityB = calculateSimilarity(b.foodName, inputVal)
        return similarityB - similarityA
      })

      setFilteredData(sortedData)
      setIsNoResult(sortedData.length === 0)
      setIsHighlighted(true)
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
    dispatch(fetchNutrientDataStart()) // 요청 시작 액션 디스패치
    axios
      .get('http://localhost:4000/nutrient')
      .then((res) => {
        dispatch(fetchNutrientDataSuccess(res.data)) // 성공 액션 디스패치
      })
      .catch((error) => {
        dispatch(fetchNutrientDataFailure(error.message)) // 실패 액션 디스패치
      })
  }, [dispatch])

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
        <Button onClick={onClickSearchBtn}>검색</Button>
      </div>
      {filteredData.length === 0 && isNoResult && (
        <p className="no-result-message">검색 결과가 없습니다.</p>
      )}
      <div className="archive">
        <ul className="archive__lists">
          {(filteredData.length === 0 ? nutrientData?.data : filteredData)?.map(
            (nutrient) => (
              <SearchHighlight
                key={nutrient.id}
                nutrient={nutrient}
                isHighlighted={isHighlighted}
                handleClickFood={handleClickFood}
                value={inputVal}
              />
            )
          )}
        </ul>

        <div className="list__detail">
          {selectData ? (
            <div className="detail__container">
              <header>
                <h3>{selectData.foodName}</h3>
                <p>{selectData.intake}g</p>
              </header>
              <section className="detail">
                <div className="detail__data">
                  <p className="detail__kcal">칼로리</p>
                  <p>{selectData.kcal}kcal</p>
                </div>
                <p className="nutrient__detail">상세영양소</p>
                {Object.entries(selectData).map(
                  ([key, value]) =>
                    key !== 'id' &&
                    key !== 'foodName' &&
                    key !== 'intake' &&
                    key !== 'kcal' && (
                      <div className="detail__data" key={key}>
                        <p>{nutrientTypeMap[key]}</p>
                        <p>{value}g</p>
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
      <PaginationComponent totalItemsCount={7000} />
    </FoodArchiveWrapper>
  )
}

export default FoodArchive

export interface nutrient {
  id: number
  foodName: string
  intake: number
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
