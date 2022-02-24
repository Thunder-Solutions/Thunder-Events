import {
  DEFAULT_FETCH_GUIDE,
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

const fetchGuide = async (fetchGuide = DEFAULT_FETCH_GUIDE) => {
  const guide = await fetchGuide()
  if (!isObject(guide)) throw '`fetchGuide()` must return an object'
  if ('events' in guide) {
    if (!checkType(guide.events, 'array')) throw 'The `events` field expects an array'
    const castEvent = useCast(DEFAULT_EVENT, 'event', { start: 'date', end: 'date' })
    state.guide.events = guide.events.map(castEvent)
  }
  if ('floorPlan' in guide) {
    if (!isObject(guide.floorPlan)) throw 'The `floorPlan` field expects an object'
    const castFloorPlan = useCast(DEFAULT_FLOOR_PLAN, 'floor plan')
    const castClickableArea = useCast(DEFAULT_CLICKABLE_AREA, 'clickable area')
    const floorPlan = castFloorPlan(guide.floorPlan)
    state.guide.floorPlan = {
      ...floorPlan,
      clickableAreas: floorPlan.clickableAreas.map(castClickableArea),
    }
  }
  state.hasFetched = true
}

const getEvents = async (_filters = {}) => {
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
    exclude: _exclude,
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
  })
}

const getLocations = async () => {
  await state.waitForFetch()
  return state.locations
}

const getFloorPlan = async () => {
  await waitForFetch()
  return state.guide.floorPlan
}

export {
  fetchGuide,
  getEvents,
  getLocations,
  getFloorPlan,
}
