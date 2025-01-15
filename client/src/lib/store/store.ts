import { configureStore } from '@reduxjs/toolkit'
import {currentFriendSlice,friendDataSliceReducer,personalInformationReducer
  ,roomDataSliceReducer,usernameSliceReducer,messageReducer,searchUserReducer
} from "./slice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      personalInformation:personalInformationReducer,
      username:usernameSliceReducer,
      friendData:friendDataSliceReducer,
      roomData:roomDataSliceReducer,
      currentFriend:currentFriendSlice,
      messages:messageReducer,
      searchUser:searchUserReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']