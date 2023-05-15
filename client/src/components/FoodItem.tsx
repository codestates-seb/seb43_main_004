import React from 'react'
import IntakeCounter from './IntakeCounter'
import { styled } from 'styled-components'
import Input from './Common/Input'
import { FoodList } from '../pages/DiaryWrite'

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
  custom?: boolean
  data: FoodList
  delete: (title: string) => void
}

const FoodItem = (props: FoodItemProps) => {
  const { custom, data, delete: deleteItem } = props

  // 칼로리 계산에 사용할 상태
  // 칼로리 = (탄수화물 그램 수 x 4) + (단백질 그램 수 x 4) + (지방 그램 수 x 9)

  const onclick = () => {
    console.log('onclick')
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
              type="text"
              placeholder="음식명"
              name="foodName"
              onChange={onclick}
            />
            <div className="food-intake">
              <p>1인분 기준 섭취량(g)</p>
              <IntakeCounter standard={data.intake} />
              <p className="kcal">238kcal</p>
            </div>
          </div>
          <div className="food-info">
            <Input
              label="탄수화물"
              type="text"
              placeholder="g"
              name="carbohydrate"
              onChange={onclick}
            />
            <Input
              label="단백질"
              type="text"
              placeholder="g"
              name="protein"
              onChange={onclick}
            />
            <Input
              label="지방"
              type="text"
              placeholder="g"
              name="fat"
              onChange={onclick}
            />
            <Input
              label="당류"
              type="text"
              placeholder="g"
              name="sugar"
              onChange={onclick}
            />
            <Input
              label="나트륨"
              type="text"
              placeholder="mg"
              name="salt"
              onChange={onclick}
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
              <IntakeCounter standard={data.intake} />
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

export default FoodItem
