import React from 'react'

interface Meal {
  foodName: string
  mealType: string
  kcal: number
}

interface MealListProps {
  diary: { meal: Meal[] }
}

const MealList: React.FC<MealListProps> = ({ diary }) => {
  const mealTypes = ['아침', '점심', '저녁', '간식']

  const mealTypeMap: { [key: string]: string } = {
    아침: 'BREAKFAST',
    점심: 'LUNCH',
    저녁: 'DINNER',
    간식: 'SNACK',
  }

  return (
    <ul>
      {mealTypes.map((el, idx) => {
        const mealData = diary.meal.filter(
          (meal) => meal.mealType === mealTypeMap[el]
        )
        return (
          <li className="diary__list" key={idx}>
            <header>
              <p>
                {`${el} ${
                  mealData.length
                    ? mealData.reduce((acc, cur) => acc + cur.kcal, 0)
                    : 0
                }Kcal`}
              </p>
              {mealData.length !== 0 && (
                <div>
                  <span className="material-symbols-outlined">edit</span>
                  <span className="material-symbols-outlined">delete</span>
                </div>
              )}
            </header>
            <ul className="meal__lists">
              {mealData.length !== 0 ? (
                mealData.map((data, idx) => (
                  <li className="meal__list" key={idx}>
                    <p>{data.foodName}</p>
                    <p>100g</p>
                    <span>{`${data.kcal}kcal`}</span>
                  </li>
                ))
              ) : (
                <p className="meal__list__yet">아직 입력하지 않았어요.</p>
              )}
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

export default MealList
