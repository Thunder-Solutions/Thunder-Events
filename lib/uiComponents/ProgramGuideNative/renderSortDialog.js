import { DEFAULT_BREAKPOINT, DEFAULT_TIMES } from '../../constants'
import { mapString, runMethod } from '../../utilities'

const renderSortDialog = ({ sortDialogOpen, locations, times, activeDay, activeTime: _activeTime, dataset }) => {

  // only show location list if the columns are collapsed
  const { breakpoint = DEFAULT_BREAKPOINT } = dataset
  const beyondThreshold = !window.matchMedia(`(max-width: ${breakpoint})`).matches

  const { days, interval } = times || DEFAULT_TIMES
  const getTimeValue = date => date.toLocaleTimeString([], { hour12: false, timeStyle: 'short' })
  const activeTime = getTimeValue(_activeTime)
  const currentTimes = days[activeDay]
  const minTime = getTimeValue(currentTimes[0].date)
  const maxTime = getTimeValue(currentTimes[currentTimes.length - 1].date)
  const step = interval * 60

  return /* html */`
    <dialog class="pg-dialog" ${sortDialogOpen ? 'open' : ''}>
      <section class="pg-dialog-body">
        <header class="pg-dialog-header">
          <h1 class="pg-dialog-title">Options</h1>
          <button class="pg-dialog-close" onclick="${runMethod('toggleSortDialog', false)}">&times;</button>
        </header>
        <section class="pg-dialog-content">
          <menu class="pg-dialog-menu">
            <button class="pg-dialog-menu-item" onclick="${runMethod('selectSortBy', 'favorites')}">
              <i class="pg-favorite-icon">&starf;</i>
              <span>View Favorites</span>
            </button>
          </menu>
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
            <div class="pg-dialog-menu-special-item">
              <div class="pg-dialog-menu-item pg-dialog-menu-item--input">
                <input
                  type="time"
                  class="pg-dialog-menu-input"
                  value="${activeTime}"
                  min="${minTime}"
                  max="${maxTime}"
                  step="${step}"
                  onchange="${runMethod('selectActiveTime')}"
                />
                <span>&amp; On</span>
              </div>
              <button class="pg-dialog-menu-item" onclick="${runMethod('selectSortBy', 'time')}">Go &roarr;</button>
            </div>
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
