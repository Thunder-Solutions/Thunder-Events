import { NOOP } from './constants'

export const getType = val => {
  if (val === null) return 'null'
  if (typeof val === 'object') return val.constructor.name.toLowerCase()
  return typeof val
}

export const checkType = (val, type) => {
  const validString = getType(type) === 'string'
  const validArray = getType(type) === 'array' && type.every(t => getType(t) === 'string')
  if (!validString && !validArray) throw '`checkType()` expects either a string or array of strings in the second argument'
  if (validString) return getType(val) === type
  if (validArray) return type.some(t => getType(val) === t)
}

export const isObject = obj => checkType(obj, 'object')

export const isEmpty = val => checkType(val, ['undefined', 'null'])

export const contains = (val, search) => {
  const valIsString = checkType(val, 'string')
  const valIsArray = checkType(val, 'array') && val.every(t => checkType(t, 'string'))
  const validSearch = checkType(search, ['string', 'regexp'])
  if (!valIsArray && !valIsString) throw '`contains()` expects either a string or array of strings in the first argument'
  if (!validSearch) throw '`contains()` expects either a string or regular expression in the second argument'
  if (valIsArray) return val.some(v => v.search(search) !== -1)
  if (valIsString) return val.search(search) !== -1
}

/**
 * Returns a function which gets a field from a given object, unless it's empty,
 * in which case it gets that same field from a fallback object.
 * @param {object} fallbackObj - The object to be referenced when a field is empty on the original object.
 * @param {function} onFallback - An optional callback to run when the fallback is used.
 * @param {object} _altTypes - A mapping of fields to acceptable alternative types.
 * @returns {function} - Used to get the value from a provided key.
 */
export const useFallback = (fallbackObj, onFallback = NOOP, _altTypes = {}) => {
  if (!isObject(fallbackObj)) throw '`useFallback()` expects an object in the first argument'
  if (!checkType(onFallback, 'function')) throw '`useFallback()` expects a function in the second argument'
  if (!isObject(_altTypes)) throw '`useFallback()` expects an object in the third argument'
  return (obj, key) => {
    const fallbackValue = fallbackObj[key]
    const valid = isObject(obj)
    const value = valid ? obj[key] : null
    const empty = isEmpty(value)
    const type = getType(value)
    const altTypes = _altTypes[key]
    const altTypesArr = checkType(altTypes, 'array') ? altTypes : (checkType(altTypes, 'string') ? [altTypes] : [])
    const mismatch = type !== getType(fallbackValue) && !altTypesArr.some(t => t === type)
    if (!valid || empty || mismatch) {
      const status = !valid ? 'invalid' : (empty ? 'empty' : 'mismatch')
      onFallback(status, key)
      return fallbackValue
    }
    return value
  }
}

/**
 * Returns a function which casts any value to the same structure as the provided object (the type).
 * @param {object} type - An object which serves as the (shallow) structure constraints.
 * @param {string} name - The optional name of the type for logging purposes.
 * @param {object} altTypes - A mapping of fields to acceptable alternative types.
 * @returns {function} - Used to cast a provided value to the given type.
 */
export const useCast = (type, name = 'object', altTypes = {}) => {
  if (!isObject(type)) throw 'You may only cast to custom object types'
  return obj => {
    if (!isObject(obj)) return type
    const getValue = useFallback(type, (status, key) => {
      if (status === 'invalid') console.warn(`The provided ${name} is not a valid object.`)
      else if (status === 'mismatch') console.warn(`The \`${key}\` field expected type \`${getType(type[key])}\` but got \`${getType(obj[key])}\`.`)
      else if (status === 'empty') console.warn(`The provided ${name} did not have the \`${key}\` field.`)
    }, altTypes)
    return Object.keys(type).reduce((castObj, key) => {
      castObj[key] = getValue(obj, key)
      return castObj
    }, {})
  }
}

export const checkFilterType = (filter = {}) => {
  if ('after' in filter && !checkType(filter.after, ['number', 'date'])) throw 'The `after` field expects a number or date'
  if ('before' in filter && !checkType(filter.before, ['number', 'date'])) throw 'The `before` field expects a number or date'
  if ('locations' in filter && !checkType(filter.locations, 'array')) throw 'The `locations` field expects an array'
  if ('search' in filter && !checkType(filter.search, ['string', 'regexp'])) throw 'The `search` field expects a string or regular expression'
  return true // indicate success
}
