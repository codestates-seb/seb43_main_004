import { configureStore } from '@reduxjs/toolkit'
import loadingSlice from './slices/loadingSlice'
import nutrientSlice from './slices/nutrientSlice'
import profileSlice from './slices/profileSlice'
import screenSizeSlice from './slices/screenSizeSlice'

export const store = configureStore({
  reducer: {
    nutrient: nutrientSlice,
    profile: profileSlice,
    screenSize: screenSizeSlice,
    loading: loadingSlice,
  },
})

export type RootState = ReturnType<typeof store.getState> // useSelector 타입 지정.
export type AppDispatch = typeof store.dispatch

store.subscribe(() => {
  const state = store.getState()
  const profileState = state.profile
  const serializedProfile = JSON.stringify(profileState)
  localStorage.setItem('profileState', serializedProfile)
})

const persistedProfileState = localStorage.getItem('profileState')
if (persistedProfileState) {
  const deserializedProfileState = JSON.parse(persistedProfileState)
  store.dispatch({
    type: 'profile/setProfileState',
    payload: deserializedProfileState.data,
  })
}
