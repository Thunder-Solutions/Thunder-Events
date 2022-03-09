import { mapString, runMethod } from '../../utilities'

const renderFavorites = ({ favorites }) => /* html */`
  <div class="pg-table-wrapper">
    <table class="pg-table">
      <thead class="pg-header">
        <tr class="pg-row">
          <td class="pg-cell-wrapper pg-cell-wrapper--corner" onclick="${runMethod('toggleSortDialog', true)}">
            <div class="pg-cell pg-cell--corner"><i class="pg-more-icon"></i> Favorites</div>
          </td>
        </tr>
      </thead>
      <tbody class="pg-body">
        ${favorites.length === 0
          ? /* html */`
              <tr class="pg-row">
                <td class="pg-cell-wrapper pg-cell-wrapper--data  pg-cell-wrapper--data-favorite">
                  <div class="pg-cell pg-cell--data pg-cell--data-favorite">You have no favorites.</div>
                </td>
              </tr>
            `
          : mapString(favorites, event => {
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

export default renderFavorites
