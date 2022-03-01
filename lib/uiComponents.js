import { getLocations, getEvents, getTimes } from './exports'
import { getStyles } from './css'
import { clearHTML, mapString, WholeNumber } from './utilities'
import { DEFAULT_BREAKPOINT, DEFAULT_TIMES } from './constants'

// a small local utility to extract logic away from the template
const getCellData = ({ events, rowState, date, interval, _location }) => {
  const event = events.find(e =>
    Number(e.start) === Number(date)
    && e.location === _location)
  const eventName = event ? event.name : ''
  const cellType = event ? 'data' : 'data-empty'
  const duration = event ? WholeNumber((event.end - event.start) / 1000 / 60) : 0
  const rowspan = duration ? WholeNumber(duration / interval) : 1
  const blank = !!rowState[_location]
  if (blank) --rowState[_location]
  else if (rowspan > 1) rowState[_location] = rowspan
  return { eventName, cellType, rowspan, blank }
}

// A native web component for the main event schedule
export class ProgramGuideNative extends HTMLElement {

  constructor() {

    // set up basic component needs
    super()
    const component = this
    component.root = component.attachShadow({ mode: 'open' })

    // component state
    component.locations = []
    component.events = []
    component.times = DEFAULT_TIMES
    component.activeLocation = ''
    component.locationDialogOpen = false

    // render loading spinner
    component.render({ loading: true })

    // asynchronously get data and render table
    getLocations().then(async locations => {

      // set the default active location for mobile view
      component.locations = locations
      component.activeLocation = locations[0]
      component.events = await getEvents()
      component.times = await getTimes()

      // initial render
      component.render()
    })
  }

  toggleLocationDialog(_bool) {
    const component = this

    // only open the dialog if the columns are collapsed
    const { breakpoint = DEFAULT_BREAKPOINT } = component.dataset
    const beyondThreshold = !window.matchMedia(`(max-width: ${breakpoint})`).matches
    const bool = _bool === 'true' ? true : !!_bool
    component.locationDialogOpen = beyondThreshold ? false : bool
    component.render()
  }

  selectActiveLocation(_location) {
    const component = this
    component.activeLocation = _location
    component.locationDialogOpen = false // close upon selection
    component.render()
  }

  render({ loading } = {}) {
    const component = this

    // clear previously rendered content
    clearHTML(component.root)

    // get style
    const { css, breakpoint } = component.dataset
    const style = css || getStyles(breakpoint || DEFAULT_BREAKPOINT)

    // render loading spinner if necessary
    if (loading) {
      const loadingTemplate = document.createElement('template')
      loadingTemplate.innerHTML = /* html */`
        <style>${style}</style>
        <div class="pg-loading"></div>
      `
      component.root.appendChild(loadingTemplate.content.cloneNode(true))
      return true // success
    }

    // get component state
    const { events, times, locations } = component
    const { days, interval } = times || DEFAULT_TIMES

    // this keeps rowspans from previous iterations in memory
    // so we can avoid adding extra table cells.
    const rowState = {}

    // utility to check if the given location is active and return the class accordingly
    const getActiveClass = (_location, className) => component.activeLocation === _location ? className : ''

    // rewrite the template HTML
    const tableTemplate = document.createElement('template')
    tableTemplate.innerHTML = /* html */`
      <style>${style}</style>
      ${mapString(Object.keys(days), day => {
        const times = days[day]
        return /* html */`
          <div class="pg-table-wrapper">
            <table class="pg-table">
              <thead class="pg-header">
                <tr class="pg-row">
                  <td class="pg-cell-wrapper pg-cell-wrapper--corner">
                    <div class="pg-cell pg-cell--corner">${day}</div>
                  </td>
                  ${mapString(locations, _location => /* html */`
                    <th class="pg-cell-wrapper pg-cell-wrapper--column-header ${getActiveClass(_location, 'pg-cell-wrapper--column-header-active')}" onclick="this.getRootNode().host.toggleLocationDialog(true)">
                      <div class="pg-cell pg-cell--column-header ${getActiveClass(_location, 'pg-cell--column-header-active')}">${_location} <i class="pg-more-icon"></i></div>
                    </th>
                  `)}
                </tr>
              </thead>
              <tbody class="pg-body">
                ${mapString(times, ({ date, timeString }) => /* html */`
                  <tr class="pg-row">
                    <th class="pg-cell-wrapper pg-cell-wrapper--row-header">
                      <div class="pg-cell pg-cell--row-header">${timeString}</div>
                    </th>
                    ${mapString(locations, _location => {
                      const { eventName, cellType, rowspan, blank } = getCellData({ events, rowState, date, interval, _location })
                      if (blank) return '' // blank if cell from previous row occupies this space
                      return /* html */`
                        <td class="pg-cell-wrapper pg-cell-wrapper--${cellType}  ${getActiveClass(_location, `pg-cell-wrapper--${cellType}-active`)}" rowspan="${rowspan}">
                          <div class="pg-cell pg-cell--${cellType} ${getActiveClass(_location, `pg-cell--${cellType}-active`)}">${eventName}</div>
                        </td>
                      `
                    })}
                  </tr>
                `)}
              </tbody>
            </table>
          </div>
        `
      })}
      <dialog class="pg-dialog" ${component.locationDialogOpen ? 'open' : ''}>
        <header class="pg-dialog-header">
          <h1 class="pg-dialog-title">Choose a Location...</h1>
          <button class="pg-dialog-close" onclick="this.getRootNode().host.toggleLocationDialog(false)">&times;</button>
        </header>
        <menu class="pg-dialog-menu">
          ${mapString(locations, _location => /* html */`
            <button class="pg-dialog-menu-item" onclick="this.getRootNode().host.selectActiveLocation('${_location}')">${_location}</button>
          `)}
        </menu>
      </dialog>
    `
    component.root.appendChild(tableTemplate.content.cloneNode(true))
    return true // success
  }
}
