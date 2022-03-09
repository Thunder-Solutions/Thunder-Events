import { WholeNumber } from '../../utilities'

// converts dates to actual `Date()` objects
export const getActiveEvent = event => ({
  ...event,
  start: new Date(event.start),
  end: new Date(event.end),
})


// gets all data needed for one cell, so the logic doesn't clutter the template
export const getCellData = ({ events, rowState, date, interval, _location }) => {
  const event = events.find(e =>
    Number(e.start) === Number(date)
    && e.location === _location)
  const eventName = event ? event.name : ''
  const cellType = event ? 'data' : 'data-empty'
  const duration = event ? WholeNumber((event.end - event.start) / 1000 / 60) : 0
  const rowspan = duration ? WholeNumber(duration / interval) : 1
  const blank = !!rowState[_location]
  if (blank) --rowState[_location]
  else if (rowspan > 1) rowState[_location] = rowspan
  return { eventName, cellType, rowspan, blank, event }
}
