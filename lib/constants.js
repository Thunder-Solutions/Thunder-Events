export const DEFAULT_FLOOR_PLAN = {
  title: 'Venue',
  imageSrc: '',
  dimensions: {
    height: 600,
    width: 800,
  },
  clickableAreas: [],
}

export const DEFAULT_GUIDE = {
  locations: [],
  events: [],
  floorPlan: DEFAULT_FLOOR_PLAN,
  rollOverTime: '12:00 AM',
}

const FAVORITES_KEY = 'FAVORITE_EVENTS'
const HIDDEN_LOCATIONS_KEY = 'HIDDEN_LOCATIONS'

export const DEFAULT_ADD_FAVORITE = async event => {
  const favoriteEvents = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]')
  favoriteEvents.push(event)
  const eventsJSON = JSON.stringify(favoriteEvents)
  localStorage.setItem(FAVORITES_KEY, eventsJSON)
  return favoriteEvents
}

export const DEFAULT_REMOVE_FAVORITE = async event => {
  const favoriteEvents = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]')
  const _removeIndex = favoriteEvents.findIndex(({ id }) => id === event.id)

  // this only exists to prevent the loss of any favorites that
  // were saved before the ID field was introduced... can be removed after tekko
  const removeIndex = _removeIndex === -1
    ? favoriteEvents.findIndex(({ location: _location, start, name }) => {
        const { location: cLocation, start: cStart, name: cName } = event
        return _location === cLocation && start === cStart && name === cName
      })
    : _removeIndex

  favoriteEvents.splice(removeIndex, 1)
  const eventsJSON = JSON.stringify(favoriteEvents)
  localStorage.setItem(FAVORITES_KEY, eventsJSON)
  return favoriteEvents
}

export const DEFAULT_GET_FAVORITES = async (allEvents) => {
  const favoriteEventsFromStorage = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]')

  // update data by ID
  const favoriteEvents = favoriteEventsFromStorage.map((event) => {
    const latestVersion = allEvents.find(({ id }) => id === event.id)
    if (!latestVersion) return event
    return latestVersion
  })

  return favoriteEvents
}

export const DEFAULT_UPDATE_HIDDEN_LOCATIONS = async (hiddenLocations = []) => {
  localStorage.setItem(HIDDEN_LOCATIONS_KEY, JSON.stringify(hiddenLocations))
  return hiddenLocations
}

export const DEFAULT_GET_HIDDEN_LOCATIONS = async () => {
  const hiddenLocations = JSON.parse(localStorage.getItem(HIDDEN_LOCATIONS_KEY) || '[]')
  return hiddenLocations
}

export const DEFAULT_FETCH_DATA = () => Promise.resolve({
  guide: DEFAULT_GUIDE,
  addFavorite: DEFAULT_ADD_FAVORITE,
  getFavorites: DEFAULT_GET_FAVORITES,
  updateHiddenLocations: DEFAULT_UPDATE_HIDDEN_LOCATIONS,
  getHiddenLocations: DEFAULT_GET_HIDDEN_LOCATIONS
})

const NOW = Date.now() // date in milliseconds

const HOUR = 1000 * 60 * 60 // milliseconds * seconds * minutes

export const DEFAULT_EVENT = {
  id: 0,
  start: NOW,
  end: NOW + HOUR,
  location: '(not provided)',
  name: '(no name)',
  host: '(not provided)',
  category: '(not provided)',
  description: '(no description)',
}

export const DEFAULT_CLICKABLE_AREA = {
  location: '(none)',
  shape: 'rect',
  coords: [],
  href: '#',
  alt: '',
}

export const DEFAULT_TIMES = {
  days: [],
  interval: 60,
}

export const DEFAULT_BREAKPOINT = '40em'

export const NOOP = () => {}
