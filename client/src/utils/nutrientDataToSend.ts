const sendNutrientDataToServer = (data: NutrientData): void => {
  const dataToSend = {
    deficient: [] as { nutrient: string; integerValue: number }[],
    appropriate: [] as { nutrient: string; integerValue: number }[],
    excessive: [] as { nutrient: string; integerValue: number }[],
  }

  Object.entries(data).forEach(([nutrient, value]) => {
    if (nutrient !== 'sugar') {
      // 당분을 제외한 항목만 처리
      const integerValue = parseInt(value.toFixed(0), 10)
      if (integerValue < 80) {
        dataToSend['deficient'].push({ nutrient, integerValue })
      } else if (value > 120) {
        dataToSend['excessive'].push({ nutrient, integerValue })
      } else {
        dataToSend['appropriate'].push({ nutrient, integerValue })
      }
    }
  })

  //   fetch('your-server-url', {
  //     method: 'POST',
  //     body: JSON.stringify(dataToSend),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((response) => {
  //       // 성공적으로 전송된 경우 처리
  //     })
  //     .catch((error) => {
  //       // 전송 중 에러 발생한 경우 처리
  //     })
}

export default sendNutrientDataToServer

interface NutrientData {
  [key: string]: number
}
