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
  // setInfo: (id: number, content: { [key: string]: number | string }) => void
  setStage: React.Dispatch<React.SetStateAction<FoodList | null>>
  delete: (title: string) => void
  custom?: boolean
}

const FoodItem = (props: FoodItemProps) => {
  const { custom, data, delete: deleteItem, setStage } = props

  const id = data.foodId
  const [origin, setOrigin] = useState({ ...data }) // 보존해둘 데이터 원본
  const defaultIntake = origin.servingSize // 기본 섭취량

  const handleIntakeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자만 입력가능
    if (isNaN(Number(e.target.value))) return
    // setInfo(id, { servingSize: Number(e.target.value) })
    setStage({ ...data, servingSize: Number(e.target.value) })
  }

  const handleIncrease = () => {
    // setInfo(id, { servingSize: data.servingSize + 100 })
    setStage({ ...data, servingSize: data.servingSize + 100 })
  }

  const handleDecrease = () => {
    if (data.servingSize - 100 >= 0) {
      // setInfo(id, { servingSize: data.servingSize - 100 })
      setStage({ ...data, servingSize: data.servingSize - 100 })
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
          totalSugar: origin.totalSugar,
          salt: origin.salt,
        })
        // setInfo(id, {
        //   kcal: origin.kcal,
        //   carbohydrate: origin.carbohydrate,
        //   protein: origin.protein,
        //   fat: origin.fat,
        //   totalSugar: origin.totalSugar,
        //   salt: origin.salt,
        // })
      } else {
        setStage({
          ...data,
          kcal: Number((origin.kcal * ratio).toFixed(2)),
          carbohydrate: Number((origin.carbohydrate * ratio).toFixed(2)),
          protein: Number((origin.protein * ratio).toFixed(2)),
          fat: Number((origin.fat * ratio).toFixed(2)),
          totalSugar: Number((origin.totalSugar * ratio).toFixed(2)),
          salt: Number((origin.salt * ratio).toFixed(2)),
        })
        // setInfo(id, {
        //   kcal: Number((origin.kcal * ratio).toFixed(2)),
        //   carbohydrate: Number((origin.carbohydrate * ratio).toFixed(2)),
        //   protein: Number((origin.protein * ratio).toFixed(2)),
        //   fat: Number((origin.fat * ratio).toFixed(2)),
        //   totalSugar: Number((origin.totalSugar * ratio).toFixed(2)),
        //   salt: Number((origin.salt * ratio).toFixed(2)),
        // })
      }
    }

    if (!custom) {
      changeAmount()
    }
  }, [data.servingSize])

  const customOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name !== 'foodName' && isNaN(Number(value))) return
    if (name === 'foodName') {
      // setInfo(id, { [name]: value })
      setStage({ ...data, [name]: value })
    } else {
      // setInfo(id, { [name]: Number(value) })
      setStage({ ...data, [name]: Number(value) })
    }
  }

  return (
    <StyledFoodItem>
      <div className="btns">
        <button
          type="button"
          className="btn-food-edit"
          onClick={() => deleteItem(data.foodName)}
        >
          <span className="material-icons-round">edit</span>
        </button>
        <button
          type="button"
          className="btn-food-delete"
          onClick={() => deleteItem(data.foodName)}
        >
          <span className="material-icons-round">close</span>
        </button>
      </div>
      {custom ? (
        <>
          <div className="food-title">
            <Input
              label="음식명"
              type="text"
              placeholder="음식명"
              name="foodName"
              value={data.foodName}
              onChange={customOnChange}
            />
            <div className="food-intake">
              <Input
                label="1인분 기준 섭취량(g)"
                type="text"
                placeholder="g"
                name="servingSize"
                value={data.servingSize.toString()}
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
              name="totalSugar"
              value={data.totalSugar.toString()}
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
          <div className="food-title">
            <p className="food-name">{data.foodName}</p>
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
