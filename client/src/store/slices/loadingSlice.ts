import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LoadingState {
  isLoading: boolean
}

const initialState: LoadingState = {
  isLoading: false,
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setLoading } = loadingSlice.actions
export default loadingSlice.reducer
