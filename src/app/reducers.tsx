import HomeReducer from "./scenes/home/store/reducers";
import { combineReducers, createStore } from 'redux'

const rootReducer = combineReducers( {
  home: HomeReducer
})

export type APP_STATE = ReturnType<typeof rootReducer>

export function createAppStore() {
  const store = createStore( rootReducer)

  return store
}