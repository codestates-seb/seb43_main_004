// nutrientSlice.ts (수정 예시)
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { dtoResponsePage } from '../../dto'
import { nutrient } from '../../pages/FoodArchivePage'

export interface NutrientState {
  data: dtoResponsePage<nutrient> | null
  filteredData: dtoResponsePage<nutrient> | null // 필터링된 데이터 추가
  loading: boolean
  error: string | null
}

const initialState: NutrientState = {
  data: null,
  filteredData: null, // 만약 프론트에서 검색 필터링을 한다면 사용
  loading: false,
  error: null,
}

const nutrientSlice = createSlice({
  name: 'nutrient',
  initialState,
  reducers: {
    fetchNutrientDataStart(state) {
      state.loading = true
      state.error = null
    },
    fetchNutrientDataSuccess(
      state,
      action: PayloadAction<dtoResponsePage<nutrient>>
    ) {
      state.loading = false
      state.data = action.payload
      state.filteredData = action.payload
    },
    fetchNutrientDataFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  fetchNutrientDataStart,
  fetchNutrientDataSuccess,
  fetchNutrientDataFailure,
} = nutrientSlice.actions

export default nutrientSlice.reducer
