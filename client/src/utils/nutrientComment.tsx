import React from 'react'

const NutrientComments: React.FC<NutrientCommentsProps> = ({
  nutrientStatistics,
}) => {
  const nutrientComments: NutrientComments = {
    protein: '단백질',
    fat: '지방',
    carbohydrate: '탄수화물',
    salt: '나트륨',
    sugar: '당분',
  }

  const generateComment = (): string => {
    const lackingNutrients: string[] = []
    const excessiveNutrients: string[] = []

    // 부족한 성분과 과다한 성분을 구분하여 배열에 추가
    Object.entries(nutrientStatistics).forEach(([nutrient, value]) => {
      if (nutrient !== 'kcal') {
        if (value < 80) {
          lackingNutrients.push(nutrientComments[nutrient])
        } else if (value > 120) {
          excessiveNutrients.push(nutrientComments[nutrient])
        }
      }
    })

    let comment = ''

    // 부족한 성분에 대한 코멘트 생성
    if (lackingNutrients.length > 1) {
      comment += `${lackingNutrients.join(', ')}이 부족합니다.\n`
    }

    // 과다한 성분에 대한 코멘트 생성
    if (excessiveNutrients.length > 0) {
      if (comment !== '') {
        comment += '\n'
      }
      comment += `${excessiveNutrients.join('과 ')}이 과다합니다.`
    }

    return comment
  }

  const comment = generateComment()

  return <p className="comment">{comment}</p>
}

interface NutrientCommentsProps {
  nutrientStatistics: Record<string, number>
}

interface NutrientComments {
  [key: string]: string
}

export default NutrientComments
