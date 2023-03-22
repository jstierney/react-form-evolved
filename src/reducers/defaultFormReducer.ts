import createReducer from './keyValueReducer'

const defaultSlice = createReducer('form')

export const { reset, setValues, setValue, add, remove } = defaultSlice.actions
export default defaultSlice.reducer
