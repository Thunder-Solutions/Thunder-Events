import { runMethod } from '../../../utilities'

const renderMenu = () => /* html */`
  <menu class="pg-main-menu">
    <button class="pg-main-menu-button" onclick="${runMethod('undoStateChange')}">
      <i class="pg-prev-icon">&xlarr;</i>
      <span>Back</span>
    </button>
    <button class="pg-main-menu-button" onclick="${runMethod('toggleSortDialog', true)}">
      <i class="pg-more-icon"></i>
      <span>Menu</span>
    </button>
    <button class="pg-main-menu-button" onclick="${runMethod('showFloorPlan', 'none')}">
      <i class="pg-map-icon"></i>
      <span>Map</span>
    </button>
    <button class="pg-main-menu-button" onclick="${runMethod('selectSortBy', 'favorites')}">
      <i class="pg-favorite-icon">&starf;</i>
      <span>Favorites</span>
    </button>
    <button class="pg-main-menu-button" onclick="${runMethod('print')}">
      <i class="pg-print-icon"></i>
      <span>Print</span>
    </button>
  </menu>
`

export default renderMenu
