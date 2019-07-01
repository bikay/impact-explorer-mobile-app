import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setAuthTokenRequest: ['data'],
  setAuthTokenSuccess: ['payload'],
  setAuthTokenFailure: null,
  clearUserTokenRequest:[]

})

export const SetAuthTokenTypes = Types
export default Creators

/* ------------- Initial State ------------- */
 
export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const SetAuthTokenSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */
export const clearUserTokenSuccess = (state,{ data }) => {
  return state.merge({ fetching: false, error: null,data:null})
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_AUTH_TOKEN_REQUEST]: request,
  [Types.SET_AUTH_TOKEN_SUCCESS]: success,
  [Types.SET_AUTH_TOKEN_FAILURE]: failure,
  [Types.CLEAR_USER_TOKEN_REQUEST]: clearUserTokenSuccess

})
