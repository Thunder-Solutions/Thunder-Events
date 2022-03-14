import { DEFAULT_ADD_FAVORITE, DEFAULT_REMOVE_FAVORITE, DEFAULT_GET_FAVORITES, DEFAULT_GUIDE } from './constants'
import { checkType, roundMinutes, getDay, getLastTimeInThreshold } from './utilities'

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

  // default favorite functionality
  addFavorite: DEFAULT_ADD_FAVORITE,
  removeFavorite: DEFAULT_REMOVE_FAVORITE,
  getFavorites: DEFAULT_GET_FAVORITES,

  // get locations and add any missed from events dynamically
  get locations() {
    const locations = this.guide?.locations ?? []
    const events = this.guide?.events ?? []
    return [...events.reduce((locations, event) => {
      if (!checkType(event, 'object')) return locations
      if (!checkType(event.location, 'string')) return locations
      if (!locations.has(event.location)) locations.add(event.location)
      return locations
    }, new Set(locations))]
  },

  // get times from events dynamically
  get times() {
    const events = this.guide?.events ?? []
    const threshold = this.guide?.rollOverTime ?? '12:00 AM'
    const allTimes = [...events.reduce((times, event) => {
      if (!checkType(event, 'object')) return times
      if (!checkType(event.start, ['number', 'date'])) return times
      if (!checkType(event.end, ['number', 'date'])) return times
      times.add(roundMinutes(event.start))
      times.add(roundMinutes(event.end))
      return times
    }, new Set())].sort()
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
    const getTimeObject = date => ({
      date,
      timeString: date.toLocaleTimeString('en-US', { timeStyle: 'short' }),
    })
    const getFullDay = time => `${getDay(time.getDay())} ${time.toLocaleDateString()}`
    let days = { [getFullDay(earliestTime)]: [getTimeObject(earliestTime)] }
    let prevTime = earliestTime
    let currentDay = getFullDay(prevTime)
    while (prevTime < latestTime) {
      const lastTimeInDay = getLastTimeInThreshold(prevTime, allTimes, threshold)
      let currentTime = null
      if (Number(lastTimeInDay) === Number(prevTime)) {
        currentTime = new Date(allTimes.find(time => time > prevTime))
        currentDay = getFullDay(currentTime)
        days[currentDay] = [getTimeObject(currentTime)]
      } else {
        currentTime = new Date(prevTime)
        const intervalInMs = interval * 1000 * 60
        currentTime.setTime(currentTime.getTime() + intervalInMs)
        days[currentDay].push(getTimeObject(currentTime))
      }
      prevTime = currentTime
    }
    return {
      days,
      interval,
    }
  },
}
