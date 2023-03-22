// yarn test src/helpers

import { describe, expect, it } from '@jest/globals'
import { labelize } from '../../src/utils'

describe('labelize()', () => {
  it('converts the input to a sentence case string', async () => {
    const items = {
      first_name: 'First name',
    }
    Object.entries(items).forEach(([input, expected]) => {
      expect(labelize(input)).toBe(expected)
    })
  })
})
