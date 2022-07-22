import {
  DEFAULT_FETCH_DATA,
  DEFAULT_EVENT,
  DEFAULT_FLOOR_PLAN,
  DEFAULT_CLICKABLE_AREA,
} from './constants'
import {
  useCast,
  checkType,
  checkFilterType,
  isObject,
} from './utilities'
import { state } from './state'

const init = async (init = DEFAULT_FETCH_DATA) => {
  const data = await init()
  if (!isObject(data)) throw '`init()` must return an object'
  const { guide } = data
  if (!isObject(guide)) throw 'The `guide` field expects an object'
  if ('events' in guide) {
    if (!checkType(guide.events, 'array')) throw 'The `guide.events` field expects an array'
    const castEvent = useCast(DEFAULT_EVENT, 'event', { start: 'date', end: 'date' })
    state.guide.events = guide.events.map(castEvent)
  }
  if ('floorPlan' in guide) {
    if (!isObject(guide.floorPlan)) throw 'The `guide.floorPlan` field expects an object'
    const castFloorPlan = useCast(DEFAULT_FLOOR_PLAN, 'floor plan')
    const castClickableArea = useCast(DEFAULT_CLICKABLE_AREA, 'clickable area')
    const floorPlan = castFloorPlan(guide.floorPlan)
    state.guide.floorPlan = {
      ...floorPlan,
      clickableAreas: floorPlan.clickableAreas.map(castClickableArea),
    }
  }
  if ('locations' in guide) {
    if (!checkType(guide.events, 'array')) throw 'The `guide.locations` field expects an array'
    state.guide.locations = guide.locations.map(loc => String(loc))
  }
  if ('rollOverTime' in guide) {
    if (!checkType(guide.rollOverTime, 'string')) throw 'The `guide.rollOverTime` field expects a string'
    const timeRegex = /(^((1[0-2])|0?[1-9]):\d{2} (AM|PM)$)|(^(([0-1]?[0-9])|(2[0-3])):\d{2}$)/
    if (!timeRegex.test(guide.rollOverTime)) throw 'The `guide.rollOverTime` field expects the string in time format.  Example: "1:00 PM" for 12-hours or "13:00" for 24-hours'
    state.guide.rollOverTime = guide.rollOverTime
  }
  if ('addFavorite' in data) {
    if (!checkType(data.addFavorite, 'function')) throw 'The `addFavorite` field expects a function'
    state.addFavorite = data.addFavorite
  }
  if ('removeFavorite' in data) {
    if (!checkType(data.removeFavorite, 'function')) throw 'The `removeFavorite` field expects a function'
    state.removeFavorite = data.removeFavorite
  }
  if ('getFavorites' in data) {
    if (!checkType(data.getFavorites, 'function')) throw 'The `getFavorites` field expects a function'
    state.getFavorites = data.getFavorites
  }
  if ('hideLocation' in data) {
    if (!checkType(data.hideLocation, 'function')) throw 'The `hideLocation` field expects a function'
    state.hideLocation = data.hideLocation
  }
  if ('getHiddenLocations' in data) {
    if (!checkType(data.getHiddenLocations, 'function')) throw 'The `getHiddenLocations` field expects a function'
    state.getHiddenLocations = data.getHiddenLocations
  }
  state.hasFetched = true
}

const getEvents = async (_filters = {}) => {
  await state.waitForFetch()
  if (!isObject(_filters)) throw '`getEvents()` expects an object in the first argument'
  const { include: _include = {}, exclude: _exclude = {} } = _filters
  checkFilterType(_include) // throws if invalid
  checkFilterType(_exclude) // throws if invalid
  const filters = {
    ..._filters,
    include: {
      ..._include,
      after: _include.after ? Number(_include.after) : 0,
      before: _include.before ? Number(_include.before) : Infinity,
    },
    exclude: {
      ..._exclude,
      after: _exclude.after ? Number(_exclude.after) : Infinity,
      before: _exclude.before ? Number(_exclude.before) : 0,
    },
  }
  const { include = {}, exclude = {} } = filters
  return state.guide.events.filter(event => {
    
    // filter within time range
    if (event.start < include.after) return false
    if (event.start > exclude.after) return false
    if (event.end > include.before) return false
    if (event.end < exclude.before) return false
    
    // filter by location
    if ('locations' in include && !contains(include.locations, event.location)) return false
    if ('locations' in exclude && contains(exclude.locations, event.location)) return false
    
    // filter by name
    if ('search' in include && !contains(event.name, include.search)) return false
    if ('search' in exclude && contains(event.name, exclude.search)) return false

    // if all previous checks pass, keep this event in the array
    return true
  })
}

const getLocations = async () => {
  await state.waitForFetch()
  return state.locations
}

const getTimes = async () => {
  await state.waitForFetch()
  return state.times
}

const getFloorPlan = async () => {
  await state.waitForFetch()
  return state.guide.floorPlan
}

const addFavorite = async event => {
  const favorites = await state.addFavorite(event)
  return favorites
}

const removeFavorite = async event => {
  const favorites = await state.removeFavorite(event)
  return favorites
}

const getFavorites = async () => {
  const favorites = await state.getFavorites()
  return favorites
}

const hideLocation = async location => {
  const hiddenLocations = await state.hideLocation(location)
  return hiddenLocations
}

const getHiddenLocations = async () => {
  const hiddenLocations = await state.getHiddenLocations()
  return hiddenLocations
}

export {
  init,
  addFavorite,
  removeFavorite,
  getFavorites,
  hideLocation,
  getHiddenLocations,
  getEvents,
  getLocations,
  getTimes,
  getFloorPlan,
}
