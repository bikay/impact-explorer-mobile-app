import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  checkoutRequest: ['data'],
  checkoutSuccess: ['payload'],
  checkoutFailure: ['failure']
})

export const CheckoutTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const CheckoutSelectors = {
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
export const failure = (state, action) =>{
  const { failure } = action
  // console.tron.log({failure: failure})
  return state.merge({ fetching: false, error: true, payload: failure.data})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHECKOUT_REQUEST]: request,
  [Types.CHECKOUT_SUCCESS]: success,
  [Types.CHECKOUT_FAILURE]: failure
})
