import React, { useCallback, useEffect, useState } from 'react'
import { styled } from 'styled-components'
import Input from '../Common/Input'
import { FoodList } from '../../pages/DiaryWrite'

const StyledFoodItem = styled.li`
  position: relative;
  border: 1px solid ${({ theme }) => theme.color.lightGray};
  border-radius: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 2rem;

  &:not(:last-child) {
    margin-bottom: 3rem;
  }

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
      margin-right: 5rem;

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
  .btn-food-delete {
    font-size: ${({ theme }) => theme.fontSize.smh};
    position: absolute;
    top: 2.5rem;
    right: 2rem;
  }

  .food-info {
    color: ${({ theme }) => theme.color.darkGray};

    p {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }
  }

  @media ${({ theme }) => theme.device.mobile} {
    .food-title {
      gap: 0;

      .food-intake {
        gap: 1rem;

        .intake-counter {
          gap: 0;

          input {
            width: 50%;
          }
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
`

interface FoodItemProps {
  data: FoodList
  setInfo: (id: number, content: { [key: string]: number | string }) => void
  delete: (title: string) => void
  custom?: boolean
}

const FoodItem = (props: FoodItemProps) => {
  const { custom, data, delete: deleteItem, setInfo } = props

  const id = data.nutrientId
  const [origin, setOrigin] = useState({ ...data }) // 보존해둘 데이터 원본
  const defaultIntake = origin.intake // 기본 섭취량

  const handleIntakeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자만 입력가능
    if (isNaN(Number(e.target.value))) return
    setInfo(id, { intake: Number(e.target.value) })
  }

  const handleIncrease = () => {
    setInfo(id, { intake: data.intake + 100 })
  }

  const handleDecrease = () => {
    if (data.intake - 100 >= 0) {
      setInfo(id, { intake: data.intake - 100 })
    }
  }

  useEffect(() => {
    const changeAmount = () => {
      // 섭취량에 따라 영양소 값 변화
      const ratio = data.intake / defaultIntake
      if (ratio === 1) {
        setInfo(id, {
          kcal: origin.kcal,
          carbohydrate: origin.carbohydrate,
          protein: origin.protein,
          fat: origin.fat,
          sugar: origin.sugar,
          salt: origin.salt,
        })
      } else {
        setInfo(id, {
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
  }, [data.intake])

  const customOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name !== 'title' && isNaN(Number(value))) return
    setInfo(id, { [name]: value })
  }

  return (
    <StyledFoodItem>
      {custom ? (
        <>
          <button
            type="button"
            className="btn-food-delete"
            onClick={() => deleteItem(data.title)}
          >
            <span className="material-icons-round">close</span>
          </button>
          <div className="food-title">
            <Input
              label="음식명"
              type="text"
              placeholder="음식명"
              name="title"
              value={data.title}
              onChange={customOnChange}
            />
            <div className="food-intake">
              <Input
                label="1인분 기준 섭취량(g)"
                type="text"
                placeholder="g"
                name="intake"
                value={data.intake.toString()}
                onChange={customOnChange}
              />
              <Input
                label="kcal"
                type="text"
                placeholder="kcal"
                name="kcal"
                value={data.kcal.toString()}
                onChange={customOnChange}
              />
            </div>
          </div>
          <div className="food-info">
            <Input
              label="탄수화물"
              type="text"
              placeholder="g"
              name="carbohydrate"
              value={data.carbohydrate.toString()}
              onChange={customOnChange}
            />
            <Input
              label="단백질"
              type="text"
              placeholder="g"
              name="protein"
              value={data.protein.toString()}
              onChange={customOnChange}
            />
            <Input
              label="지방"
              type="text"
              placeholder="g"
              name="fat"
              value={data.fat.toString()}
              onChange={customOnChange}
            />
            <Input
              label="당류"
              type="text"
              placeholder="g"
              name="sugar"
              value={data.sugar.toString()}
              onChange={customOnChange}
            />
            <Input
              label="나트륨"
              type="text"
              placeholder="mg"
              name="salt"
              value={data.salt.toString()}
              onChange={customOnChange}
            />
          </div>
        </>
      ) : (
        <>
          <button
            type="button"
            className="btn-food-delete"
            onClick={() => deleteItem(data.title)}
          >
            <span className="material-icons-round">close</span>
          </button>
          <div className="food-title">
            <p className="food-name">{data.title}</p>
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
                  value={data.intake}
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
              <span>{data.protein}g</span>
            </p>
            <p>
              <span>나트륨</span>
              <span>{data.fat}mg</span>
            </p>
          </div>
        </>
      )}
    </StyledFoodItem>
  )
}

export default React.memo(FoodItem)
