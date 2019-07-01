import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setStatusConnectionRequest: ['data'],
  getStatusConnectionSuccess: ['payload'],
  statusConnectionFailure: null
})

export const StatusConnectionTypes = Types
export default Creators

/* ------------- Initial State ------------- */ 

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  status: true
})

/* ------------- Selectors ------------- */

export const StatusConnectionSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const setStatusConnection = (state, { data }) =>{
  return state.merge({ fetching: false, data, error: null, status: data })
  
}

// successful api lookup
export const getStatusConnection = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_STATUS_CONNECTION_REQUEST]: setStatusConnection,
  [Types.GET_STATUS_CONNECTION_SUCCESS]: getStatusConnection
})
