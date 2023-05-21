const calculateSimilarity = (text1: string, text2: string) => {
  const m = text1.length
  const n = text2.length

  // 레벤슈타인 거리를 계산하기 위한 2차원 배열 초기화
  const dp: number[][] = []
  for (let i = 0; i <= m; i++) {
    dp[i] = []
    dp[i][0] = i
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j
  }

  // 레벤슈타인 거리 계산
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1, // 삭제
          dp[i][j - 1] + 1, // 삽입
          dp[i - 1][j - 1] + 1 // 대체
        )
      }
    }
  }

  // 레벤슈타인 거리를 이용한 유사도 계산
  const maxLen = Math.max(m, n)
  const distance = dp[m][n]
  const similarity = 1 - distance / maxLen

  return similarity
}

export default calculateSimilarity
