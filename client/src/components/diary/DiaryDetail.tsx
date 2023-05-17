import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../common/Button'
import Modal from '../common/Modal'

const DiaryDetail = () => {
  const [diary, setDiary] = useState<Diary | null>(null)
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'] // 요일을 구하기 위한 배열
  const [memoContent, setMemoContent] = useState(diary?.memo)
  const [isOpenMemo, setIsOpenMemo] = useState(true)
  const [isOpenModal, setIsOpenModal] = useState(false)

  const navigate = useNavigate()
  const { id } = useParams()
  const textareaEl = useRef<HTMLTextAreaElement>(null)

  const onClickBtn = () => {
    console.log('hi')
  }

  const onChangeModal = () => {
    setIsOpenModal((prev) => !prev)
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
  // undefined이거나 null인 경우에 기본값 0
  const calculatePercent = (nutrient: string) => {
    return (
      ((diary?.calcul[0]?.[nutrient] ?? 0) /
        (diary?.standardIntake[0]?.[nutrient] ?? 0)) *
      100
    )
  }
  // 메모 작성 / 수정 함수
  const onSendMemo = () => {
    axios
      .patch(`http://localhost:4000/diary/${id}`, { memo: memoContent })
      .then((res) => {
        console.log(`메모가 업데이트되었습니다. ${res}`) // toast창을 써야할 듯
        setIsOpenMemo(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onDeleteDiary = () => {
    axios.delete(`http://localhost:4000/diary/${id}`).then(() => {
      setIsOpenModal((prev) => !prev)
      navigate(`/diaries`)
    })
  }

  // 퍼센트에 따른 색상 지정(차트 그래프, 성분량 글씨에 적용됨)
  const getColor = (percent: number) => {
    if (percent === 0) return ''
    if (percent < 80) return 'F2AE1C'
    if (percent <= 120) return '4C7031'
    return 'C50000'
  }

  useEffect(() => {
    axios.get(`http://localhost:4000/diary/${id}`).then((res) => {
      setDiary(res.data)
    })
  }, [])

  useEffect(() => {
    if (diary) {
      setMemoContent(diary.memo)
    }
  }, [diary])

  return (
    <Wrapper>
      <h2>나의 식단일기</h2>
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
              <p>{`${new Date(diary.userDate).getMonth() + 1}월 ${new Date(
                diary.userDate
              ).getDate()}일 ${
                weekdays[new Date(diary.userDate).getDay()]
              }요일`}</p>
              <div className="diary__header__btn">
                <Button onClick={onChangeModal} outline={true}>
                  <span className="material-symbols-outlined">delete</span>
                  모든 기록 삭제
                </Button>
                <Button onClick={onClickBtn}>
                  <span className="material-symbols-outlined">edit</span>
                  식단 등록하기
                </Button>
              </div>
            </h3>
            <ul className="diary__lists">
              {['아침', '점심', '저녁', '간식'].map((el, idx) => {
                const mealData = diary.meal.filter((meal) => {
                  const mealTypeMap: { [key: string]: string } = {
                    아침: 'BREAKFAST',
                    점심: 'LUNCH',
                    저녁: 'DINNER',
                    간식: 'SNACK',
                  }
                  return meal.mealType === mealTypeMap[el]
                })
                return (
                  <li className="diary__list" key={idx}>
                    <header>
                      <p>{`${el} ${
                        mealData
                          ? mealData.reduce(
                              (acc, cur) => {
                                return { ...acc, kcal: acc.kcal + cur.kcal }
                              },
                              {
                                foodName: '',
                                mealType: '',
                                intake: 0,
                                kcal: 0,
                              } as Meal
                            ).kcal
                          : 0
                      }Kcal`}</p>
                      {mealData.length !== 0 && (
                        <div>
                          <span className="material-symbols-outlined">
                            edit
                          </span>
                          <span className="material-symbols-outlined">
                            delete
                          </span>
                        </div>
                      )}
                    </header>
                    <ul className="meal__lists">
                      {mealData.length !== 0 ? (
                        mealData.map((data, idx) => {
                          return (
                            <li className="meal__list" key={idx}>
                              <p>{data.foodName}</p>
                              <p>{data.intake}g</p>
                              <span>{`${data.kcal}kcal`}</span>
                            </li>
                          )
                        })
                      ) : (
                        <p className="meal__list__yet">
                          아직 입력하지 않았어요.
                        </p>
                      )}
                    </ul>
                  </li>
                )
              })}
            </ul>
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
          <div>
            <div className="status__container">
              <h2>오늘의 식단</h2>
              <NutritionBar>
                <li>
                  <header>
                    <p>칼로리</p>
                    <div>
                      <span
                        className={getColor(calculatePercent('kcal'))}
                      >{`${diary.calcul[0]?.kcal}kcal`}</span>
                      <span>{` / ${diary.standardIntake[0]?.kcal}kcal`}</span>
                    </div>
                  </header>
                  <div className="status__bar">
                    <NutritionBarItem
                      width={calculatePercent('kcal')}
                      color={getColor(calculatePercent('kcal'))}
                    >
                      &nbsp;
                    </NutritionBarItem>
                  </div>
                </li>
                {['탄수화물', '단백질', '지방', '당분'].map((el, idx) => {
                  const nutrientTypeMap: { [key: string]: string } = {
                    탄수화물: 'carbohydrate',
                    단백질: 'protein',
                    지방: 'fat',
                    당분: 'sugar',
                  }
                  return (
                    <li key={idx}>
                      <header>
                        <p>{el}</p>
                        <div>
                          <span
                            className={getColor(
                              calculatePercent(nutrientTypeMap[el])
                            )}
                          >{`${diary.calcul[0][nutrientTypeMap[el]]}g`}</span>
                          <span>{` /${
                            diary.standardIntake[0][nutrientTypeMap[el]]
                          }g`}</span>
                        </div>
                      </header>
                      <div className="status__bar">
                        <NutritionBarItem
                          width={calculatePercent(nutrientTypeMap[el])}
                          color={getColor(
                            calculatePercent(nutrientTypeMap[el])
                          )}
                        >
                          &nbsp;
                        </NutritionBarItem>
                      </div>
                    </li>
                  )
                })}
              </NutritionBar>
            </div>
            <div className="recipe__container">
              <h2>추천 레시피</h2>
              {diary.recipe.length !== 0 ? (
                <ul className="recipe__lists">
                  <p>코멘트 공간입니다.</p>
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
                <p>아직 등록된 일기가 없어 추천이 불가능합니다.</p>
              )}
            </div>
          </div>
        </DiaryDetailWrapper>
      )}
    </Wrapper>
  )
}

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
  kcal: number
  intake: number
}

interface StandardIntake {
  carbohydrate: number
  protein: number
  fat: number
  kcal: number
  sugar: number
  [key: string]: number
}

interface Calcul {
  carbohydrate: number
  protein: number
  fat: number
  kcal: number
  sugar: number
  [key: string]: number
}

interface Recipe {
  foodName: string
  foodImage: string
}

const Wrapper = styled.div`
  max-width: 1150px;
  width: calc(100% - 400px);
  white-space: nowrap;
  margin-bottom: 3rem;
  h2 {
    font-size: 28px;
    margin-bottom: 20px;
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
      .diary__header__btn {
        display: flex;
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
      margin-bottom: 3.5rem;
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

const NutritionBarItem = styled.span<{
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
