import { WholeNumber } from '../../utilities'

// converts dates to actual `Date()` objects
export const getActiveEvent = event => ({
  ...event,
  start: new Date(event.start),
  end: new Date(event.end),
})


// gets all data needed for one cell, so the logic doesn't clutter the template
export const getCellData = ({ events, spanState, date, interval, _location, currentTime }) => {

  // find an event starting at this time
  const _event = events.find(e =>
    Number(e.start) === Number(date)
    && e.location === _location
  )

  // handle events that already started before the start time
  const event = !_event
    ? events.find(e =>
        Number(e.end) > Number(date)
        && Number(e.start) < Number(currentTime)
        && e.location === _location
      )
    : _event

  const hasStarted = event ? event.start < currentTime : false
  const eventName = event ? event.name : ''
  const cellType = event ? 'data' : 'data-empty'
  const getStart = event => hasStarted ? currentTime : event.start
  const duration = event ? WholeNumber((event.end - getStart(event)) / 1000 / 60) : 0
  const span = duration ? WholeNumber(duration / interval) : 1
  const blank = spanState[_location] > 0

  // handle spanState to prevent extra columns
  if (blank) --spanState[_location]
  else if (span > 1) spanState[_location] = span - 1

  // return all necessary information included in the template
  return { eventName, cellType, span, blank, event, hasStarted }
}
