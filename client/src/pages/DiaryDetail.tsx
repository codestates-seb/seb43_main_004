import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../components/Common/Button'
import Modal from '../components/Common/Modal'
import MealList from '../components/diary/MealItem'
import NutritionItem from '../components/diary/NutritionItem'
import sendNutrientDataToServer from '../utils/nutrientDataToSend'
import NutrientComments from '../utils/nutrientComment'
import MobileDetail from '../components/diary/MobileDetail'
import { useSelector, useDispatch } from 'react-redux'
import { getCookie } from '../utils/Cookie'
import { ApiCaller } from '../utils/apiCaller'
import { RootState } from '../store'
import { setScreenSize } from '../store/slices/screenSizeSlice'
import { debounce } from '../utils/timefunc'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const DiaryDetail = () => {
  const [diary, setDiary] = useState<Diary | null>(null)
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'] // 요일을 구하기 위한 배열
  const [memoContent, setMemoContent] = useState(diary?.memo)
  const [isOpenMemo, setIsOpenMemo] = useState(true)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [nutrientStatistics, setNutrientStatistics] = useState<{
    [key: string]: number
  }>({})

  const navigate = useNavigate()
  const { id } = useParams()
  const textareaEl = useRef<HTMLTextAreaElement>(null)
  const windowWidth = useSelector((state: RootState) => state.screenSize.width)
  const dispatch = useDispatch()

  // 통계를 낸 영양소를 저장하는 함수 (퍼센트로 저장)
  const updateNutrientStatistics = (nutrientType: string, percent: number) => {
    setNutrientStatistics((prevStatistics: Record<string, number>) => ({
      ...prevStatistics,
      [nutrientType]: percent,
    }))
  }

  // // 식단 등록하기 버튼을 누르면 실행
  // const handlePlusDiary = () => {
  //   const mealTypes = ['아침', '점심', '저녁', '간식']
  //   const mealTypeMap: { [key: string]: string } = {
  //     아침: 'BREAKFAST',
  //     점심: 'LUNCH',
  //     저녁: 'DINNER',
  //     간식: 'SNACK',
  //   }

  //   // mealType에 따라 식단이 등록되어있는지 확인할 수 있는 변수ㄴ
  //   const isPlanner = mealTypes.map((el) => {
  //     const hasData = diary?.meal.some(
  //       (meal) => meal.mealType === mealTypeMap[el]
  //     )
  //     return { mealType: el, hasData }
  //   })

  //   navigate(`/diaries/${id}/add`, { state: { meal: isPlanner } })
  // }

  const onChangeModal = () => {
    setIsOpenModal((prev) => !prev)
  }

  // 수정 버튼을 누르면 실행
  const handleEditMeal = (mealData: Meal[] | { [key: string]: string }) => {
    navigate(`/diaries/${id}/update`, { state: { meal: mealData } })
  }

  // 식사 시간별로 삭제
  const handleDeleteMeal = (mealData: Meal[] | { [key: string]: string }) => {
    if (Array.isArray(mealData)) {
      Promise.all(
        mealData.map((meal) =>
          axios.delete(
            `${process.env.REACT_APP_SERVER_URL}/diaries/${id}/meal/delete/${meal.mealId}`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getCookie('access')}`,
              },
            }
          )
        )
      )
        .then(() => {
          toast.success('메모 작성이 완료되었습니다!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          })
          axios
            .get(`${process.env.REACT_APP_SERVER_URL}/diaries/${id}`, {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getCookie('access')}`,
              },
            })
            .then((res) => {
              setDiary(res.data) // 상태 업데이트
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  // textarea 요소 있는 value의 마지막으로 커서 이동
  const onEditMemo = () => {
    const textarea = textareaEl.current
    setIsOpenMemo(false)
    textareaEl.current?.focus()
    textarea?.setSelectionRange(textarea?.value.length, textarea?.value.length)
  }

  const onChangeMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemoContent(e.target.value)
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

  // 메모 작성 / 수정 함수
  const onSendMemo = () => {
    axios
      .patch(
        `${process.env.REACT_APP_SERVER_URL}/diaries/update/${id}`,
        {
          memo: memoContent,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie('access')}`,
          },
        }
      )
      .then(() => {
        toast.success('메모 작성이 완료되었습니다!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
        setIsOpenMemo(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onDeleteDiary = () => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/diaries/delete/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('access')}`,
        },
      })
      .then(() => {
        setIsOpenModal((prev) => !prev)
        navigate(`/diaries`)
      })
  }

  // 이모지를 제공하는 함수
  const getEmoji = (
    deficientCount: number,
    appropriateCount: number,
    excessiveCount: number
  ) => {
    if (deficientCount >= 3) {
      return '😵' // 부족한 항목에 대한 이모지 반환
    } else if (excessiveCount >= 3) {
      return '😭' // 과다한 항목에 대한 이모지 반환
    } else if (appropriateCount >= 3) {
      return '😄' // 적정한 항목에 대한 이모지 반환
    } else {
      return '😵'
    }
  }

  // 퍼센트에 따른 색상 지정(차트 그래프, 성분량 글씨에 적용됨)
  const getColor = (percent: number) => {
    if (percent === 0) return ''
    if (percent < 80) return 'F2AE1C'
    if (percent <= 120) return '4C7031'
    return 'C50000'
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/diaries/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('access')}`,
          'ngrok-skip-browser-warning': '69420',
        },
      })
      .then((res) => {
        setDiary(res.data)
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          toast.warning('토큰이 만료되었습니다.')
          navigate('/sign-in')
        }
      })

    const handleResize = debounce(() => {
      dispatch(setScreenSize({ width: window.innerWidth }))
    }, 200)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [id, dispatch])

  useEffect(() => {
    if (diary) {
      setMemoContent(diary.memo)
    }
  }, [diary])

  useEffect(() => {
    if (nutrientStatistics) {
      const data = sendNutrientDataToServer(nutrientStatistics)

      // axios
      //   .post(
      //     `${process.env.REACT_APP_SERVER_URL}/diaries/recommend-recipe`,
      //     {
      //       data,
      //     },
      //     {
      //       headers: {
      //         'Content-Type': 'application/json',
      //         Authorization: `Bearer ${getCookie('access')}`,
      //       },
      //     }
      //   )
      //   .then((res) => {
      //     console.log(res)
      //   })
      if (diary) {
        const emoji = getEmoji(
          data['deficient'].length,
          data['appropriate'].length,
          data['excessive'].length
        )

        if (emoji !== diary?.diaryStatus && diary?.meal.length !== 0) {
          axios
            .patch(
              `${process.env.REACT_APP_SERVER_URL}/diaries/update/${id}`,
              {
                diaryStatus: emoji,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${getCookie('access')}`,
                },
              }
            )
            .then(() => {
              axios
                .get(`${process.env.REACT_APP_SERVER_URL}/diaries/${id}`, {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getCookie('access')}`,
                  },
                })
                .then((res) => {
                  setDiary(res.data)
                })
            })
            .catch((err) => {
              console.log(err)
            })
        }
      }
    }
  }, [id, nutrientStatistics, diary])

  return (
    <Wrapper>
      <h2 className="title">나의 식단일기</h2>
      {diary && (
        <DiaryDetailWrapper>
          <Modal
            state={isOpenModal}
            setState={setIsOpenModal}
            msg={
              '작성한 식단일기가 삭제되며, 복구 할 수 없습니다. \n 정말로 삭제하시겠습니까? '
            }
          >
            <Button onClick={onChangeModal} outline={true}>
              취소
            </Button>
            <Button onClick={onDeleteDiary}>확인</Button>
          </Modal>
          <div className="diary__container">
            <h3 className="diary__header">
              <div className="diary__header__title">
                <p>{`${new Date(diary.userDate).getMonth() + 1}월 ${new Date(
                  diary.userDate
                ).getDate()}일 ${
                  weekdays[new Date(diary.userDate).getDay()]
                }요일`}</p>
                {diary.diaryStatus !== null ? (
                  <div className="header__emoji">{diary.diaryStatus}</div>
                ) : (
                  <div className="header__emoji">{`🫥`}</div>
                )}
              </div>
              <div className="diary__header__btn">
                <Button onClick={onChangeModal} outline={true}>
                  <span className="material-symbols-outlined">delete</span>
                  모든 기록 삭제
                </Button>
                {/* <Button onClick={handlePlusDiary}>
                  <span className="material-symbols-outlined">edit</span>
                  식단 등록하기
                </Button> */}
              </div>
            </h3>
            <MealList
              diary={diary}
              handleEditMeal={handleEditMeal}
              handleDeleteMeal={handleDeleteMeal}
            />
            <div className="diary__memo">
              <header>
                <p>메모</p>
                {isOpenMemo === true ? (
                  <span
                    className="material-symbols-outlined"
                    onClick={onEditMemo}
                  >
                    edit
                  </span>
                ) : (
                  <span
                    className="material-symbols-outlined"
                    onClick={onSendMemo}
                  >
                    send
                  </span>
                )}
              </header>
              <textarea
                readOnly={isOpenMemo}
                ref={textareaEl}
                value={memoContent}
                onChange={onChangeMemo}
              ></textarea>
            </div>
          </div>
          {windowWidth > 560 ? (
            <div className="aside_container">
              <div className="status__container">
                <h2>오늘의 식단</h2>
                <NutritionBar>
                  {[
                    '칼로리',
                    '탄수화물',
                    '단백질',
                    '지방',
                    '당분',
                    '나트륨',
                  ].map((el, idx) => (
                    <NutritionItem
                      key={idx}
                      nutrientType={el}
                      diary={diary}
                      calculatePercent={calculatePercent}
                      getColor={getColor}
                      updateNutrientStatistics={updateNutrientStatistics}
                    />
                  ))}
                </NutritionBar>
              </div>
              <div className="recipe__container">
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
            <MobileDetail diary={diary} />
          )}
        </DiaryDetailWrapper>
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Wrapper>
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

const Wrapper = styled.div`
  max-width: 1150px;
  width: calc(100% - 25rem);
  white-space: nowrap;
  margin-bottom: 3rem;

  h2 {
    font-size: 28px;
    margin-bottom: 20px;
  }

  @media (max-width: 780px) {
    width: calc(100% - 15rem);
    h2 {
      font-size: 22px;
    }
  }

  @media (max-width: 680px) {
    width: 100%;
    .title {
      margin-left: 7rem;
    }
  }

  @media (max-width: 550px) {
    .title {
      margin: 1rem 1.5rem;
    }
  }
`
const DiaryDetailWrapper = styled.div`
  display: flex;

  .diary__container {
    flex: 8;
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

      .diary__header__title {
        display: flex;
        align-items: center;
      }

      .diary__header__btn {
        display: flex;
      }

      .header__emoji {
        font-size: 24px;
      }
    }
  }

  .diary__list {
    margin-bottom: 1rem;
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
        font-size: 17px;
        font-weight: 600;
      }
      span {
        cursor: pointer;
        transition: all 0.2s linear;
      }
      span:hover {
        transform: scale(1.2);
      }
    }
  }

  .meal__lists {
    display: flex;
    flex-direction: column;
    padding: 1rem;

    .meal__list {
      position: relative;
      border: 1px solid var(--color-light-gray);
      border-radius: 9px;
      padding: 1.2rem;
      margin-bottom: 1.2rem;

      p:first-child {
        font-size: 14px;
        margin-bottom: 0.4rem;
      }

      p:nth-child(2) {
        font-size: 12px;
        color: #757575;
      }

      span {
        font-size: 14px;
        font-weight: 600;
        position: absolute;
        top: 2rem;
        right: 1rem;
      }
    }
  }

  .meal__list__yet {
    color: var(--color-light-gray);
    font-size: 14px;
    margin-bottom: 1.2rem;
  }

  .status__container,
  .recipe__container {
    flex: 2;
    padding: 1.7rem;
    width: 230px;
    border: 1px solid var(--color-light-gray);
    border-radius: 15px;
    margin-left: 2rem;
    margin-bottom: 3.5rem;

    h2 {
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

  .diary__memo {
    header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;

      p {
        font-size: 17px;
        font-weight: 600;
      }
      span {
        cursor: pointer;
        transition: all 0.2s linear;
      }
      span:hover {
        transform: scale(1.2);
      }
    }

    textarea {
      resize: none;
      width: 100%;
      height: 170px;
      border-radius: 8px;
      outline: none;
      font-weight: 300;
      font-family: 'Pretendard', sans-serif;
      padding: 1rem;
      font-size: 15px;
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

  .recipe__list {
    font-weight: 500;
    display: flex;

    align-items: center;
    margin-bottom: 1rem;

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
    width: calc(100% - 7rem);
    .diary__container {
      margin-left: 7rem;
    }
  }

  @media (max-width: 560px) {
    flex-direction: column;
    width: 100%;
    .diary__container {
      width: calc(100% - 3rem);
      margin: 0 auto;
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

export default DiaryDetail
