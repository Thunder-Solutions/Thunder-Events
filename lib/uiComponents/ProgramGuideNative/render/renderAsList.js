import { mapString, runMethod, getDateInfo } from '../../../utilities'

const renderAsList = ({ events, hiddenLocations, activeDay, times }) => {

  // Sort events in ascending order (earliest to latest)
  const sortedEvents = [...events].sort(
    (e1, e2) => Number(new Date(e1.start)) - Number(new Date(e2.start)),
  )

  // only show location list if the columns are collapsed
  const { days } = times || DEFAULT_TIMES

  return /* html */`
    <div></div>
    <div class="pg-table-wrapper">
      <table class="pg-table">
        <thead class="pg-table-header">
          <tr class="pg-row">
            <td class="pg-cell-wrapper pg-cell-wrapper--column-header">
              <div class="pg-cell pg-cell--column-header">
                <select class="pg-dialog-select" onchange="${runMethod('selectActiveDay')}" autofocus>
                  ${mapString(Object.keys(days), day => /* html */`
                    <option value="${day}" ${day === activeDay ? 'selected' : ''}>${day}</option>
                  `)}
                </select>
              </div>
              <div class="pg-cell pg-cell--column-header">
                <span class="pg-corner-text">
                  List of Events
                </span>
                <button class="pg-header-button" onclick="${runMethod('toggleChooseTime', true)}">
                  <i class="pg-schedule-icon"></i>
                  <span>Choose Time</span>
                </button>
                <button class="pg-header-button" onclick="${runMethod('selectSortBy', 'location')}">
                  <i class="pg-view-location-icon"></i>
                  <span>View by Location</span>
                </button>
              </div>
            </td>
          </tr>
        </thead>
        <tbody class="pg-body">
          ${(() => {

              // use the closure to manage state through iterations
              let timeBlock

              return mapString(sortedEvents, event => {
                const { start, end, name, location } = event

                // Don't render if location is filtered out
                if (hiddenLocations.includes(location)) return
                
                // Don't render if not same date
                if (new Date(activeDay).getDate() !== new Date(start).getDate()) return

                const startDate = getDateInfo(start)
                const endDate = getDateInfo(end)
                const day = `${startDate.day} ${startDate.date}`
                const startTime = startDate.time
                const endTime = endDate.time
                const newTimeBlock = timeBlock !== startTime
                if (newTimeBlock) timeBlock = startTime
                return /* html */`
                  ${newTimeBlock ? /* html */`
                    <tr class="pg-row">
                      <td class="pg-cell-wrapper pg-cell-wrapper--data">${startTime}</td>
                    </tr>
                  ` : ''}
                  <tr class="pg-row">
                    <td class="pg-cell-wrapper pg-cell-wrapper--data pg-cell-wrapper--data-favorite" onclick="${runMethod('openEventDialog', event)}">
                      <div class="pg-cell pg-cell--data pg-cell--data-favorite">
                        <span class="pg-search-result-name">${name}</span>
                        <span class="pg-inline-result-details"><strong>Location:</strong> ${location}</span>
                        <span class="pg-inline-result-details">${day}</span>
                        <span class="pg-search-result-details">
                          <span class="pg-inline-text">${startTime}</span>
                          <span class="pg-inline-text">- ${endTime}</span>
                        </span>
                      </div>
                    </td>
                  </tr>
                `
              })
          })()}
        </tbody>
      </table>
    </div>
  `
}

export default renderAsList
