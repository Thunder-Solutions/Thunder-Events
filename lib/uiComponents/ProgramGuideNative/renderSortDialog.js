import { DEFAULT_BREAKPOINT, DEFAULT_TIMES } from '../../constants'
import { mapString, runMethod } from '../../utilities'

const renderSortDialog = ({ sortDialogOpen, locations, times, activeDay, dataset }) => {

  // only show location list if the columns are collapsed
  const { breakpoint = DEFAULT_BREAKPOINT } = dataset
  const beyondThreshold = !window.matchMedia(`(max-width: ${breakpoint})`).matches

  const { days } = times || DEFAULT_TIMES

  return /* html */`
    <dialog class="pg-dialog" ${sortDialogOpen ? 'open' : ''}>
      <section class="pg-dialog-body">
        <header class="pg-dialog-header">
          <h1 class="pg-dialog-title">Options</h1>
          <button class="pg-dialog-close" onclick="${runMethod('toggleSortDialog', false)}">&times;</button>
        </header>
        <section class="pg-dialog-content">
          <menu class="pg-dialog-menu">
            <h2 class="pg-dialog-menu-title">Which day?</h2>
            <select class="pg-dialog-select" onchange="${runMethod('selectActiveDay')}">
              ${mapString(Object.keys(days), day => /* html */`
                <option value="${day}" ${day === activeDay ? 'selected' : ''}>${day}</option>
              `)}
            </select>
          </menu>
          <menu class="pg-dialog-menu">
            <h2 class="pg-dialog-menu-title">Time</h2>
            <button class="pg-dialog-menu-item" onclick="${runMethod('selectSortBy', 'allTime')}">All Time</button>
            <button class="pg-dialog-menu-item" onclick="${runMethod('selectSortBy', 'now')}">Right Now &amp; On</button>
            <button class="pg-dialog-menu-item" onclick="${runMethod('selectSortBy', 'nowOnly')}">Right Now Only</button>
          </menu>
          <menu class="pg-dialog-menu">
            <h2 class="pg-dialog-menu-title">Location</h2>
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
