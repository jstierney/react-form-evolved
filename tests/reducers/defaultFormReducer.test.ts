// yarn test src/reducers/__tests__/defaultFormReducer.test.ts

import { expect, it, describe } from '@jest/globals'
import createReducer from '../../src/reducers/keyValueReducer'
import defaultReducer, {
  reset,
  setValue,
  setValues,
  add,
  remove,
} from '../../src/reducers/defaultFormReducer'

const initialState = {
  first_name: '',
  last_name: '',
  occupation: '',
  heroes: [],
}
const reducer = createReducer('form', initialState).reducer

describe('form reducer', () => {
  it('creates a reducer with a default object', async () => {
    const testReducer = createReducer('form').reducer
    const state = { name: 'Fried Eggs' }
    expect(testReducer(state, { type: '' })).toBe(state)
  })

  it('gets the default state if the action type is not handled', async () => {
    const action = { type: '' }
    expect(reducer(initialState, action)).toBe(initialState)
  })

  it('sets all the values', async () => {
    const payload = {
      first_name: 'Arnold',
      last_name: 'Rimmer',
      occupation: 'Vending Machine Engineer',
      heroes: ['Napoleon'],
    }
    expect(defaultReducer(initialState, setValues(payload))).toStrictEqual(payload)
  })

  it('sets a single value', async () => {
    const action = setValue('occupation', 'Hologram')
    const expected = {...initialState, occupation: 'Hologram' }
    expect(defaultReducer(initialState, action)).toStrictEqual(expected)
  })

  it('adds an item to an uninitialised list', async () => {
    const action = add('heroes', 'Napoleon')
    const expected = { heroes: ['Napoleon'] }
    expect(defaultReducer(undefined, action)).toStrictEqual(expected)
  })

  it('adds an item to an existing list', async () => {
    const state = {
      heroes: ['Napoleon'],
    }
    const action = add('heroes', 'Alexander the Great')
    const expected = {
      heroes: ['Napoleon', 'Alexander the Great']
    }
    expect(defaultReducer(state, action)).toStrictEqual(expected)
  })

  it('does not add an item if it already exists', async () => {
    const state = {
      heroes: ['Napoleon', 'Alexander the Great'],
    }
    const action = add('heroes', 'Napoleon')
    const expected = {
      heroes: ['Napoleon', 'Alexander the Great']
    }
    const actual = defaultReducer(state, action) as any
    // NOTE: slice() is to clone the array before supporting it, because it's immutable
    expect(actual.heroes.slice().sort()).toStrictEqual(expected.heroes.sort())
  })

  it('removes an item from a list', async () => {
    const state = {
      heroes: ['Napoleon', 'Alexander the Great'],
    }
    const action = remove('heroes', 'Napoleon')
    const expected = {
      heroes: ['Alexander the Great']
    }
    const actual = defaultReducer(state, action) as any
    expect(actual.heroes.sort()).toStrictEqual(expected.heroes.sort())
  })

  it('ignores items that do not exist', async () => {
    const state = {
      heroes: ['Napoleon', 'Alexander the Great'],
    }
    const action = remove('heroes', 'Ghandi')
    const expected = {
      heroes: ['Napoleon', 'Alexander the Great'],
    }
    const actual = defaultReducer(state, action) as any
    expect(actual.heroes.slice().sort()).toStrictEqual(expected.heroes.sort())
  })

  it('initialises the state to an empty array', async () => {
    const action = remove('heroes', 'Ghandi')
    const expected = {
      heroes: [],
    }
    const actual = defaultReducer(undefined, action)
    expect(actual).toStrictEqual(expected)
  })

  it('resets the state to the original values', async () => {
    const state = {
      first_name: 'Arnold',
      last_name: 'Rimmer',
      occupation: 'Vending Machine Engineer',
      heroes: ['Napoleon'],
    }
    expect(reducer(state, reset())).toStrictEqual(initialState)
  })
})
