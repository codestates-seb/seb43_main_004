import { configureStore } from '@reduxjs/toolkit'
import nutrientSlice from './slices/nutrientSlice'

export const store = configureStore({
  reducer: {
    nutrient: nutrientSlice,
  },
})

export type RootState = ReturnType<typeof store.getState> // useSelector 타입 지정.
export type AppDispatch = typeof store.dispatch
