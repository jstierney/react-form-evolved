import __ from './lang'
import { labelize, Options, ValueMap } from '.'
import isEmpty from 'lodash/isEmpty'

export const isValidEmail = (input: string): boolean => {
  if (! input) return false
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const matches = input.match(regex)
  return matches && matches.length > 0 ? true : false
}

export const isMinChars = (input: string, chars: number): boolean => {
  if (! input) return false
  return input.length >= chars
}

export const validate = (values: ValueMap, options: Options, config?: any) => {
  const errors = Object.entries(values).reduce((acc, [key, value]) => {
    const rules = options[key] ? options[key].split('|') : []
    const label = config?.labels && config.labels[key] || labelize(key)
    const messages = rules.map((validationType: string) =>
      validateItem(validationType, label, value))
        .filter((x: string|null) => x)
        .join("\n")
    return messages ? { ...acc, [key]: messages } : acc
  }, {})
  return errors
  // return errors.filter((x: string|null) => x)
}

export const validateItem = (typeString: string, label: string, value: any): string | null => {
  const [type, args] = typeString.split(':')
  switch (type) {
    case 'required':
      return value && ! isEmpty(value) ? null : __(`${label} is a required field.`)
    case 'email':
      return ! value || isValidEmail(value)
        ? null
        : __(`${label} is not a valid email address.`)
    case 'min':
        return ! value || isMinChars(value, parseInt(args))
        ? null
        : __(`${label} needs to be a minimum of ${args} characters.`)
  }
  return null
}
