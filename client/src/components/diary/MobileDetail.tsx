import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../Common/Button'
import Modal from '../Common/Modal'
import MealList from './MealItem'
import NutritionItem from './NutritionItem'
import sendNutrientDataToServer from '../../utils/nutrientDataToSend'
import NutrientComments from '../../utils/nutrientComment'
import { ModalBackground } from './MobileStats'
import { useSelector, useDispatch } from 'react-redux'
import { getCookie } from '../../utils/Cookie'
import { RootState } from '../../store'
import { setScreenSize } from '../../store/slices/screenSizeSlice'
import { debounce } from '../../utils/timefunc'

const MobileDetail = ({ diary }: { diary: Diary }) => {
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'] // 요일을 구하기 위한 배열
  const [nutrientStatistics, setNutrientStatistics] = useState<{
    [key: string]: number
  }>({})
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isClosingModal, setIsClosingModal] = useState(false)

  const navigate = useNavigate()
  const { id } = useParams()

  const windowWidth = useSelector((state: RootState) => state.screenSize.width)
  const dispatch = useDispatch()
  console.log(windowWidth)

  const handleOpenModal = () => {
    setIsOpenModal(true)
  }

  const handleCloseModal = () => {
    setIsClosingModal(true)
    setTimeout(() => {
      setIsOpenModal(false)
      setIsClosingModal(false)
    }, 700)
  }

  // 통계를 낸 영양소를 저장하는 함수 (퍼센트로 저장)
  const updateNutrientStatistics = (nutrientType: string, percent: number) => {
    setNutrientStatistics((prevStatistics: Record<string, number>) => ({
      ...prevStatistics,
      [nutrientType]: percent,
    }))
  }
  // 표준 섭취량과 계산된 영양성분으로 퍼센트를 계산하는 함수
  const calculatePercent = (nutrientKey: string, totalNutrientKey: string) => {
    const dayListValue = diary?.dayList[0]?.[totalNutrientKey]
    const standardIntakeValue = diary?.standardIntakes[0]?.[nutrientKey]

    if (
      dayListValue !== null &&
      standardIntakeValue !== null &&
      dayListValue !== undefined &&
      standardIntakeValue !== undefined
    ) {
      return (dayListValue / standardIntakeValue) * 100
    }
    return 0
  }

  // 퍼센트에 따른 색상 지정(차트 그래프, 성분량 글씨에 적용됨)
  const getColor = (percent: number) => {
    if (percent === 0) return ''
    if (percent < 80) return 'F2AE1C'
    if (percent <= 120) return '4C7031'
    return 'C50000'
  }

  useEffect(() => {
    const handleResize = debounce(() => {
      dispatch(setScreenSize({ width: window.innerWidth }))
    }, 200)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [id, dispatch])

  return (
    <>
      {isOpenModal && <ModalBackground onClick={handleCloseModal} />}
      <DiaryDetailWrapper>
        {isOpenModal ? (
          <div
            className={`status__container2 ${
              isClosingModal ? 'slide-down' : 'slide-up'
            }`}
          >
            <header className="modal__header">
              <h2>오늘의 식단</h2>
              <span
                className="material-symbols-outlined"
                onClick={handleCloseModal}
              >
                expand_more
              </span>
            </header>
            <NutritionBar>
              {['칼로리', '탄수화물', '단백질', '지방', '당분', '나트륨'].map(
                (el, idx) => (
                  <NutritionItem
                    key={idx}
                    nutrientType={el}
                    diary={diary}
                    calculatePercent={calculatePercent}
                    getColor={getColor}
                    updateNutrientStatistics={updateNutrientStatistics}
                  />
                )
              )}
            </NutritionBar>
            <div className="recipe__container2">
              <h2>추천 레시피</h2>
              {diary.recipe && diary.recipe.length !== 0 ? (
                <ul className="recipe__lists">
                  <NutrientComments nutrientStatistics={nutrientStatistics} />
                  {diary &&
                    diary.recipe.map((el, idx) => {
                      return (
                        <li className="recipe__list" key={idx}>
                          <img src={`${el.foodImage}`} />
                          <span>{el.foodName}</span>
                        </li>
                      )
                    })}
                </ul>
              ) : (
                <p className="no__statistics">
                  {`아직 등록된 음식이 없어\n 추천이 불가능합니다.`}
                </p>
              )}
            </div>
          </div>
        ) : (
          <DefaultModal onClick={handleOpenModal}>
            <p>지난주 통계</p>
            <span className="material-symbols-outlined">expand_less</span>
          </DefaultModal>
        )}
      </DiaryDetailWrapper>
    </>
  )
}

interface Diary {
  userDate: string
  memo: string
  diaryStatus: string
  meal: Meal[]
  standardIntakes: StandardIntakes[]
  dayList: DayList[]
  recipe: Recipe[]
  comment: string
}

