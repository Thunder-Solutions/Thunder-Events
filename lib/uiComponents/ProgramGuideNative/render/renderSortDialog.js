import { DEFAULT_TIMES } from '../../../constants'
import { mapString, runMethod, parseLocationHash } from '../../../utilities'

const renderSortDialog = ({ locations, hiddenLocations, times, activeDay, activeTime: _activeTime, sortBy }, component) => {

  // only show location list if the columns are collapsed
  const { days, interval } = times || DEFAULT_TIMES
  const getTimeValue = date => date.toLocaleTimeString([], { hour12: false, timeStyle: 'short' })
  const activeTime = getTimeValue(_activeTime)
  // const currentTimes = days[activeDay]
  // const minTime = getTimeValue(currentTimes[0].date)
  // const maxTime = getTimeValue(currentTimes[currentTimes.length - 1].date)
  const step = interval * 60

  // set events after rendering finishes, hence timeout
  setTimeout(() => {
    const allLocationsCheckbox = component.root.querySelector('.pg-checkbox--allHiddenLocations')
    const toggleAllHiddenLocationCheckboxes = () => {
      const locationCheckboxes = component.root.querySelectorAll('.pg-checkbox--hiddenLocation')
      for (const checkbox of locationCheckboxes) {
        checkbox.checked = allLocationsCheckbox.checked
      }
      component.toggleAllHiddenLocations()
    }
    allLocationsCheckbox.addEventListener('change', toggleAllHiddenLocationCheckboxes)
  })

  return /* html */`
    <section class="pg-dialog-body">
      <header class="pg-dialog-header">
        <h1 class="pg-dialog-title">Options</h1>
        <button class="pg-dialog-close" title="Close" onclick="${runMethod('toggleSortDialog', false)}"><i class="pg-close-icon" title="Close"></i></button>
      </header>
      <section class="pg-dialog-content">
        <menu class="pg-dialog-menu">
          <label class="pg-dialog-menu-title">Which day?
            <select class="pg-dialog-select" onchange="${runMethod('selectActiveDay')}">
              ${mapString(Object.keys(days), day => /* html */`
                <option value="${day}" ${day === activeDay ? 'selected' : ''}>${day}</option>
              `)}
            </select>
          </label>
        </menu>
        <menu class="pg-dialog-menu">
          <h2 class="pg-dialog-menu-title">Schedule View</h2>
          <button class="pg-dialog-menu-item" onclick="${runMethod('selectSortBy', 'location')}" autofocus>Location</button>
          <button class="pg-dialog-menu-item" onclick="${runMethod('selectSortBy', 'time')}">Time</button>
          <button class="pg-dialog-menu-item" onclick="${runMethod('selectSortBy', 'list')}">List</button>
        </menu>
        <menu class="pg-dialog-menu">
          <h2 class="pg-dialog-menu-title">Filter by Time</h2>
          <button class="pg-dialog-menu-item" onclick="${runMethod('selectSortBy', 'allTime')}">All Times This Day</button>
          <button class="pg-dialog-menu-item" onclick="${runMethod('selectSortBy', 'now')}">Right Now &amp; Onward</button>
          <button class="pg-dialog-menu-item" onclick="${runMethod('selectSortBy', 'nowOnly')}">Right Now Only</button>
          <div class="pg-dialog-menu-special-item">
            <div class="pg-dialog-menu-item pg-dialog-menu-item--input">
              <input
                type="time"
                class="pg-dialog-menu-input pg-dialog-menu-input--time"
                value="${activeTime}"
                ${/* min="${minTime}"
                max="${maxTime}" */''}
                step="${step}"
                onchange="${runMethod('selectActiveTime')}"
              />
              <span class="pg-inline-text">&amp; On</span>
            </div>
            <button class="pg-dialog-menu-item" onclick="${runMethod('selectSortBy', 'time')}">Go &roarr;</button>
          </div>
        </menu>
        <menu class="pg-dialog-menu">
          <h2 class="pg-dialog-menu-title">Filter by Location</h2>
          <label class="pg-checkbox-wrapper">
            <input class="pg-checkbox pg-checkbox--allHiddenLocations" type="checkbox" ${locations.some(_location => hiddenLocations.includes(_location)) ? '' : 'checked'} />
            <span class="pg-checkbox-text">Toggle All Locations</span>
          </label>
          ${mapString(locations, _location => /* html */`
            <label class="pg-checkbox-wrapper">
              <input class="pg-checkbox pg-checkbox--hiddenLocation" type="checkbox" onchange="${runMethod('toggleHiddenLocation', _location)}" ${hiddenLocations.includes(_location) ? '' : 'checked'} />
              <span class="pg-checkbox-text">${_location}</span>
            </label>
          `)}
        </menu>
        <menu class="pg-dialog-menu">
          <h2 class="pg-dialog-menu-title">Jump to a Location</h2>
          ${mapString(locations, _location => /* html */`
            <a class="pg-dialog-menu-item" href="${parseLocationHash(_location)}">${_location}</a>
          `)}
        </menu>
      </section>
    </section>
  `
}

export default renderSortDialog
