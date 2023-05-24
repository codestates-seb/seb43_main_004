import { createSlice } from '@reduxjs/toolkit'

const screenSizeSlice = createSlice({
  name: 'screenSize',
  initialState: {
    width: window.innerWidth,
  },
  reducers: {
    setScreenSize: (state, action) => {
      return {
        ...state,
        width: action.payload.width,
      }
    },
  },
})

export const { setScreenSize } = screenSizeSlice.actions
export default screenSizeSlice.reducer