export interface Meal {
  mealId: number
  title: string
  mealType: string
  kcal: number
  servingSize: number
  carbohydrate: number
  protein: number
  fat: number
  sugar: number
  salt: number
}

interface StandardIntakes {
  carbohydrate: number
  protein: number
  fat: number
  kcal: number
  sugar: number
  [key: string]: number
}

interface DayList {
  totalCarbohydrate: number
  totalProtein: number
  totalFat: number
  totalKcal: number
  totalSugar: number
  [key: string]: number
}

interface Recipe {
  foodName: string
  foodImage: string
}

const DiaryDetailWrapper = styled.div`
  .status__container2 {
    border: 1px solid var(--color-light-gray);
    border-radius: 15px 15px 0px 0px;
    padding: 1.7rem;
    width: 100%;
    position: fixed;
    bottom: 0;
    width: 100vw;

    background-color: white;
    z-index: 110;

    &.slide-up {
      /* 애니메이션 이름은 slide-up이며, 0.5초 동안 실행됩니다. */
      animation: slide-up 1s;
      /* 애니메이션 실행 방향을 위쪽으로 설정합니다. */
      animation-fill-mode: forwards;
      transition: 1s;
    }

    &.slide-down {
      animation: slide-down 1s;
      /* 애니메이션 실행 방향을 위쪽으로 설정합니다. */
      animation-fill-mode: forwards;
      transition: 1s;
    }

    .modal__header {
      display: flex;
      justify-content: center;
      align-items: center;
      h2 {
        margin: 0;
      }
    }

    h2 {
      font-size: 18px !important;
      text-align: center;
      margin-top: 1rem;
      font-size: 2.5rem;
      margin-bottom: 2rem;
    }

    p {
      white-space: pre-wrap;
      font-size: 15px;
    }
  }

  .recipe__container2 {
    margin-top: 4rem;

    h2 {
      margin: 0;
      margin-bottom: 2rem;
    }
  }

  .status__bar {
    width: 200px;
    height: 13px;
    position: relative;
    background-color: var(--color-light-gray);
    border-radius: 8px;
    margin-bottom: 1.2rem;
  }

  .recipe__lists {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 0 auto;
  }

  .recipe__list {
    width: 130px;
    font-weight: 500;
    margin-bottom: 1rem;
    justify-self: center;

    img {
      width: 45px;
      height: 45px;
      border-radius: 8px;
      margin-right: 1.2rem;
    }
  }

  .no__statistics {
    text-align: center;
  }

  .msg-box {
    width: 40%;
    max-width: 450px;
    padding: 4rem;
  }

  .comment {
    margin-bottom: 2rem;
    font-size: 15px;
    font-weight: 500;
  }

  @media (max-width: 780px) {
    .diary__container {
      .diary__header {
        p {
          font-size: 16px;
        }
      }
    }
  }

  @media (max-width: 680px) {
    width: 100%;
  }

  @keyframes slide-up {
    /* 0%에서는 translateY(100%)로 요소를 아래로 숨깁니다. */
    0% {
      transform: translateY(100%);
    }

    /* 100%에서는 translateY(0)으로 요소를 위로 올려서 보여줍니다. */
    100% {
      transform: translateY(0);
    }
  }

  /* slide-down 이라는 이름의 애니메이션을 정의합니다. */
  @keyframes slide-down {
    /* animation: slide-down 0.5s ease; */

    /* 0%에서는 요소가 보이는 상태로 시작합니다. */
    0% {
      opacity: 1;
      transform: translateY(0);
    }

    /* 100%에서는 요소가 아래로 사라지는 효과를 줍니다. */
    100% {
      opacity: 0;
      transform: translateY(100%);
    }
  }
`

// 동적인 가로 차트 스타일
const NutritionBar = styled.ul`
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    p {
      font-size: 14px;
      font-weight: 700;
    }
    span {
      font-size: 12px;
    }
  }

  .F2AE1C {
    color: #f2ae1c;
  }

  .C50000 {
    color: #c50000;
  }

  li {
    .status__bar {
      width: 100%;
    }
  }
`

export const NutritionBarItem = styled.span<{
  width: number
  color: string
}>`
  max-width: 100%;
  width: ${({ width }) => `${width}%`};
  background-color: ${({ color }) => `#${color}`};
  height: 13px;
  display: inline;
  position: absolute;
  left: 0;
  border-radius: 8px;
`

const DefaultModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: white;
  border: 1px solid var(--color-light-gray);
  border-radius: 8px 8px 0px 0px;
  p {
    font-family: 'yg-jalnan';
    font-size: 18px;
    margin-right: 1rem;
  }
`

export default MobileDetail
