const INITIAL_STATE = {
  user: null,
  btc:null
}
export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user
      }
    case 'GET_USER':
      return{
        ...state,
        user: action.user
      }
    case 'GET_BTC_RATE':
      return{
        ...state,
        btc: action.btcRate
      }
      case 'UPDATE_USER':
        return{
        ...state,
        user: action.newUser
      }
      // case 'NEW_MOVE':
      //  return{
      //   ...state,
      //   user: action.userWithNewMove
      // }
    default:
      return state
  }
}
