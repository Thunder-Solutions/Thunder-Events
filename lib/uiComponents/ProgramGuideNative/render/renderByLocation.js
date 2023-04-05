import { DEFAULT_TIMES } from '../../../constants'
import { getEventId, mapString, runMethod, trim } from '../../../utilities'
import { getCellData } from '../componentUtils'

const renderByLocation = ({ activeLocation, events, times: allTimes, locations, hiddenLocations, activeDay, marker }) => {

  const { days, interval } = allTimes || DEFAULT_TIMES

  // this keeps rowspans from previous iterations in memory
  // so we can avoid adding extra table cells.
  const spanState = {}

  // utility to check if the given location is active and return the class accordingly
  const getActiveClass = (_location, className) => activeLocation === _location ? className : ''
  const getMarkerClass = (_location, className) => marker === _location ? className : ''

  // get all the times in the current day
  const times = days[activeDay]

  // Get locations minus hiddenLocations
  const availableLocations = locations.filter(locName => !hiddenLocations.includes(locName))

  return /* html */`
    <select class="pg-dialog-select" onchange="${runMethod('selectActiveDay')}" autofocus>
      ${mapString(Object.keys(days), day => /* html */`
        <option value="${day}" ${day === activeDay ? 'selected' : ''}>${day}</option>
      `)}
    </select>
    <div class="pg-table-wrapper">
      <table class="pg-table">
        <thead class="pg-table-header">
          <tr class="pg-row">
            <td class="pg-cell-wrapper pg-cell-wrapper--corner pg-cell-wrapper--corner-collapsed">
            </td>
            ${mapString(availableLocations, _location => /* html */`
              <th
                class="
                  pg-cell-wrapper
                  pg-cell-wrapper--column-header
                  pg-cell-wrapper--column-header-location
                  ${getActiveClass(_location, 'pg-cell-wrapper--column-header-active')}
                  ${getMarkerClass(_location, 'pg-cell-wrapper--column-header-active-location')}
                "
              >
                <div class="pg-cell pg-cell--column-header ${getActiveClass(_location, 'pg-cell--column-header-active')}">
                  <button class="pg-location-name" onclick="${runMethod('showFloorPlan', _location)}">
                    <div class="pg-header-button">
                      <i class="pg-target-icon"></i>
                      <span>Show on Map</span>
                    </div>
                    <span class="pg-inline-text">${_location}</span>
                  </button>
                  <button class="pg-header-button" onclick="${runMethod('toggleChooseLocation', true)}">
                    <i class="pg-location-icon"></i>
                    <span>Choose Location</span>
                  </button>
                  <button class="pg-header-button">
                    <i class="pg-view-time-icon"></i>
                    <span>View by Time</span>
                  </button>
                </div>
              </th>
            `)}
          </tr>
        </thead>
        <tbody class="pg-body">
          ${mapString(times, ({ date, timeString }) => /* html */`
            <tr class="pg-row">
              <th class="pg-cell-wrapper pg-cell-wrapper--row-header pg-cell-wrapper--row-header-location pg-cell-wrapper--row-header-collapsed" onclick="${runMethod('toggleHeaders')}">
                <div class="pg-cell pg-cell--row-header pg-cell--row-header-location"><div class="pg-inner-cell">${timeString}</div></div>
              </th>
              ${mapString(availableLocations, _location => {
                const { eventName, cellType, span, blank, event } = getCellData({ events, spanState, date, interval, _location })
                const durationMinutes = event ? ((event.end.getTime() - event.start.getTime()) / 1000 / 60) : 0
                const isSingleCell = durationMinutes === interval
                const maxChar = isSingleCell ? 36 : 75
                if (blank) return '' // blank if cell from previous row occupies this space
                return /* html */`
                  <td
                    class="pg-cell-wrapper pg-cell-wrapper--${cellType} pg-cell-wrapper--${cellType}-location ${getActiveClass(_location, `pg-cell-wrapper--${cellType}-active`)}"
                    rowspan="${span}"
                    id="${event ? getEventId(event) : ''}"
                    data-column="${_location}"
                    ${event ? `onclick="${runMethod('openEventDialog', event)}"` : ''}
                  >
                    <div class="pg-cell pg-cell--${cellType} ${getActiveClass(_location, `pg-cell--${cellType}-active`)}">${trim(eventName, maxChar)}</div>
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

export default renderByLocation
