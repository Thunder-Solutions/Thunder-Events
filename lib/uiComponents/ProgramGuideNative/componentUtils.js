import { WholeNumber } from '../../utilities'

// converts dates to actual `Date()` objects
export const getActiveEvent = event => ({
  ...event,
  start: new Date(event.start),
  end: new Date(event.end),
})


// gets all data needed for one cell, so the logic doesn't clutter the template
export const getCellData = ({ events, spanState, date, interval, _location }) => {
  const event = events.find(e =>
    Number(e.start) === Number(date)
    && e.location === _location)
  const eventName = event ? event.name : ''
  const cellType = event ? 'data' : 'data-empty'
  const duration = event ? WholeNumber((event.end - event.start) / 1000 / 60) : 0
  const span = duration ? WholeNumber(duration / interval) : 1
  const blank = !!spanState[_location]
  if (blank) --spanState[_location]
  else if (span > 1) spanState[_location] = span
  return { eventName, cellType, span, blank, event }
}
