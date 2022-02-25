import { DEFAULT_GUIDE } from './constants'
import { checkType, roundMinutes } from './utilities'

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
    const allTimes = [...events.reduce((times, event) => {
      if (!checkType(event, 'object')) return times
      if (!checkType(event.start, ['number', 'date'])) return times
      if (!checkType(event.end, ['number', 'date'])) return times
      times.add(roundMinutes(event.start))
      times.add(roundMinutes(event.end))
      return times
    }, new Set())]
    const earliestTime = new Date(Math.min(...allTimes))
    const latestTime = new Date(Math.max(...allTimes))
    const interval = allTimes.reduce((interval, date) => {
      if (interval !== 15) {
        const minutes = date.getMinutes()
        if (minutes === 30) interval = 30
        if (minutes === 15 || minutes === 45) interval = 15
      }
      return interval
    }, 0)
    let times = [earliestTime]
    let prevTime = earliestTime
    while (prevTime < latestTime) {
      const currentTime = new Date(prevTime)
      currentTime.setMinutes(currentTime.getMinutes() + interval)
      prevTime = currentTime
      times.push(currentTime)
    }
    return {
      times: times.map(date => ({
        date,
        timeString: date.toLocaleTimeString('en-US', { timeStyle: 'short' }),
      })),
      interval,
    }
  },
}
