import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { User } from '../../utils/interface'

interface initialType {
  data: User
  loading: boolean
  error: string | null
}

const initialState: initialType = {
  data: {
    memberId: 0,
    email: '',
    gender: '',
    nickName: '',
    birth: '',
    height: 0,
    weight: 0,
    activity: '',
    icon: '',
  },
  loading: false,
  error: null,
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    __getUser(state, action: PayloadAction<User>) {
      state.data = action.payload
    },
    __editUser(state, action: PayloadAction<User>) {
      state.data = { ...state.data, ...action.payload }
    },
    setProfileState(state, action: PayloadAction<User>) {
      state.data = action.payload
    },
  },
})

export const { __getUser, __editUser } = profileSlice.actions

export default profileSlice.reducer
