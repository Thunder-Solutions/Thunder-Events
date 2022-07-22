import { DEFAULT_TIMES } from '../../../constants'
import { getDateInfo, getEventId, mapString, roundMinutes, runMethod, trim } from '../../../utilities'
import { getCellData } from '../componentUtils'

const renderByTime = ({ events, times: allTimes, locations, hiddenLocations, sortBy, activeTime, activeDay }) => {

  const { days, interval } = allTimes || DEFAULT_TIMES

  // this keeps colspans from previous iterations in memory
  // so we can avoid adding extra table cells.
  const spanState = {}

  // determine how to filter times
  const _times = days[activeDay]
  const now = roundMinutes(Date.now(), interval)
  const { day: nowDay, date: nowDate, time: nowTime } = getDateInfo(now)
  const filterMap = {
    now: _times.filter(({ date }) => date >= now),
    nowOnly: _times.filter(({ date }) => date === now),
    time: _times.filter(({ date }) => date >= activeTime),
    allTime: _times,
  }
  const filteredTimes = filterMap[sortBy]
  const times = filteredTimes.length ? filteredTimes : [{ date: now, timeString: nowTime }]
  const currentDay = filteredTimes.length ? activeDay : `${nowDay} ${nowDate}`
  const timeMap = {
    now,
    nowOnly: now,
    time: activeTime,
    allTime: new Date(0),
  }
  const currentTime = timeMap[sortBy]

  // Get locations minus hiddenLocations
  const availableLocations = locations.filter(locName => !hiddenLocations.includes(locName))

  return /* html */`
    <div class="pg-table-wrapper">
      <table class="pg-table">
        <thead class="pg-table-header">
          <tr class="pg-row">
            <td class="pg-cell-wrapper pg-cell-wrapper--corner pg-cell-wrapper--corner-collapsed">
              <div class="pg-cell pg-cell--corner">
                <span class="pg-corner-text">
                  <select class="pg-dialog-select" onchange="${runMethod('selectActiveDay')}" autofocus>
                    ${mapString(Object.keys(days), day => /* html */`
                      <option value="${day}" ${day === activeDay ? 'selected' : ''}>${day}</option>
                    `)}
                  </select>
                </span>
              </div>
            </td>
            ${mapString(times, ({ date, timeString }) => /* html */`
              <th class="pg-cell-wrapper pg-cell-wrapper--column-header pg-cell-wrapper--column-header-time ${date === now ? 'pg-cell-wrapper--column-header-active-time' : ''}">
                <div class="pg-cell pg-cell--column-header pg-cell--column-header-time">
                  <span>${timeString}</span>
                  <div>${date === now ? '(Current Time)' : ''}</div>
                </div>
              </th>
            `)}
          </tr>
        </thead>
        <tbody class="pg-body">
          ${mapString(availableLocations, _location => /* html */`
            <tr class="pg-row">
              <th class="pg-cell-wrapper pg-cell-wrapper--row-header pg-cell-wrapper--row-header-${sortBy === 'nowOnly' ? 'now' : 'time'} pg-cell-wrapper--row-header-collapsed" onclick="${runMethod('toggleHeaders')}">
                <div class="pg-cell pg-cell--row-header pg-cell--row-header-time" onclick="${runMethod('showFloorPlan', _location)}">
                  <i class="pg-map-icon"></i>
                  <span class="pg-inline-text">${_location}</span>
                </div>
              </th>
              ${mapString(times, ({ date }) => {
                const { eventName, cellType, span, blank, event, hasStarted } = getCellData({ events, spanState, date, interval, _location, currentTime })
                const durationMinutes = event ? ((event.end.getTime() - event.start.getTime()) / 1000 / 60) : 0
                const isSingleCell = durationMinutes === interval
                const maxChar = isSingleCell ? 36 : 64
                if (blank) return '' // blank if cell from previous row occupies this space
                return /* html */`
                  <td
                    class="pg-cell-wrapper pg-cell-wrapper--${cellType} pg-cell-wrapper--${cellType}-${sortBy === 'nowOnly' ? 'now' : 'time'} ${hasStarted ? 'pg-cell-wrapper--overflow' : ''}"
                    colspan="${span}"
                    id="${event ? getEventId(event) : ''}"
                    ${event ? `onclick="${runMethod('openEventDialog', event)}"` : ''}
                  >
                    <div class="pg-cell pg-cell--${cellType} pg-cell--${cellType}-${sortBy === 'nowOnly' ? 'now' : 'time'}">${trim(eventName, maxChar)}</div>
                  </td>
                `
              })}
            </tr>
          `)}
        </tbody>
      </table>
    </div>
  `
}

export default renderByTime
