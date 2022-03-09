import { DEFAULT_BREAKPOINT } from '../../constants'
import { mapString, runMethod } from '../../utilities'

const renderSortDialog = ({ sortDialogOpen, locations, dataset }) => {

  // only show location list if the columns are collapsed
  const { breakpoint = DEFAULT_BREAKPOINT } = dataset
  const beyondThreshold = !window.matchMedia(`(max-width: ${breakpoint})`).matches

  return /* html */`
    <dialog class="pg-dialog" ${sortDialogOpen ? 'open' : ''}>
      <section class="pg-dialog-body">
        <header class="pg-dialog-header">
          <h1 class="pg-dialog-title">View by...</h1>
          <button class="pg-dialog-close" onclick="${runMethod('toggleSortDialog', false)}">&times;</button>
        </header>
        <section class="pg-dialog-content">
          <h2 class="pg-dialog-menu-title">Time</h2>
          <menu class="pg-dialog-menu">
            <button class="pg-dialog-menu-item" onclick="${runMethod('selectSortBy', 'allTime')}">All Time</button>
            <button class="pg-dialog-menu-item" onclick="${runMethod('selectSortBy', 'now')}">Right Now &amp; On</button>
            <button class="pg-dialog-menu-item" onclick="${runMethod('selectSortBy', 'nowOnly')}">Right Now Only</button>
          </menu>
          <h2 class="pg-dialog-menu-title">Location</h2>
          <menu class="pg-dialog-menu">
            ${beyondThreshold
              ? /* html */`<button class="pg-dialog-menu-item" onclick="${runMethod('selectSortBy', 'location')}">All Locations</button>`
              : mapString(locations, _location => /* html */`
                <button class="pg-dialog-menu-item" onclick="${runMethod('selectActiveLocation', _location)}">${_location}</button>
              `)
            }
          </menu>
        </section>
      </section>
    </dialog>
  `
}

export default renderSortDialog
