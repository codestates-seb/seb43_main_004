import React from 'react'
import nutrientTypeMap from '../../utils/nutrientTypeMap'
import { NutritionBarItem } from './DiaryDetail'

interface NutritionItemProps {
  nutrientType: string
  diary: {
    calcul: {
      [key: string]: number
    }[]
    standardIntake: {
      [key: string]: number
    }[]
  }
  calculatePercent: (key: string) => number
  getColor: (percent: number) => string
}

// 일기 상세 페이지에서 통계를 표현하는 컴포넌트
const NutritionItem: React.FC<NutritionItemProps> = ({
  nutrientType,
  diary,
  calculatePercent,
  getColor,
}) => {
  const nutrientKey = Object.keys(nutrientTypeMap).find(
    (key) => nutrientTypeMap[key] === nutrientType
  )
  if (nutrientKey) {
    const percent = calculatePercent(nutrientKey)
    return (
      <li>
        <header>
          <p>{nutrientType}</p>
          <div>
            <span
              className={getColor(percent)}
            >{`${diary.calcul[0][nutrientKey]}g`}</span>
            <span>{` / ${diary.standardIntake[0][nutrientKey]}g`}</span>
          </div>
        </header>
        <div className="status__bar">
          <NutritionBarItem width={percent} color={getColor(percent)}>
            &nbsp;
          </NutritionBarItem>
        </div>
      </li>
    )
  }
  return null
}

export default NutritionItem
