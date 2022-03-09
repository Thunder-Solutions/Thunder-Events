import { getLocations, getEvents, getTimes } from '../../exports'
import { getStyles } from './getStyles'
import { clearHTML } from '../../utilities'
import { DEFAULT_BREAKPOINT, DEFAULT_EVENT, DEFAULT_TIMES } from '../../constants'
import { getActiveEvent } from './componentUtils'
import renderSortDialog from './renderSortDialog'
import renderEventDialog from './renderEventDialog'
import renderByLocation from './renderByLocation'

// A native web component for the main event schedule
class ProgramGuideNative extends HTMLElement {

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
    component.activeEvent = getActiveEvent(DEFAULT_EVENT)
    component.sortDialogOpen = false
    component.eventDialogOpen = false

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

  toggleSortDialog(_bool) {
    const component = this

    // only open the dialog if the columns are collapsed
    const { breakpoint = DEFAULT_BREAKPOINT } = component.dataset
    const beyondThreshold = !window.matchMedia(`(max-width: ${breakpoint})`).matches
    const bool = _bool === 'true' ? true : !!_bool
    component.sortDialogOpen = beyondThreshold ? false : bool
    component.render()
  }

  openEventDialog(encodedEvent) {
    const component = this
    const eventJSON = decodeURIComponent(encodedEvent)
    const event = JSON.parse(eventJSON)
    component.activeEvent = getActiveEvent(event)
    component.eventDialogOpen = true
    component.render()
  }

  closeEventDialog() {
    const component = this
    component.eventDialogOpen = false
    component.render()
  }

  selectActiveLocation(_location) {
    const component = this
    component.activeLocation = _location
    component.sortDialogOpen = false // close upon selection
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

    // rewrite the template HTML
    const tableTemplate = document.createElement('template')
    tableTemplate.innerHTML = /* html */`
      <style>${style}</style>
      ${renderByLocation(component)}
      ${renderSortDialog(component)}
      ${renderEventDialog(component)}
    `
    component.root.appendChild(tableTemplate.content.cloneNode(true))
    return true // success
  }
}

export default ProgramGuideNative
