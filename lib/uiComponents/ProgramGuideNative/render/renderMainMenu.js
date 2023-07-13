import { DEFAULT_TIMES } from '../../../constants'
import { mapString, runMethod } from '../../../utilities'

const renderMainMenu = ({ locations, hiddenLocations, times, activeDay, activeTime: _activeTime }, component) => {

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
    allLocationsCheckbox?.addEventListener('change', toggleAllHiddenLocationCheckboxes)
  })

  return /* html */`
    <section class="pg-dialog-body">
      <header class="pg-dialog-header">
        <h1 class="pg-dialog-title">Options</h1>
        <button class="pg-dialog-close" title="Close" onclick="${runMethod('toggleMainMenu', false)}"><i class="pg-close-icon" title="Close"></i></button>
      </header>
      <section class="pg-dialog-content">
        <!-- disabled until print issues resolved...
        <menu class="pg-dialog-menu">
          <h2 class="pg-dialog-menu-title">Export</h2>
          <button class="pg-dialog-menu-item" onclick="${runMethod('print')}">
            <i class="pg-print-icon"></i>
            <span>Print</span>
          </button>
        </menu>
        -->
        <menu class="pg-dialog-menu">
          <h2 class="pg-dialog-menu-title">Filter Times</h2>
          <button class="pg-dialog-menu-item" onclick="${runMethod('selectSortBy', 'now')}">
            <i class="pg-schedule-icon"></i>
            <span>Now &amp; Onward</span>
          </button>
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
          <h2 class="pg-dialog-menu-title">Filter Locations</h2>
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
      </section>
    </section>
  `
}

export default renderMainMenu
