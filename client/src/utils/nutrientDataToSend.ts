const sendNutrientDataToServer = (data: NutrientData) => {
  const dataToSend = {
    deficient: [] as { nutrient: string; integerValue: number }[],
    appropriate: [] as { nutrient: string; integerValue: number }[],
    excessive: [] as { nutrient: string; integerValue: number }[],
  }

  Object.entries(data).forEach(([nutrient, value]) => {
    if (nutrient !== 'sugar') {
      // 당분을 제외한 항목만 처리
      const integerValue = parseInt(value.toFixed(0))

      if (integerValue !== 0) {
        if (integerValue < 80) {
          dataToSend['deficient'].push({ nutrient, integerValue })
        } else if (integerValue > 120) {
          dataToSend['excessive'].push({ nutrient, integerValue })
        } else {
          dataToSend['appropriate'].push({ nutrient, integerValue })
        }
      }
    }
  })

  return dataToSend
}

export default sendNutrientDataToServer

interface NutrientData {
  [key: string]: number
}
