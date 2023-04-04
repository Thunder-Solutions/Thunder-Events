import { getLocations, getEvents, getTimes, getFavorites, getHiddenLocations, getFloorPlan } from '../../thunderEvents'
import { getDateInfo, compareDates, getToday } from '../../utilities'
import { DEFAULT_EVENT, DEFAULT_TIMES } from '../../constants'
import { getActiveEvent } from './componentUtils'
import { getRender } from './render'
import {
  getAddFavorite,
  getHandleEsc,
  getHandleHashChange,
  getRemoveFavorite,
  getToggleHiddenLocation,
  getToggleAllHiddenLocations,
  getShowFloorPlan,
  getOpenEventDialog,
  getToggleFloorPlanInteractive,
  gettoggleMainMenu,
  getCloseEventDialog,
  getSelectActiveLocation,
  getSelectActiveDay,
  getSelectActiveTime,
  getSelectSortBy,
  getChangeSearch,
  getSearch,
  getToggleHeaders,
  getShowFloorPlanMessage,
  getMaximize,
  getUndoStateChange,
  getPrint,
} from './actions'
import HTMLElement from '../HTMLElement'

// A native web component for the main event schedule
class ProgramGuideNative extends HTMLElement {

  // the initial state is never reflected in the UI;
  // a loading spinner is rendered instead.
  #state = {
    prevState: [],
    locations: [],
    events: [],
    times: DEFAULT_TIMES,
    activeDay: '',
    activeTime: new Date(),
    activeLocation: '',
    activeEvent: getActiveEvent(DEFAULT_EVENT),
    sortBy: 'location', // location | allTime | now | nowOnly | time | favorites | list
    view: 'guide', // guide | floorPlan
    marker: 'none', // one of the provided location names or 'none'
    favorites: [],
    hiddenLocations: [],
    currentSearch: '',
    searchResults: [],
    hasFloorPlan: false,
    floorPlan: {},
    floorPlanInteractive: false,
    maximized: false,
  }

  // cache to avoid unnecessary reloading
  templateCache = {
    floorPlanImage: Image ? new Image() : null,
  }

  constructor() {
    super()

    // avoid any client-side concerns in Node
    if (typeof window === 'undefined') return

    const component = this
    component.root = component.attachShadow({ mode: 'open' })

    // assign action methods from other files
    const actionMap = {
      render: getRender,
      handleEsc: getHandleEsc,
      handleHashChange: getHandleHashChange,
      addFavorite: getAddFavorite,
      removeFavorite: getRemoveFavorite,
      toggleHiddenLocation: getToggleHiddenLocation,
      toggleAllHiddenLocations: getToggleAllHiddenLocations,
      showFloorPlan: getShowFloorPlan,
      toggleFloorPlanInteractive: getToggleFloorPlanInteractive,
      toggleHeaders: getToggleHeaders,
      toggleMainMenu: gettoggleMainMenu,
      openEventDialog: getOpenEventDialog,
      closeEventDialog: getCloseEventDialog,
      selectActiveLocation: getSelectActiveLocation,
      selectActiveDay: getSelectActiveDay,
      selectActiveTime: getSelectActiveTime,
      selectSortBy: getSelectSortBy,
      changeSearch: getChangeSearch,
      search: getSearch,
      showFloorPlanMessage: getShowFloorPlanMessage,
      maximize: getMaximize,
      undoStateChange: getUndoStateChange,
      print: getPrint,
    }
    for (const actionName in actionMap) {
      const action = actionMap[actionName]
      component[actionName] = component.provideState(action)
    }

    // render loading spinner
    component.render({ initializing: true })

    // asynchronously fetch data and update internal state
    component.waitForFetch = getLocations().then(async locations => {

      // the initial results of the async data fetcher
      const programGuideData = {
        events: await getEvents(),
        times: await getTimes(),
        favorites: await getFavorites(),
        hiddenLocations: await getHiddenLocations(),
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
      const activeDay = getToday(programGuideData)
      const firstTime = days[activeDay][0].date
      const { date, time } = getDateInfo(firstTime)

      // update the data and replace the loading spinner with the real element
      component.setState({
        ...programGuideData,
        activeLocation: locations[0],
        activeDay,
        activeTime: new Date(`${date} ${time}`),
        hasFloorPlan: !!imageSrc,
      }, {
        pushState: false,
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

  async setState(state, options = {}) {
    const _options = {
      render: true,
      pushState: true,
      ...options,
    }
    const component = this
    const prevState = { ...component.#state }
    component.#state = {
      ...prevState,
      ...state,
      ...(_options.pushState ? { prevState: [
        ...component.#state.prevState,
        prevState,
      ] } : {}),
    }
    if (_options.render) await component.render()
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
