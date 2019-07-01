import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

// / ------------- Types and Action Creators ------------- /

const { Types, Creators } = createActions({
  headerRequest: ['data'],
  setHeaderRequest: ['data'],
  stopSetHeaderRequest: ['data'],
  headerSuccess: ['payload'],
  headerFailure: null
})

export const HeaderTypes = Types
export default Creators

  // / ------------- Initial State------------- /

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
})

  // / ------------- Selectors------------- /

export const HeaderSelectors = {
  getData: state => state.data
}

  // / ------------- Reducers------------- /

// request the data from an api

export const setHeader = (state, { data }) => {
  return state.merge({ fetching: false, error: null, data, payload: data })
}
export const stopSetHeader = (state, { data }) => {
  return state.merge({ fetching: true, error: true, data, payload: data })
}

export const request = (state, { data }) =>
  state.merge({ fetching: false, error: null, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state => {
  state.merge({ fetching: true, error: true, payload: null })
}

// / ------------- Hookup Reducers To Types --------nav----- /

export const reducer = createReducer(INITIAL_STATE, {
  [Types.HEADER_REQUEST]: request,
  [Types.SET_HEADER_REQUEST]: setHeader,
  [Types.STOP_SET_HEADER_REQUEST]: stopSetHeader,
  [Types.HEADER_SUCCESS]: success,
  [Types.HEADER_FAILURE]: failure
})