import { useReducer, useState } from 'react'
import { bindActionCreators } from 'redux'

import formReducer, {
  reset,
  setValues,
  setValue,
  add,
  remove,
} from '../reducers/defaultFormReducer'
import { validate } from '../utils/validationHelpers'

export const useForm = (config?: any): any => {
  const [values, dispatch] = useReducer(formReducer, config?.initialValues || {})
  const [rules, setRules] = useState(config?.rules || {})
  const [labels, setLabels] = useState(config?.labels || {})
  const [errors, setErrors] = useState({})
  const boundActions = bindActionCreators({
    reset,
    setValues,
    setValue,
    add,
    remove,
  }, dispatch as any)
  return {
    values,
    errors,
    validate: (append = {}): boolean => {
      const validationErrors = validate(values, rules, { labels })
      setErrors({ ...validationErrors, ...append })
      return Object.keys(validationErrors).length === 0
    },
    ...boundActions,
    setErrors,
    setRules,
    setLabels,
  }
}
