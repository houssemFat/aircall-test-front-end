import createSagaMiddleware from "redux-saga"
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit"
import { FC } from "react";


import fetchUserInfoSaga from "./sagas";
import { default as MainReducer } from './reducers'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
      reducer: MainReducer,
      middleware: [sagaMiddleware]
    }
)
// Infer the `RootState`
export type IRootState = ReturnType<typeof store.getState>

sagaMiddleware.run(fetchUserInfoSaga)

interface Props {
  // any props that come into the component
}

const StoreProvider: FC<Props> = ({children}) => {
  return (
      <Provider store={store}>
        {children}
      </Provider>
  )
}

export default StoreProvider
