import { createSlice } from '@reduxjs/toolkit'

const prepareKeyValue = (key: string|number, value: any): any => ({ payload: { key, value } })

// TODO: implement toggle, any other ones?
export const createReducer = (name: string, initialState = {}) => {
  return createSlice({
    name,
    initialState,
    reducers: {
      reset: () => initialState,
      setValues: (__, { payload }) => payload,
      setValue: {
        prepare: prepareKeyValue,
        reducer: (state, { payload: { key, value } }) => ({ ...state, [key]: value }),
      },
      add: {
        prepare: prepareKeyValue,
        reducer: (state: any, { payload: { key, value }}) => {
          let current = (state && state[key]) || []
          if (! Array.isArray(current)) current = []
          return { ...state, [key]: current.filter((x: any) => x !== value).concat([value]) }
        },
      },
      remove: {
        prepare: prepareKeyValue,
        reducer: (state: any, { payload: { key, value }}) => {
          const current = (state && state[key]) || []
          return { ...state, [key]: current.filter((x: any) => x !== value) }
        },
      },
    },
  })
}

export default createReducer
