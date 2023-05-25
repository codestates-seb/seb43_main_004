const sendNutrientDataToServer = (data: NutrientData) => {
  const dataToSend = {
    deficient: [] as string[],
    appropriate: [] as string[],
    excessive: [] as string[],
  }

  Object.entries(data).forEach(([nutrient, value]) => {
    if (nutrient !== 'totalSugar') {
      // 당분을 제외한 항목만 처리
      const integerValue = parseInt(value.toFixed(0))

      if (integerValue < 80) {
        dataToSend['deficient'].push(nutrient)
      } else if (integerValue > 120) {
        dataToSend['excessive'].push(nutrient)
      } else {
        dataToSend['appropriate'].push(nutrient)
      }
    }
  })

  return dataToSend
}

export default sendNutrientDataToServer

interface NutrientData {
  [key: string]: number
}
