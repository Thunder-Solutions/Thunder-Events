import { DEFAULT_BREAKPOINT } from '../../../constants'
import { getStyles } from '../getStyles'
import { default as renderMainMenu } from './renderMainMenu'
import { default as renderEventDialog } from './renderEventDialog'
import { default as renderByLocation } from './renderByLocation'
import { default as renderFavorites } from './renderFavorites'
import { default as renderSearchBar } from './renderSearchBar'
import { default as renderSearchResults } from './renderSearchResults'
import { default as renderFloorPlan } from './renderFloorPlan'
import { default as renderAsList } from './renderAsList'
import { default as renderChooseLocation } from './renderChooseLocation'
import { default as renderChooseTime } from './renderChooseTime'
import { default as renderChooseDate } from './renderChooseDate'
import dialogPolyfill from './dialog-polyfill' // will be replaced by npm package soon, see file for details
import { clearHTML, runMethod } from '../../../utilities'
import renderNavBar from './renderNavBar'

const getRender = ({ state, setState, component }) => async ({ initializing } = {}) => {
  const { root, dataset, templateCache } = component

  // clear previously rendered content
  clearHTML(root)

  // get style
  const { css, breakpoint } = dataset
  const style = css || getStyles(breakpoint || DEFAULT_BREAKPOINT)

  // render loading spinner if necessary
  const loadingTemplate = document.createElement('template')
  loadingTemplate.innerHTML = /* html */`
    <style>${style}</style>
    <section id="ProgramGuide" class="pg-body ${state.maximized ? 'pg-maximized' : ''}">
      <div class="pg-loading"></div>
    </section>
  `
  root.appendChild(loadingTemplate.content.cloneNode(true))

  if (initializing) return true // successfully loaded data

  // This assures renders happen at the end of the current event loop
  await new Promise(resolve => { requestAnimationFrame(() => { resolve() }) })

  // determine which render method to use
  const renderMap = {
    location: renderByLocation,
    favorites: renderFavorites,
    search: renderSearchResults,
    list: renderAsList,
  }
  const _sortBy = ['now', 'time', 'allTime'].includes(state.sortBy) ? state.sortPref : state.sortBy
  const renderTable = renderMap[_sortBy]
  const showFloorPlan = state.view === 'floorPlan'

  // rewrite the template HTML
  const tableTemplate = document.createElement('template')
  tableTemplate.innerHTML = /* html */`
    <style>
      /* typical browser defaults for dialog polyfill */
      dialog + .backdrop { position: fixed; top: 0; right: 0; bottom: 0; left: 0; background: rgba(0, 0, 0, 0.1); }
      ${style}
    </style>
    <section id="ProgramGuide" class="pg-body ${state.maximized ? 'pg-maximized' : ''}">
      <header class="pg-header">
        <button class="pg-bars-menu-button" onclick="${runMethod('toggleMainMenu', true)}">
          <i class="pg-more-icon" title="Main Menu"></i>
        </button>
        <div class="pg-header-main">
          <button class="pg-date-button" onclick="${runMethod('toggleChooseDate', true)}">
            <time class="pg-header-date" datetime="${state.activeTime}">${state.activeDay}</time>
            <div class="pg-header-button">
              <i class="pg-date-icon"></i>
              <span class="pg-button-label-text">Choose
Date</span>
            </div>
          </button>
          ${renderSearchBar(state)}
          <button class="pg-header-search-button" onclick="${runMethod('toggleSearch', true)}">
            <i class="pg-search-icon" title="Search"></i>
          </button>
        </div>
        <button class="pg-maximize-button" onclick="${runMethod('maximize')}">
          ${state.maximized
            ? /* html */`<i class="pg-restore-icon" title="Exit Full Screen"></i>`
            : /* html */`<i class="pg-fullscreen-icon" title="Full Screen"></i>`}
        </button>
      </header>
      ${showFloorPlan
        ? renderFloorPlan(state, setState, component)
        : renderTable(state)
      }
      ${renderNavBar(state)}
    </section>
    <dialog class="pg-dialog pg-dialog--main-menu">${renderMainMenu(state, component)}</dialog>
    <dialog class="pg-dialog pg-dialog--event">${renderEventDialog(state, component)}</dialog>
    <dialog class="pg-dialog pg-dialog--location">${renderChooseLocation(state)}</dialog>
    <dialog class="pg-dialog pg-dialog--time">${renderChooseTime(state)}</dialog>
    <dialog class="pg-dialog pg-dialog--date">${renderChooseDate(state)}</dialog>
  `
  clearHTML(root) // clear loading spinner
  root.appendChild(tableTemplate.content.cloneNode(true))

  const dialogs = root.querySelectorAll('.pg-dialog')
  for (const dialog of dialogs) {

    // register dialogs with the polyfill
    dialogPolyfill.registerDialog(dialog)

    // always rerender when closing dialogs
    if (!dialog.classList.contains('pg-dialog--event')) {
      dialog.addEventListener('close', component.render)
    }
  }

  if (state.view === 'guide') {

    // handle scrolling within the table
    const wrapper = root.querySelector('.pg-table-wrapper')
    const handleScroll = () => {
      const SCROLLED_CLASS = 'pg-table-wrapper--scrolled'
      const needsClass = wrapper.scrollLeft > 0 && !wrapper.classList.contains(SCROLLED_CLASS)
      if (needsClass) wrapper.classList.add(SCROLLED_CLASS)
      if (wrapper.scrollLeft === 0) wrapper.classList.remove(SCROLLED_CLASS)
    }
    wrapper.addEventListener('scroll', handleScroll)
  } else if (state.view === 'floorPlan') {

    // replace placeholder <img> with the real one stored in memory
    // (this allows the image to load prior to viewing the map, and
    // prevents unnecessary reloading of the image)
    const image = root.querySelector('.pg-floor-plan-image')
    image.replaceWith(templateCache.floorPlanImage)

    // scroll marker into view if necessary
    const marker = root.querySelector('.pg-floor-plan-marker')
    if (marker) marker.scrollIntoView({ block: 'end' })
  }

  // scroll to an element after fully rendering
  if (state.scrollTo !== '') {
    requestAnimationFrame(() => {
      component.root.querySelector(state.scrollTo)?.scrollIntoView()

      // offset beyond the header
      const wrapperEl = component.root.querySelector('.pg-table-wrapper')
      const headerEl = component.root.querySelector('.pg-cell-wrapper--column-header')
      const { height } = headerEl.getBoundingClientRect()
      const needsOffset = wrapperEl.scrollHeight - Math.ceil(wrapperEl.scrollTop + wrapperEl.offsetHeight) > height
      if (needsOffset) wrapperEl.scrollTop -= height

      // reset the scrollTo state so it doesn't repeatedly scroll every render
      setState({ scrollTo: '' }, { render: false, pushState: false })
    })
  }

  return true // success
}

export {
  renderMainMenu,
  renderEventDialog,
  renderChooseLocation,
  renderChooseTime,
  renderChooseDate,
  getRender,
}
