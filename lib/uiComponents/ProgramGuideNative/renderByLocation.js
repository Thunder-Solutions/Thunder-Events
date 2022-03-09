import { DEFAULT_TIMES } from '../../constants'
import { mapString, runMethod } from '../../utilities'
import { getCellData } from './componentUtils'

const renderByLocation = ({ activeLocation, events, times, locations }) => {

  const { days, interval } = times || DEFAULT_TIMES

  // this keeps rowspans from previous iterations in memory
  // so we can avoid adding extra table cells.
  const rowState = {}

  // utility to check if the given location is active and return the class accordingly
  const getActiveClass = (_location, className) => activeLocation === _location ? className : ''

  return mapString(Object.keys(days), day => {
    const times = days[day]
    return /* html */`
      <div class="pg-table-wrapper">
        <table class="pg-table">
          <thead class="pg-header">
            <tr class="pg-row">
              <td class="pg-cell-wrapper pg-cell-wrapper--corner">
                <div class="pg-cell pg-cell--corner">${day}</div>
              </td>
              ${mapString(locations, _location => /* html */`
                <th class="pg-cell-wrapper pg-cell-wrapper--column-header ${getActiveClass(_location, 'pg-cell-wrapper--column-header-active')}" onclick="${runMethod('toggleSortDialog', true)}">
                  <div class="pg-cell pg-cell--column-header ${getActiveClass(_location, 'pg-cell--column-header-active')}">${_location} <i class="pg-more-icon"></i></div>
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
                  const { eventName, cellType, rowspan, blank, event } = getCellData({ events, rowState, date, interval, _location })
                  if (blank) return '' // blank if cell from previous row occupies this space
                  return /* html */`
                    <td class="pg-cell-wrapper pg-cell-wrapper--${cellType}  ${getActiveClass(_location, `pg-cell-wrapper--${cellType}-active`)}" rowspan="${rowspan}" ${event ? `onclick="${runMethod('openEventDialog', event)}"` : ''}>
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
  })
}

export default renderByLocation
