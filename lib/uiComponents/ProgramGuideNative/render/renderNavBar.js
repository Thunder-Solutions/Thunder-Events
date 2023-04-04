import { runMethod } from '../../../utilities'

const renderNavBar = () => /* html */`
  <menu class="pg-nav-bar">
    <button class="pg-nav-bar-button" onclick="${runMethod('undoStateChange')}">
      <i class="pg-prev-icon"></i>
      <span>Back</span>
    </button>
    <button class="pg-nav-bar-button" onclick="${runMethod('selectSortBy', 'location')}">
      <i class="pg-schedule-icon"></i>
      <span>Schedule</span>
    </button>
    <button class="pg-nav-bar-button" onclick="${runMethod('showFloorPlan', 'none')}">
      <i class="pg-map-icon"></i>
      <span>Map</span>
    </button>
    <button class="pg-nav-bar-button" onclick="${runMethod('selectSortBy', 'favorites')}">
      <i class="pg-favorite-icon"></i>
      <span>Favorites</span>
    </button>
  </menu>
`

export default renderNavBar
