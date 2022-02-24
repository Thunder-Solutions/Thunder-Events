import { DEFAULT_GUIDE } from './constants'
import { checkType } from './utilities'

export const state = {

  // utilities for synchronous actions after loading state
  _hasFetched: false,
  get hasFetched() { return this._hasFetched },
  set hasFetched(bool) {
    this._hasFetched = bool
    if (bool === false) return false
    this.fetchQueue.forEach(resolve => resolve())
    return true
  },
  fetchQueue: [],
  waitForFetch() {
    return new Promise(resolve => {
      if (this.hasFetched) resolve()
      else this.fetchQueue.push(resolve)
    })
  },

  // default guide
  guide: DEFAULT_GUIDE,

  // get locations from events dynamically
  get locations() {
    const events = this.guide?.events || []
    return [...events.reduce((locations, event) => {
      if (!checkType(event, 'object')) return locations
      if (!checkType(event.location, 'string')) return locations
      locations.add(event.location)
      return locations
    }, new Set())]
  },

  // get times from events dynamically
  get times() {
    const events = this.guide?.events || []
    return [...events.reduce((times, event) => {
      if (!checkType(event, 'object')) return times
      if (!checkType(event.start, ['number', 'date'])) return times
      if (!checkType(event.end, ['number', 'date'])) return times
      return times
    }, new Set())]
  },
}
