export const DEFAULT_FLOOR_PLAN = {
  title: 'Venue',
  imageSrc: '',
  clickableAreas: [],
}

export const DEFAULT_GUIDE = {
  events: [],
  floorPlan: DEFAULT_FLOOR_PLAN,
}

export const DEFAULT_FETCH_GUIDE = () => Promise.resolve(DEFAULT_GUIDE)

const NOW = Date.now() // date in milliseconds

const HOUR = 1000 * 60 * 60 // milliseconds * seconds * minutes

export const DEFAULT_EVENT = {
  start: NOW,
  end: NOW + HOUR,
  location: '(none)',
  name: '(none)',
}

export const DEFAULT_CLICKABLE_AREA = {
  shape: 'rect',
  coords: [],
  href: '#',
  alt: '',
}

export const NOOP = () => {}