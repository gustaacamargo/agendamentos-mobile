import { initialState as userLogged, reducer as userLoggedReducer} from './userLogged'

const initialState = {
    userLogged,
}

const mainReducer = (state, action) => {
    // middlewares aqui
  
    return {
        userLogged: userLoggedReducer(state.userLogged, action)
    }
}
  
export default { initialState, reducer: mainReducer }