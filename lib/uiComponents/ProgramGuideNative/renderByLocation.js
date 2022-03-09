import { DEFAULT_TIMES } from '../../constants'
import { mapString, runMethod } from '../../utilities'
import { getCellData } from './componentUtils'

const renderByLocation = ({ activeLocation, events, times: allTimes, locations, activeDay }) => {

  const { days, interval } = allTimes || DEFAULT_TIMES

  // this keeps rowspans from previous iterations in memory
  // so we can avoid adding extra table cells.
  const spanState = {}

  // utility to check if the given location is active and return the class accordingly
  const getActiveClass = (_location, className) => activeLocation === _location ? className : ''

  // get all the times in the current day
  const times = days[activeDay]

  return /* html */`
    <div class="pg-table-wrapper">
      <table class="pg-table">
        <thead class="pg-header">
          <tr class="pg-row">
            <td class="pg-cell-wrapper pg-cell-wrapper--corner" onclick="${runMethod('toggleSortDialog', true)}">
              <div class="pg-cell pg-cell--corner"><i class="pg-more-icon"></i> ${activeDay}</div>
            </td>
            ${mapString(locations, _location => /* html */`
              <th class="pg-cell-wrapper pg-cell-wrapper--column-header ${getActiveClass(_location, 'pg-cell-wrapper--column-header-active')}">
                <div class="pg-cell pg-cell--column-header ${getActiveClass(_location, 'pg-cell--column-header-active')}">${_location}</div>
              </th>
            `)}
          </tr>
        </thead>
        <tbody class="pg-body">
          ${mapString(times, ({ date, timeString }) => /* html */`
            <tr class="pg-row">
              <th class="pg-cell-wrapper pg-cell-wrapper--row-header">
                <div class="pg-cell pg-cell--row-header">${timeString}</div>
              </th>
              ${mapString(locations, _location => {
                const { eventName, cellType, span, blank, event } = getCellData({ events, spanState, date, interval, _location })
                if (blank) return '' // blank if cell from previous row occupies this space
                return /* html */`
                  <td class="pg-cell-wrapper pg-cell-wrapper--${cellType}  ${getActiveClass(_location, `pg-cell-wrapper--${cellType}-active`)}" rowspan="${span}" ${event ? `onclick="${runMethod('openEventDialog', event)}"` : ''}>
                    <div class="pg-cell pg-cell--${cellType} ${getActiveClass(_location, `pg-cell--${cellType}-active`)}">${eventName}</div>
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
