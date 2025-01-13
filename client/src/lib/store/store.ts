import { configureStore } from '@reduxjs/toolkit'
import  personalInformationReducer  from './slice/personalInformation'
import usernameSliceReducer from './slice/username';
import friendDataSliceReducer from "./slice/friendData"
import roomDataSliceReducer from "./slice/roomData"

export const makeStore = () => {
  return configureStore({
    reducer: {
      personalInformation:personalInformationReducer,
      username:usernameSliceReducer,
      friendData:friendDataSliceReducer,
      roomData:roomDataSliceReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']