import { getDateInfo, mapString, runMethod, trim } from '../../../utilities'

const renderSearchResults = ({ searchResults }) => /* html */`
  <div class="pg-table-wrapper">
    <table class="pg-table">
      <thead class="pg-table-header">
        <tr class="pg-row">
          <td class="pg-cell-wrapper pg-cell-wrapper--search-header">
            <div class="pg-cell pg-cell--search-header">Search Results</div>
          </td>
        </tr>
      </thead>
      <tbody class="pg-table-body">
        ${searchResults.length === 0
          ? /* html */`
              <tr class="pg-row">
                <td class="pg-cell-wrapper pg-cell-wrapper--data pg-cell-wrapper--data-search">
                  <div class="pg-cell pg-cell--data pg-cell--data-search">No results found.</div>
                </td>
              </tr>
            `
          : mapString(searchResults, event => {
            const { start, end, name, location } = event
            const startDate = getDateInfo(start)
            const endDate = getDateInfo(end)
            const day = `${startDate.day} ${startDate.date}`
            const startTime = startDate.time
            const endTime = endDate.time
            return /* html */`
              <tr class="pg-row">
                <td class="pg-cell-wrapper pg-cell-wrapper--data pg-cell-wrapper--data-search" onclick="${runMethod('openEventDialog', event)}">
                  <div class="pg-cell pg-cell--data pg-cell--data-search">
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

export default renderSearchResults
