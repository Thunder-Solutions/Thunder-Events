import { getLocations, getEvents, getTimes, getFavorites, getFloorPlan } from '../../exports'
import { getDateInfo } from '../../utilities'
import { DEFAULT_EVENT, DEFAULT_TIMES } from '../../constants'
import { getActiveEvent } from './componentUtils'
import { getRender } from './render'
import {
  getAddFavorite,
  getHandleEsc,
  getHandleHashChange,
  getRemoveFavorite,
  getShowFloorPlan,
  getOpenEventDialog,
  getToggleFloorPlanInteractive,
  getToggleSortDialog,
  getCloseEventDialog,
  getSelectActiveLocation,
  getSelectActiveDay,
  getSelectActiveTime,
  getSelectSortBy,
  getChangeSearch,
  getSearch,
  getToggleHeaders,
} from './actions'

// A native web component for the main event schedule
class ProgramGuideNative extends HTMLElement {

  // the initial state is never reflected in the UI;
  // a loading spinner is rendered instead.
  #state = {
    locations: [],
    events: [],
    times: DEFAULT_TIMES,
    activeDay: '',
    activeTime: new Date(),
    activeLocation: '',
    activeEvent: getActiveEvent(DEFAULT_EVENT),
    sortBy: 'location', // location | allTime | now | nowOnly | time | favorites
    view: 'guide', // guide | floorPlan
    favorites: [],
    currentSearch: '',
    searchResults: [],
    floorPlan: {},
    floorPlanInteractive: false,
  }

  // cache to avoid unnecessary reloading
  templateCache = {
    floorPlanImage: new Image(),
  }

  constructor() {
    super()
    const component = this
    component.root = component.attachShadow({ mode: 'open' })

    // actions
    const provideState = component.provideState.bind(component)
    component.render = provideState(getRender)
    component.handleEsc = provideState(getHandleEsc)
    component.handleHashChange = provideState(getHandleHashChange)
    component.addFavorite = provideState(getAddFavorite)
    component.removeFavorite = provideState(getRemoveFavorite)
    component.showFloorPlan = provideState(getShowFloorPlan)
    component.toggleFloorPlanInteractive = provideState(getToggleFloorPlanInteractive)
    component.toggleHeaders = provideState(getToggleHeaders)
    component.toggleSortDialog = provideState(getToggleSortDialog)
    component.openEventDialog = provideState(getOpenEventDialog)
    component.closeEventDialog = provideState(getCloseEventDialog)
    component.selectActiveLocation = provideState(getSelectActiveLocation)
    component.selectActiveDay = provideState(getSelectActiveDay)
    component.selectActiveTime = provideState(getSelectActiveTime)
    component.selectSortBy = provideState(getSelectSortBy)
    component.changeSearch = provideState(getChangeSearch)
    component.search = provideState(getSearch)

    // render loading spinner
    component.render({ loading: true })

    // asynchronously fetch data and update internal state
    component.waitForFetch = getLocations().then(async locations => {

      // the initial results of the async data fetcher
      const programGuideData = {
        events: await getEvents(),
        times: await getTimes(),
        favorites: await getFavorites(),
        floorPlan: await getFloorPlan(),
        locations: locations,
      }

      // load floor plan image and store it in the cache
      const { floorPlanImage } = component.templateCache
      const { imageSrc, dimensions } = programGuideData.floorPlan
      const { height, width } = dimensions
      floorPlanImage.className = 'pg-floor-plan-image'
      floorPlanImage.src = imageSrc
      floorPlanImage.height = height
      floorPlanImage.width = width

      // derive the active date and time from the earliest date in the data
      const { days } = programGuideData.times || DEFAULT_TIMES
      const activeDay = Object.keys(days)[0]
      const firstTime = days[activeDay][0].date
      const { date, time } = getDateInfo(firstTime)

      // update the data and replace the loading spinner with the real element
      component.setState({
        ...programGuideData,
        activeLocation: locations[0],
        activeDay,
        activeTime: new Date(`${date} ${time}`),
      })
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

  setState(state, options = { render: true }) {
    const component = this
    component.#state = {
      ...component.#state,
      ...state,
    }
    if (options.render) component.render()
    return { ...component.#state }
  }

  provideState(getCallback) {
    const component = this
    return (...args) => {
      const state = { ...component.#state }
      const setState = component.setState.bind(component)
      const callback = getCallback({ state, setState, component })
      return callback(...args)
    }
  }
}

export default ProgramGuideNative
