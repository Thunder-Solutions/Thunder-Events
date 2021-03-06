import { mapString, runMethod, getDateInfo } from '../../../utilities'

const renderAsList = ({ events, hiddenLocations, activeDay, times }) => {

  // Sort events in ascending order (earliest to latest)
  const sortedEvents = [...events].sort(
    (e1, e2) => Number(new Date(e1.start)) - Number(new Date(e2.start)),
  )

  // only show location list if the columns are collapsed
  const { days } = times || DEFAULT_TIMES

  return /* html */`
    <div class="pg-table-wrapper">
      <table class="pg-table">
        <thead class="pg-table-header">
          <tr class="pg-row">
            <td class="pg-cell-wrapper pg-cell-wrapper--corner">
              <div class="pg-cell">
                <span class="pg-corner-text">
                  <select class="pg-dialog-select" onchange="${runMethod('selectActiveDay')}" autofocus>
                    ${mapString(Object.keys(days), day => /* html */`
                      <option value="${day}" ${day === activeDay ? 'selected' : ''}>${day}</option>
                    `)}
                  </select>
                </span>
              </div>
            </td>
          </tr>
        </thead>
        <tbody class="pg-body">
          ${mapString(sortedEvents, event => {
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
            return /* html */`
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
          })}
        </tbody>
      </table>
    </div>
  `
}

export default renderAsList
