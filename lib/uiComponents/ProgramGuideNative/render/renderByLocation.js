import { DEFAULT_TIMES } from '../../../constants'
import { getEventId, mapString, runMethod, trim } from '../../../utilities'
import { getCellData } from '../componentUtils'

const renderByLocation = ({ activeLocation, events, times: allTimes, locations, activeDay, marker }) => {

  const { days, interval } = allTimes || DEFAULT_TIMES

  // this keeps rowspans from previous iterations in memory
  // so we can avoid adding extra table cells.
  const spanState = {}

  // utility to check if the given location is active and return the class accordingly
  const getActiveClass = (_location, className) => activeLocation === _location ? className : ''
  const getMarkerClass = (_location, className) => marker === _location ? className : ''

  // get all the times in the current day
  const times = days[activeDay]

  return /* html */`
    <div class="pg-table-wrapper">
      <table class="pg-table">
        <thead class="pg-table-header">
          <tr class="pg-row">
            <td class="pg-cell-wrapper pg-cell-wrapper--corner pg-cell-wrapper--corner-collapsed" onclick="${runMethod('toggleDateDialog', true)}">
              <div class="pg-cell pg-cell--corner"><span class="pg-corner-text">${activeDay}</span></div>
            </td>
            ${mapString(locations, _location => /* html */`
              <th
                class="
                  pg-cell-wrapper
                  pg-cell-wrapper--column-header
                  pg-cell-wrapper--column-header-location
                  ${getActiveClass(_location, 'pg-cell-wrapper--column-header-active')}
                  ${getMarkerClass(_location, 'pg-cell-wrapper--column-header-active-location')}
                "
                onclick="${runMethod('showFloorPlan', _location)}"
              >
                <div class="pg-cell pg-cell--column-header ${getActiveClass(_location, 'pg-cell--column-header-active')}">
                  <i class="pg-map-icon"></i>
                  <span class="pg-inline-text">${_location}</span>
                </div>
              </th>
            `)}
          </tr>
        </thead>
        <tbody class="pg-body">
          ${mapString(times, ({ date, timeString }) => /* html */`
            <tr class="pg-row">
              <th class="pg-cell-wrapper pg-cell-wrapper--row-header pg-cell-wrapper--row-header-location pg-cell-wrapper--row-header-collapsed" onclick="${runMethod('toggleHeaders')}">
                <div class="pg-cell pg-cell--row-header pg-cell--row-header-location">${timeString}</div>
              </th>
              ${mapString(locations, _location => {
                const { eventName, cellType, span, blank, event } = getCellData({ events, spanState, date, interval, _location })
                if (blank) return '' // blank if cell from previous row occupies this space
                return /* html */`
                  <td
                    class="pg-cell-wrapper pg-cell-wrapper--${cellType} ${getActiveClass(_location, `pg-cell-wrapper--${cellType}-active`)}"
                    rowspan="${span}"
                    id="${event ? getEventId(event) : ''}"
                    ${event ? `onclick="${runMethod('openEventDialog', event)}"` : ''}
                  >
                    <div class="pg-cell pg-cell--${cellType} ${getActiveClass(_location, `pg-cell--${cellType}-active`)}">${trim(eventName)}</div>
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
