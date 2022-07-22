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

export const parseLocationHash = location =>
  `#View-Location-${location.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '')}`

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

/**
 * This is the most efficient way to clear HTML, much faster than innerHTML.
 * @param {HTMLElement} element - the DOM element we want to empty
 */
export const clearHTML = element => {
  let i = element.childNodes.length
  while (i--) { element.removeChild(element.lastChild) }
}

/**
 * This is the most efficient way to parse HTML, much faster than innerHTML.
 *
 * @param {string} htmlStr - a string containing only raw HTML
 */
export const parseHTML = htmlStr => {
  const range = document.createRange()
  range.selectNode(document.body) // required in Safari
  return range.createContextualFragment(htmlStr)
}

/**
 * This helps us avoid trailing commas when mapping template literals.
 * @param {Array} arr - the array to iterate
 * @param {function} callback - the callback for each iteration; should return a string or stringifiable value
 */
export const mapString = (arr, callback) => arr.map(callback).join('')

/**
 * Rounds a date to the nearest given minute
 * @param {Date|number|string} _date - The date to round (or anything that can be parsed as a date)
 * @param {number} nearestMinute - The nearest minute to round to (15 by default)
 */
export const roundMinutes = (_date, nearestMinute = 15) => {
  const date = new Date(_date)
  const roundedMinutes = Math.round(date.getMinutes() / nearestMinute) * nearestMinute
  date.setMinutes(roundedMinutes)
  return date
}

export const WholeNumber = num => Number(num.toFixed())

/**
 * Gets the name of the day based on the index (typically returned by `date.getDay()`)
 * @param {number} idx - The index of the day of the week
 * @param {boolean} short - Whether to abbreviate the day names or not
 * @returns {string} - The name of the day of the week
 */
export const getDay = (idx, short = false) => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const shortDays = [
    'Sun',
    'Mon',
    'Tues',
    'Wed',
    'Thurs',
    'Fri',
    'Sat',
  ]
  return short ? shortDays[idx] : days[idx]
}

export const getDateInfo = _date => {
  const date = new Date(_date)
  return {
    time: date.toLocaleTimeString('en-US', { timeStyle: 'short' }),
    day: getDay(date.getDay()),
    date: date.toLocaleDateString(),
  }
}

/**
 * Generates a string representing javascript, which can be used in the
 * HTML templates of native web components.
 * 
 * EXAMPLE:
 * ```js
 *   const open = true
 *   const html = `<button onclick="this.getRootNode().host.openDialog(${open})">Click me</button>`
 * ```
 * 
 * versus
 * 
 * ```js
 *   const open = true
 *   const html = `<button onclick="${runMethod('openDialog', open)}">Click me</button>`
 * ```
 * 
 * @param {string} name - The name of the component method to run
 * @param {...*} args - The arguments to be used in the function call (objects will be converted to JSON and encoded as a URI component)
 * @returns {string} - A string representing JavaScript code
 */
export const runMethod = (name, ...args) => {

  const mapType = value => {

    // preserve keywords that can be used in html attribute handlers
    if (value === 'event' || value === 'this') return value

    // handle the string rendering of arguments based on their type
    const type = getType(value)
    const map = {

      // stringify objects to avoid [object Object] and encode to avoid double quote conflicts
      object: `\`${encodeURIComponent(JSON.stringify(value))}\``,

      // wrap strings in backticks in case they're multiline
      string: `\`${value}\``,

      // all other types are rendered without quotes
      default: String(value)
    }

    return map[type] || map.default
  }

  return `this.getRootNode().host.${name}(${args.length ? `${[...args].map(mapType)}` : 'event'})`
}

export const getEventId = ({ location, name, start: _start }) => {
  const snip = s => s.replace(/[^a-zA-Z0-9]/g, '')
  const date = new Date(_start)
  const start = `${date.toLocaleDateString()}-${date.toLocaleTimeString()}`
  return `${snip(location)}-${snip(name)}-${snip(start)}`
}

export const search = (_input, _text) => {

  // * replace variation characters (for example, é becomes e)
  // * remove anything that isn't alphanumeric (including spaces)
  //     ^ this lets "megaman" match "mega man"
  // * use lower case for case-insensitive search
  const formatForSimilarMatch = str => str
    ?.normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-zA-Z0-9]/g, '')
    .toLowerCase()

  // first try matching the entire query
  const input = formatForSimilarMatch(_input)
  const text = formatForSimilarMatch(_text)
  if (text.search(input) !== -1) return true
  if (input.search(text) !== -1) return true

  // if that fails, try each word
  return _input.split(/\s+/g).some(input =>
    text.search(formatForSimilarMatch(input)) !== -1)
}

export const trim = (str, max = 40) => str.length > max ? str.slice(0, max - 4) + '...' : str

// Source: https://github.com/30-seconds/30-seconds-of-code
export const toKebabCase = str => str && str
  .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
  .map(x => x.toLowerCase())
  .join('-');

export const getMarkerCoords = (marker, clickableAreas) => {
  const clickableArea = clickableAreas.find(({ location }) => marker === location)
  const allX = clickableArea.coords.filter((_, idx) => idx % 2 === 0)
  const allY = clickableArea.coords.filter((_, idx) => idx % 2 !== 0)
  const minX = Math.min(...allX)
  const minY = Math.min(...allY)
  const maxX = Math.max(...allX)
  const maxY = Math.max(...allY)
  const x = (minX + maxX) / 2
  const y = (minY + maxY) / 2
  return [x, y]
}

export const getLastTimeInThreshold = (currentDate, allDates, threshold = '12:00 AM') => {
  const lastInCurrentDay = Math.max(...allDates.filter(t => t.getDate() === currentDate.getDate()))
  if (threshold === '12:00 AM') return new Date(lastInCurrentDay)
  const nextDate = new Date(currentDate)
  nextDate.setDate(currentDate.getDate() + 1)
  nextDate.setTime(new Date(`${nextDate.toLocaleDateString()} ${threshold}`).getTime())
  const allTimesNextDay = allDates.filter(t => t.getDate() === nextDate.getDate())
  const lastInThreshold = Math.max(...allTimesNextDay.filter(t => t.getTime() <= nextDate.getTime()))
  return new Date(lastInThreshold > 0 ? lastInThreshold : lastInCurrentDay)
}
