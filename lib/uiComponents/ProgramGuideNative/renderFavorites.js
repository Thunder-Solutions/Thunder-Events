import { mapString, runMethod, getDateInfo, trim } from '../../utilities'

const renderFavorites = ({ favorites }) => /* html */`
  <div class="pg-table-wrapper">
    <table class="pg-table">
      <thead class="pg-header">
        <tr class="pg-row">
          <td class="pg-cell-wrapper pg-cell-wrapper--corner" onclick="${runMethod('toggleSortDialog', true)}">
            <div class="pg-cell pg-cell--corner"><i class="pg-more-icon" title="Options..."></i> Favorites</div>
          </td>
        </tr>
      </thead>
      <tbody class="pg-body">
        ${favorites.length === 0
          ? /* html */`
              <tr class="pg-row">
                <td class="pg-cell-wrapper pg-cell-wrapper--data pg-cell-wrapper--data-favorite">
                  <div class="pg-cell pg-cell--data pg-cell--data-favorite">You have no favorites.</div>
                </td>
              </tr>
            `
          : mapString(favorites, event => {
            const { start, end, name, location } = event
            const startDate = getDateInfo(start)
            const endDate = getDateInfo(end)
            const day = `${startDate.day} ${startDate.date}`
            const startTime = startDate.time
            const endTime = endDate.time
            return /* html */`
              <tr class="pg-row">
                <td class="pg-cell-wrapper pg-cell-wrapper--data pg-cell-wrapper--data-favorite" onclick="${runMethod('openEventDialog', event)}">
                  <div class="pg-cell pg-cell--data pg-cell--data-favorite">
                    <span class="pg-search-result-name">${trim(name)}</span>
                    <span class="pg-inline-result-details">${day}</span>
                    <span class="pg-search-result-details">
                      <span class="pg-inline-text">${startTime}</span>
                      <span class="pg-inline-text">- ${endTime}</span>
                      <span class="pg-inline-text"> @ ${location}</span>
                    </span>
                  </div>
                </td>
              </tr>
            `
          })
        }
      </tbody>
    </table>
  </div>
`

export default renderFavorites
