import { DEFAULT_TIMES } from '../../../constants'
import { mapString, runMethod } from '../../../utilities'

const renderDateDialog = ({ times, activeDay, activeTime: _activeTime }) => {

  // only show location list if the columns are collapsed
  const { days } = times || DEFAULT_TIMES

  return /* html */`
    <section class="pg-dialog-body">
      <header class="pg-dialog-header">
        <h1 class="pg-dialog-title">Options</h1>
        <button class="pg-dialog-close" title="Close" onclick="${runMethod('toggleDateDialog', false)}"><i class="pg-close-icon" title="Close"></i></button>
      </header>
      <section class="pg-dialog-content">
        <menu class="pg-dialog-menu">
          <h2 class="pg-dialog-menu-title">Choose a date</h2>
          <label class="pg-dialog-menu-title">Which day?
            <select class="pg-dialog-select" onchange="${runMethod('selectActiveDay')}" autofocus>
              ${mapString(Object.keys(days), day => /* html */`
                <option value="${day}" ${day === activeDay ? 'selected' : ''}>${day}</option>
              `)}
            </select>
          </label>
        </menu>
        <menu class="pg-dialog-menu">
          <h2 class="pg-dialog-menu-title">Filter by:</h2>
          <button class="pg-dialog-menu-item" onclick="${runMethod('selectSortBy', 'location')}">Location</button>
          <button class="pg-dialog-menu-item" onclick="${runMethod('selectSortBy', 'allTime')}">Time</button>
          <button class="pg-dialog-menu-item" onclick="${runMethod('selectSortBy', 'list')}">As List</button>
        </menu>
      </section>
    </section>
  `
}

export default renderDateDialog
