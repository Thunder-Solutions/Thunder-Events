import { getLocations, getEvents, getTimes, getFavorites, addFavorite, removeFavorite } from '../../exports'
import { getStyles } from './getStyles'
import { clearHTML, getDateInfo, getEventId, search } from '../../utilities'
import { DEFAULT_BREAKPOINT, DEFAULT_EVENT, DEFAULT_TIMES } from '../../constants'
import { getActiveEvent } from './componentUtils'
import renderSortDialog from './renderSortDialog'
import renderEventDialog from './renderEventDialog'
import renderByLocation from './renderByLocation'
import renderByTime from './renderByTime'
import renderFavorites from './renderFavorites'
import renderSearchBar from './renderSearchBar'
import renderSearchResults from './renderSearchResults'

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
    component.sortDialogOpen = false
    component.eventDialogOpen = false
    component.sortBy = 'location' // location | allTime | now | nowOnly | time | favorites
    component.favorites = []
    component.currentSearch = ''
    component.searchResults = []

    // render loading spinner
    component.render({ loading: true })

    // asynchronously get data and render table
    getLocations().then(async locations => {

      // set the default active location for mobile view
      component.events = await getEvents()
      component.times = await getTimes()
      component.favorites = await getFavorites()
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

  toggleHeaders({ target }) {
    const component = this

    // do not rerender, because it will reset the scroll
    const allHeaders = component.root.querySelectorAll('.pg-cell-wrapper--row-header')
    const COLLAPSED_CLASS = 'pg-cell-wrapper--row-header-collapsed'
    const addOrRemove = target.classList.contains(COLLAPSED_CLASS) ? 'remove' : 'add'
    for (const header of allHeaders) {
      console.log(addOrRemove)
      header.classList[addOrRemove](COLLAPSED_CLASS)
    }

    // also collapse the corner
    const corner = component.root.querySelector('.pg-cell-wrapper--corner')
    corner.classList[addOrRemove]('pg-cell-wrapper--corner-collapsed')
  }

  toggleSortDialog(_bool) {
    const component = this
    const bool = _bool === 'true' ? true : !!_bool
    component.sortDialogOpen = bool
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

    // scroll to the event where user left off
    const eventEl = component.root.getElementById(getEventId(component.activeEvent))
    if (eventEl) eventEl.scrollIntoView()
  }

  selectActiveLocation(_location) {
    const component = this
    component.sortBy = 'location'
    component.activeLocation = _location
    component.sortDialogOpen = false // close upon selection
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
    component.sortBy = sortBy
    component.sortDialogOpen = false // close upon selection
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

    // rewrite the template HTML
    const tableTemplate = document.createElement('template')
    tableTemplate.innerHTML = /* html */`
      <style>${style}</style>
      ${renderSearchBar(component)}
      ${renderTable(component)}
      ${renderSortDialog(component)}
      ${renderEventDialog(component)}
    `
    component.root.appendChild(tableTemplate.content.cloneNode(true))
    return true // success
  }
}

export default ProgramGuideNative
