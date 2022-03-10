import { mapString, runMethod } from '../../utilities'

const renderSearchResults = ({ searchResults }) => /* html */`
  <div class="pg-table-wrapper">
    <table class="pg-table">
      <thead class="pg-header">
        <tr class="pg-row">
          <td class="pg-cell-wrapper pg-cell-wrapper--corner" onclick="${runMethod('toggleSortDialog', true)}">
            <div class="pg-cell pg-cell--corner"><i class="pg-more-icon"></i> Search Results</div>
          </td>
        </tr>
      </thead>
      <tbody class="pg-body">
        ${searchResults.length === 0
          ? /* html */`
              <tr class="pg-row">
                <td class="pg-cell-wrapper pg-cell-wrapper--data  pg-cell-wrapper--data-favorite">
                  <div class="pg-cell pg-cell--data pg-cell--data-favorite">No results found.</div>
                </td>
              </tr>
            `
          : mapString(searchResults, event => {
            return /* html */`
              <tr class="pg-row">
                <td class="pg-cell-wrapper pg-cell-wrapper--data  pg-cell-wrapper--data-favorite" onclick="${runMethod('openEventDialog', event)}">
                  <div class="pg-cell pg-cell--data pg-cell--data-favorite">${event.name}</div>
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
