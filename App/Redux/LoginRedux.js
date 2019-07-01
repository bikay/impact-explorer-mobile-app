import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['username', 'password'],
  loginSuccess: ['token'],
  loginFailure: ['error'],
  logoutRequest: [],
  logoutSuccess: []
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  token: null
})

/* ------------- Selectors ------------- */

export const LoginSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null, error: null })

// successful api lookup
export const success = (state, action) => {
  const { token } = action
  return state.merge({ fetching: false, error: null, token })
}

// Something went wrong somewhere. 
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const logoutSuccess = (state) => {

  return state.merge({ fetching: false, error: null, data: null})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT_REQUEST]: request,
  [Types.LOGOUT_SUCCESS]: logoutSuccess,
})
