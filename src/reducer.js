import React, { createContext, useContext, useReducer } from 'react'
import { useUserLoggedDispatch } from './store/reducers/userLogged'

const StateContext = createContext()

export const StateProvider = ({ store, children }) => (
  <StateContext.Provider value={useReducer(store.reducer, store.initialState)}>
    {children}
  </StateContext.Provider>
)

export const useGlobalState = () => useContext(StateContext)

export function useDispatch() {
  const [, dispatch] = useContext(StateContext)

  const userLoggedDispatch = useUserLoggedDispatch(dispatch)

  return {
    userLoggedDispatch
  }
}

export function useStore() {
  const [state] = useContext(StateContext)

  return state
}
