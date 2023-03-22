// yarn test src/helpers

import { jest, describe, expect, it } from '@jest/globals'
import {
  isValidEmail,
  isMinChars,
  validateItem
} from '../../src/utils/validationHelpers'

describe('isValidEmail()', () => {
  it('checks the input is valid', async () => {
    const items = {
      '': false,
      'test': false,
      'test@test': false,
      'test@test.com': true,
    }
    Object.entries(items).forEach(([input, expected]) => {
      expect(isValidEmail(input)).toBe(expected)
    })
  })
})

describe('isMinChars()', () => {
  it('checks the input is valid', async () => {
    const items = {
      '': false,
      'test': false,
      'testtest': true,
    }
    Object.entries(items).forEach(([input, expected]) => {
      expect(isMinChars(input, 6)).toBe(expected)
    })
  })
})

describe('validateItem()', () => {
  it('validates a value and returns an error message', async () => {
    expect(validateItem('required', 'Name', 'Kryten')).toBe(null)
    expect(validateItem('required', 'Name', '')).toBe('Name is a required field.')
    expect(validateItem('min:8', 'Name', 'Kochanski')).toBe(null)
    expect(validateItem('min:8', 'Name', 'Kryten')).toBe('Name needs to be a minimum of 8 characters.')
    expect(validateItem('smeg', 'Name', 'Kryten')).toBe(null) // 'smeg' isn't currently supported
  })
})
