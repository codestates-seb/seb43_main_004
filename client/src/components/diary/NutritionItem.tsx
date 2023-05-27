import React, { useEffect } from 'react'
import nutrientTypeMap from '../../utils/nutrientTypeMap'
import totalNutrientTypeMap from '../../utils/totalNutritionType'
import { NutritionBarItem } from '../../pages/DiaryDetail'

interface NutritionItemProps {
  nutrientType: string
  diary: {
    dayList: {
      [key: string]: number
    }[]
    standardIntakes: {
      [key: string]: number
    }[]
  }
  calculatePercent: (nutrientKey: string, totalNutrientKey: string) => number
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

  const totalNutrientKey = Object.keys(totalNutrientTypeMap).find(
    (key) => totalNutrientTypeMap[key] === nutrientType
  )

  if (totalNutrientKey && nutrientKey) {
    const percent = calculatePercent(nutrientKey, totalNutrientKey)

    // nutrientType, percent가 변경 될 때만 실행되도록 (그전에는 무한 렌더링 발생해서..)
    useEffect(() => {
      updateNutrientStatistics(totalNutrientKey, percent)
    }, [totalNutrientKey, percent])

    return (
      <li>
        <header>
          <p>{nutrientType}</p>
          <div>
            <span className={getColor(percent)}>
              {diary.dayList[0][totalNutrientKey] !== undefined &&
              diary.dayList[0][totalNutrientKey] !== null
                ? `${diary.dayList[0][totalNutrientKey]}${
                    nutrientType === '나트륨'
                      ? 'mg'
                      : nutrientType === '칼로리'
                      ? 'kcal'
                      : 'g'
                  }`
                : `0${
                    nutrientType === '나트륨'
                      ? 'mg'
                      : nutrientType === '칼로리'
                      ? 'kcal'
                      : 'g'
                  }`}
            </span>
            <span>{` / ${diary.standardIntakes[0]?.[nutrientKey]?.toFixed(0)}${
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
