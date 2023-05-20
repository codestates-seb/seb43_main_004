// src/store/nutrientSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { dtoResponsePage } from '../../dto'
import { nutrient } from '../../components/archieve/FoodArchivePage'

export interface NutrientState {
  data: dtoResponsePage<nutrient> | null
  loading: boolean
  error: string | null
}

const initialState: NutrientState = {
  data: null,
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
