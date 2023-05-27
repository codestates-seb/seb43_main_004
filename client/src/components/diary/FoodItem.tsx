import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import Input from '../Common/Input'
import { FoodList } from '../../pages/DiaryWrite'
import { useLocation } from 'react-router-dom'

const StyledFoodItem = styled.li`
  position: relative;
  border: 1px solid ${({ theme }) => theme.color.lightGray};
  border-radius: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 2rem;

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  .food-title {
    margin-bottom: 2rem;
    gap: 10%;

    .food-name {
      font-size: ${({ theme }) => theme.fontSize.smh};
      font-weight: 700;
    }

    .food-intake {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 3rem;

      .intake-counter {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;

        button {
          font-size: ${({ theme }) => theme.fontSize.larger};
        }

        input {
          border: 1px solid ${({ theme }) => theme.color.darkGray};
          border-radius: 0.6rem;
          padding: 1rem;
          text-align: center;
          font-weight: 500;
        }
      }

      .kcal {
        font-weight: 500;
      }
    }
  }

  .btns {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: ${({ theme }) => theme.fontSize.smh};
    gap: 1rem;
  }

  .food-info {
    color: ${({ theme }) => theme.color.darkGray};
    gap: 1rem;

    p {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }
  }

  @media ${({ theme }) => theme.device.tablet} {
    .food-title {
      gap: 0;

      .food-intake {
        gap: 1rem;

        .intake-counter {
          gap: 0;
          justify-content: space-evenly;

          input {
            width: 50%;
          }
        }
      }

      &.custom {
        .food-name {
          width: 100%;
          margin-bottom: 2rem;
        }

        .food-intake {
          width: 100%;
        }
      }
    }

    .food-info {
      & > * {
        width: 45%;
        margin-bottom: 0.5rem;
      }
    }
  }

  @media ${({ theme }) => theme.device.mobile} {
    .food-title {
      .food-name {
        font-size: ${({ theme }) => theme.fontSize.larger};
        width: 100%;
        margin-bottom: 2rem;
      }

      .food-intake {
        gap: 0.5rem;

        .intake-counter {
          width: 50%;
        }
      }
    }

    .food-info.custom {
      flex-wrap: wrap;

      > div {
        width: 48%;
        flex: 0 0 auto;
      }
    }
  }
`

interface FoodItemProps {
  data: FoodList
  setStage: React.Dispatch<React.SetStateAction<FoodList | null>>
  custom?: boolean
}

const FoodItem = (props: FoodItemProps) => {
  const { custom, data, setStage } = props

  const [origin, setOrigin] = useState({ ...data }) // 보존해둘 데이터 원본
  const defaultIntake = origin.servingSize // 기본 섭취량

  const handleIntakeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자만 입력가능
    if (isNaN(Number(e.target.value))) return
    setStage({ ...data, servingSize: Number(e.target.value) })
  }

  const handleIncrease = () => {
    setStage({ ...data, servingSize: Number(data.servingSize) + 100 })
  }

  const handleDecrease = () => {
    if (data.servingSize - 100 >= 0) {
      setStage({ ...data, servingSize: Number(data.servingSize) - 100 })
    }
  }

  useEffect(() => {
    const changeAmount = () => {
      // 섭취량에 따라 영양소 값 변화
      const ratio = data.servingSize / defaultIntake
      if (ratio === 1) {
        setStage({
          ...data,
          kcal: origin.kcal,
          carbohydrate: origin.carbohydrate,
          protein: origin.protein,
          fat: origin.fat,
          sugar: origin.sugar,
          salt: origin.salt,
        })
      } else {
        setStage({
          ...data,
          kcal: Number((origin.kcal * ratio).toFixed(2)),
          carbohydrate: Number((origin.carbohydrate * ratio).toFixed(2)),
          protein: Number((origin.protein * ratio).toFixed(2)),
          fat: Number((origin.fat * ratio).toFixed(2)),
          sugar: Number((origin.sugar * ratio).toFixed(2)),
          salt: Number((origin.salt * ratio).toFixed(2)),
        })
      }
    }

    if (!custom) {
      changeAmount()
    }
  }, [data.servingSize])

  const customOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name !== 'foodName' && !/^[0-9.]*$/.test(value)) return
    if (name === 'foodName') {
      setStage({ ...data, [name]: value })
    } else {
      setStage({ ...data, [name]: value })
    }
  }

  return (
    <StyledFoodItem>
      {custom ? (
        <>
          <div className="food-title custom">
            <div className="food-name">
              {data.foodName ? (
                <Input
                  label="음식명"
                  type="text"
                  placeholder="음식명"
                  name="foodName"
                  value={data.foodName}
                  onChange={customOnChange}
                />
              ) : (
                <Input
                  label="음식명"
                  type="text"
                  placeholder="음식명"
                  name="foodName"
                  value={data.title}
                  onChange={customOnChange}
                />
              )}
            </div>
            <div className="food-intake">
              <Input
                label="1인분 기준 섭취량(g)"
                type="text"
                placeholder="g"
                name="servingSize"
                value={data.servingSize}
                onChange={customOnChange}
              />
              <Input
                label="kcal"
                type="text"
                placeholder="kcal"
                name="kcal"
                value={data.kcal}
                onChange={customOnChange}
              />
            </div>
          </div>
          <div className="food-info custom">
            <Input
              label="탄수화물"
              type="text"
              placeholder="g"
              name="carbohydrate"
              value={data.carbohydrate}
              onChange={customOnChange}
            />
            <Input
              label="단백질"
              type="text"
              placeholder="g"
              name="protein"
              value={data.protein}
              onChange={customOnChange}
            />
            <Input
              label="지방"
              type="text"
              placeholder="g"
              name="fat"
              value={data.fat}
              onChange={customOnChange}
            />
            <Input
              label="당류"
              type="text"
              placeholder="g"
              name="sugar"
              value={data.sugar}
              onChange={customOnChange}
            />
            <Input
              label="나트륨"
              type="text"
              placeholder="mg"
              name="salt"
              value={data.salt}
              onChange={customOnChange}
            />
          </div>
        </>
      ) : (
        <>
          <div className="food-title">
            {data.foodName ? (
              <p className="food-name">{data.foodName}</p>
            ) : (
              <p className="food-name">{data.title}</p>
            )}
            <div className="food-intake">
              <p>섭취량(g)</p>
              <div className="intake-counter">
                <button
                  type="button"
                  className="decrease"
                  onClick={handleDecrease}
                >
                  <span className="material-icons-round">remove</span>
                </button>
                <input
                  type="text"
                  value={data.servingSize}
                  onChange={(e) => handleIntakeChange(e)}
                />
                <button
                  type="button"
                  className="increase"
                  onClick={handleIncrease}
                >
                  <span className="material-icons-round">add</span>
                </button>
              </div>
              <p className="kcal">{data.kcal}kcal</p>
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
              <span>{data.sugar}g</span>
            </p>
            <p>
              <span>나트륨</span>
              <span>{data.salt}mg</span>
            </p>
          </div>
        </>
      )}
    </StyledFoodItem>
  )
}

export default React.memo(FoodItem)
