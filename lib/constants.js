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
  const removeIndex = favoriteEvents.findIndex(({ location: _location, start, name }) => {
    const { location: cLocation, start: cStart, name: cName } = event
    return _location === cLocation && start === cStart && name === cName
  })
  favoriteEvents.splice(removeIndex, 1)
  const eventsJSON = JSON.stringify(favoriteEvents)
  localStorage.setItem(FAVORITES_KEY, eventsJSON)
  return favoriteEvents
}

export const DEFAULT_GET_FAVORITES = async () => {
  const favoriteEvents = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]')
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

export const DEFAULT_BREAKPOINT = '50em'

export const NOOP = () => {}
