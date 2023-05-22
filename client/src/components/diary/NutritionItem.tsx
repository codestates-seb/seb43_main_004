import React, { useEffect } from 'react'
import nutrientTypeMap from '../../utils/nutrientTypeMap'
import { NutritionBarItem } from './DiaryDetail'

interface NutritionItemProps {
  nutrientType: string
  diary: {
    dayList: {
      [key: string]: number
    }[]
    standardIntake: {
      [key: string]: number
    }[]
  }
  calculatePercent: (key: string) => number
  getColor: (percent: number) => string
  updateNutrientStatistics: (nutrientType: string, percent: number) => void
}

// 일기 상세 페이지에서 통계를 표현하는 컴포넌트
const NutritionItem: React.FC<NutritionItemProps> = ({
  nutrientType,
  diary,
  calculatePercent,
  getColor,
  updateNutrientStatistics,
}) => {
  const nutrientKey = Object.keys(nutrientTypeMap).find(
    (key) => nutrientTypeMap[key] === nutrientType
  )
  if (nutrientKey) {
    const percent = calculatePercent(nutrientKey)
    // nutrientType, percent가 변경 될 때만 실행되도록 (그전에는 무한 렌더링 발생해서..)
    useEffect(() => {
      updateNutrientStatistics(nutrientKey, percent)
    }, [nutrientKey, percent])

    return (
      <li>
        <header>
          <p>{nutrientType}</p>
          <div>
            <span className={getColor(percent)}>{`${
              diary.dayList[0][nutrientKey]
            }${
              nutrientType === '나트륨'
                ? 'mg'
                : nutrientType === '칼로리'
                ? 'kcal'
                : 'g'
            }`}</span>
            <span>{` / ${diary.standardIntake[0][nutrientKey]}${
              nutrientType === '나트륨'
                ? 'mg'
                : nutrientType === '칼로리'
                ? 'kcal'
                : 'g'
            }`}</span>
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
