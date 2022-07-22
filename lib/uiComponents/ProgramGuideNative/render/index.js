import { DEFAULT_BREAKPOINT } from '../../../constants'
import { getStyles } from '../getStyles'
import { default as renderSortDialog } from './renderSortDialog'
import { default as renderDateDialog } from './renderDateDialog'
import { default as renderEventDialog } from './renderEventDialog'
import { default as renderByLocation } from './renderByLocation'
import { default as renderByTime } from './renderByTime'
import { default as renderFavorites } from './renderFavorites'
import { default as renderSearchBar } from './renderSearchBar'
import { default as renderSearchResults } from './renderSearchResults'
import { default as renderFloorPlan } from './renderFloorPlan'
import { default as renderAsList } from './renderAsList'
import dialogPolyfill from './dialog-polyfill' // will be replaced by npm package soon, see file for details
import { clearHTML, runMethod } from '../../../utilities'
import renderMenu from './renderMenu'

const getRender = ({ state, component }) => async ({ loading, initializing } = {}) => {
  const { root, dataset, templateCache } = component

  // This assures renders happen at the end of the current event loop
  await new Promise(resolve => { setTimeout(() => { resolve() }) })

  // clear previously rendered content
  clearHTML(root)

  // get style
  const { css, breakpoint } = dataset
  const style = css || getStyles(breakpoint || DEFAULT_BREAKPOINT)

  // render loading spinner if necessary
  const loadingTemplate = document.createElement('template')
  loadingTemplate.innerHTML = /* html */`
    <style>${style}</style>
    <div class="pg-loading"></div>
  `
  root.appendChild(loadingTemplate.content.cloneNode(true))

  if (loading) return true // successfully loaded data

  // determine which render method to use
  const renderMap = {
    location: renderByLocation,
    time: renderByTime,
    allTime: renderByTime,
    now: renderByTime,
    nowOnly: renderByTime,
    favorites: renderFavorites,
    search: renderSearchResults,
    list: renderAsList,
  }
  const renderTable = renderMap[state.sortBy]
  const showFloorPlan = state.view === 'floorPlan'

  // rewrite the template HTML
  const tableTemplate = document.createElement('template')
  tableTemplate.innerHTML = /* html */`
    <style>
      /* typical browser defaults for dialog polyfill */
      dialog + .backdrop { position: fixed; top: 0; right: 0; bottom: 0; left: 0; background: rgba(0, 0, 0, 0.1); }
      ${style}
    </style>
    <section id="ProgramGuide" class="${state.maximized ? 'pg-maximized' : ''}">
      <header class="pg-header">
        ${renderSearchBar(state)}
        <button class="pg-maximize-button" onclick="${runMethod('maximize')}">${state.maximized ? 'Exit Full Screen' : 'Full Screen'}</button>
        ${renderMenu(state)}
      </header>
      ${showFloorPlan
        ? renderFloorPlan(state)
        : renderTable(state)
      }
    </section>
    <dialog class="pg-dialog pg-dialog--sort">${renderSortDialog(state, component)}</dialog>
    <dialog class="pg-dialog pg-dialog--date">${renderDateDialog(state)}</dialog>
    <dialog class="pg-dialog pg-dialog--event">${renderEventDialog(state)}</dialog>
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

  return true // success
}

export {
  renderSortDialog,
  renderDateDialog,
  renderEventDialog,
  getRender,
}
