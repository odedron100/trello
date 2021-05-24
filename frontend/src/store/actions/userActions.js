import { userService } from '../../services/userService';
import { bitcoinService } from '../../services/bitcoinService';
export function spendBalance(spendAmount) {
  return async dispatch => {
    // Update the userService
    dispatch({ type: 'SPEND_BALANCE', spendAmount })
  }
}
export function setUser(user) {
  return async dispatch => {
    const userToSave = { ...user, coins: 60000, moves: [] }
    const userAfterSave = await userService.signup(userToSave)
    dispatch({ type: 'SET_USER', userAfterSave })
  }
}

export function getUser() {
  return async dispatch => {
    const user = await userService.getLoggedInUser()
    dispatch({ type: 'GET_USER', user })
  }
}

export function getBtcRate(coins) {
  return async dispatch => {
    const btcRate = await bitcoinService.getRate(coins)
    dispatch({ type: 'GET_BTC_RATE', btcRate })
  }
}

export function updateUser(amount, contact) {
  return async dispatch => {
    const newUser = await userService.updateUser(amount, contact)
    dispatch({ type: 'UPDATE_USER', newUser })
  }
}
