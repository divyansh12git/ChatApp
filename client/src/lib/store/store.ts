import { configureStore } from '@reduxjs/toolkit'
import  personalInformationReducer  from './features/personalInformation'
import usernameSliceReducer from './features/username';


export const makeStore = () => {
  return configureStore({
    reducer: {
      personalInformation:personalInformationReducer,
      username:usernameSliceReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']