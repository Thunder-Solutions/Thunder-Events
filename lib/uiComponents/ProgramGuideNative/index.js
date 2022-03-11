import { getLocations, getEvents, getTimes, getFavorites, addFavorite, removeFavorite, getFloorPlan } from '../../exports'
import { getStyles } from './getStyles'
import { clearHTML, getDateInfo, parseHTML, search } from '../../utilities'
import { DEFAULT_BREAKPOINT, DEFAULT_EVENT, DEFAULT_TIMES } from '../../constants'
import { getActiveEvent } from './componentUtils'
import renderSortDialog from './renderSortDialog'
import renderEventDialog from './renderEventDialog'
import renderByLocation from './renderByLocation'
import renderByTime from './renderByTime'
import renderFavorites from './renderFavorites'
import renderSearchBar from './renderSearchBar'
import renderSearchResults from './renderSearchResults'
import renderFloorPlan from './renderFloorPlan'
import dialogPolyfill from 'dialog-polyfill'

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
    component.activeDay = ''
    component.activeLocation = ''
    component.activeEvent = getActiveEvent(DEFAULT_EVENT)
    component.sortBy = 'location' // location | allTime | now | nowOnly | time | favorites
    component.view = 'guide' // guide | floorPlan
    component.favorites = []
    component.currentSearch = ''
    component.searchResults = []
    component.floorPlan = {}

    // handle escape key
    // -- use the closure for referencing `component` to avoid binding issues with `this`
    component.handleEsc = event => {
      if (event.key === 'Esc' || event.key === 'Escape') {
        event.preventDefault()
        component.toggleSortDialog(false)
        component.closeEventDialog()
      }
    }

    // handle hash links
    // -- use the closure for referencing `component` to avoid binding issues with `this`
    component.handleHashChange = () => {

      // a little extra insurance to avoid conflicts with other code...
      const hash = location.hash.replace('#', '')
      if (!hash.startsWith('View-Location-')) return

      component.activeLocation = hash.replace('View-Location-', '').replace('-', ' ')
      component.view = 'guide'
      component.sortBy = 'location'
      component.render()
    }

    // render loading spinner
    component.render({ loading: true })

    // asynchronously get data and render table
    component.waitForFetch = getLocations().then(async locations => {

      // set the default active location for mobile view
      component.events = await getEvents()
      component.times = await getTimes()
      component.favorites = await getFavorites()
      component.floorPlan = await getFloorPlan()
      component.locations = locations
      component.activeLocation = locations[0]
      const { days } = component.times || DEFAULT_TIMES
      component.activeDay = Object.keys(days)[0]
      const firstTime = days[component.activeDay][0].date
      const { date, time } = getDateInfo(firstTime)
      component.activeTime = new Date(`${date} ${time}`)

      // initial render
      component.render()
    })
  }

  connectedCallback() {
    const component = this
    window.addEventListener('keydown', component.handleEsc)
    component.waitForFetch.then(() => {
      window.addEventListener('hashchange', component.handleHashChange)
    })
  }

  disconnectedCallback() {
    const component = this
    window.removeEventListener('keydown', component.handleEsc)
    window.removeEventListener('hashchange', component.handleHashChange)
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

    // determine which render method to use
    const renderMap = {
      location: renderByLocation,
      time: renderByTime,
      allTime: renderByTime,
      now: renderByTime,
      nowOnly: renderByTime,
      favorites: renderFavorites,
      search: renderSearchResults,
    }
    const renderTable = renderMap[component.sortBy]
    const showFloorPlan = component.view === 'floorPlan'

    // rewrite the template HTML
    const tableTemplate = document.createElement('template')
    tableTemplate.innerHTML = /* html */`
      <style>
        /* typical browser defaults for dialog polyfill */
        dialog + .backdrop { position: fixed; top: 0; right: 0; bottom: 0; left: 0; background: rgba(0, 0, 0, 0.1); }
        ${style}
      </style>
      <section id="ProgramGuide">
        ${renderSearchBar(component)}
        ${showFloorPlan
          ? renderFloorPlan(component)
          : renderTable(component)
        }
      </section>
      <dialog class="pg-dialog pg-dialog--sort">${renderSortDialog(component)}</dialog>
      <dialog class="pg-dialog pg-dialog--event">${renderEventDialog(component)}</dialog>
    `
    component.root.appendChild(tableTemplate.content.cloneNode(true))
    component.registerDialogs()

    // handle scrolling within the table
    if (component.view === 'guide') {
      const wrapper = component.root.querySelector('.pg-table-wrapper')
      const handleScroll = () => {
        const SCROLLED_CLASS = 'pg-table-wrapper--scrolled'
        const needsClass = wrapper.scrollLeft > 0 && !wrapper.classList.contains(SCROLLED_CLASS)
        if (needsClass) wrapper.classList.add(SCROLLED_CLASS)
        if (wrapper.scrollLeft === 0) wrapper.classList.remove(SCROLLED_CLASS)
      }
      wrapper.addEventListener('scroll', handleScroll)
    }

    return true // success
  }

  async addFavorite(encodedEvent) {
    const component = this
    const eventJSON = decodeURIComponent(encodedEvent)
    const event = JSON.parse(eventJSON)
    component.favorites.push(event)
    component.render()
    return await addFavorite(event)
  }

  async removeFavorite(encodedEvent) {
    const component = this
    const eventJSON = decodeURIComponent(encodedEvent)
    const event = JSON.parse(eventJSON)
    const removeIndex = component.favorites.findIndex(({ location: _location, start, name }) => {
      const { location: cLocation, start: cStart, name: cName } = event
      return _location === cLocation && start === cStart && name === cName
    })
    component.favorites.splice(removeIndex, 1)
    component.render()
    return await removeFavorite(event)
  }

  showFloorPlan() {
    const component = this
    component.view = 'floorPlan'
    component.render()
  }

  toggleHeaders({ target }) {
    const component = this

    // do nothing if viewing by "now only", because there's nothing to collapse
    if (component.sortBy === 'nowOnly') return

    // do nothing if the table hasn't scrolled
    const wrapper = component.root.querySelector('.pg-table-wrapper')
    if (!wrapper.classList.contains('pg-table-wrapper--scrolled')) return

    // toggle the collapsed classes
    const allHeaders = component.root.querySelectorAll('.pg-cell-wrapper--row-header')
    const COLLAPSED_CLASS = 'pg-cell-wrapper--row-header-collapsed'
    const addOrRemove = target.classList.contains(COLLAPSED_CLASS) ? 'remove' : 'add'
    for (const header of allHeaders) header.classList[addOrRemove](COLLAPSED_CLASS)

    // also collapse the corner
    const corner = component.root.querySelector('.pg-cell-wrapper--corner')
    corner.classList[addOrRemove]('pg-cell-wrapper--corner-collapsed')
  }

  toggleSortDialog(_bool) {
    const component = this
    const bool = _bool === 'true' ? true : !!_bool
    const dialog = component.root.querySelector('.pg-dialog--sort')
    const dialogContent = parseHTML(renderSortDialog(component))
    clearHTML(dialog)
    dialog.appendChild(dialogContent)
    if (bool) dialog.showModal()
    else dialog.close()
  }

  openEventDialog(encodedEvent) {
    const component = this

    // set event data
    const eventJSON = decodeURIComponent(encodedEvent)
    const event = JSON.parse(eventJSON)
    component.activeEvent = getActiveEvent(event)

    // show the dialog
    const dialog = component.root.querySelector('.pg-dialog--event')
    const dialogContent = parseHTML(renderEventDialog(component))
    clearHTML(dialog)
    dialog.appendChild(dialogContent)
    dialog.showModal()
  }

  closeEventDialog() {
    const component = this
    const dialog = component.root.querySelector('.pg-dialog--event')
    dialog.close()
  }

  selectActiveLocation(_location) {
    const component = this
    component.sortBy = 'location'
    component.activeLocation = _location
    component.toggleSortDialog(false) // close upon selection
    component.render()
  }

  selectActiveDay(event) {
    const component = this
    const activeDay = component.activeDay = event.target.value
    const timeString = component.activeTime.toLocaleTimeString()
    component.activeTime = new Date(`${activeDay} ${timeString}`)
  }

  selectActiveTime({ target }) {
    const component = this

    // validate the time and autocorrect
    if (target.min > target.value) target.value = target.min
    if (target.max < target.value) target.value = target.max
    const { interval } = component.times || DEFAULT_TIMES
    const [hr, mn] = target.value.split(':')
    const roundedMn = Math.round(mn / interval) * interval
    const newMn = String(roundedMn).length === 1 ? `0${roundedMn}` : roundedMn
    target.value = `${hr}:${newMn}`

    // set the time
    const { activeDay } = component
    const timeString = target.value
    component.activeTime = new Date(`${activeDay} ${timeString}`)
  }

  selectSortBy(sortBy) {
    const component = this
    component.view = 'guide'
    component.sortBy = sortBy
    component.toggleSortDialog(false) // close upon selection
    component.render()
  }

  changeSearch({ target }) {
    const component = this
    component.currentSearch = target.value
  }

  search(event) {
    event.preventDefault()
    const component = this
    const { currentSearch, events } = component

    // filter search results
    component.searchResults = events.filter(event =>
      search(currentSearch, event.name)
      || search(currentSearch, event.location)
      || search(currentSearch, event.host)
      || search(currentSearch, event.category)
      || search(currentSearch, event.description)
    )

    // sort name matches at the top
    component.searchResults.sort((prev, next) => {
      const prevName = search(currentSearch, prev.name)
      const nextName = search(currentSearch, next.name)
      return !prevName && nextName ? 1 : (prevName && !nextName ? -1 : 0)
    })

    // render search results
    component.sortBy = 'search'
    component.render()
  }

  registerDialogs() {
    const component = this
    const dialogs = component.root.querySelectorAll('.pg-dialog')
    for (const dialog of dialogs) dialogPolyfill.registerDialog(dialog)
  }
}

export default ProgramGuideNative
