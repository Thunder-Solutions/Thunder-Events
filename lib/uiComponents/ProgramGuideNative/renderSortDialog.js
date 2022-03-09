import { mapString, runMethod } from '../../utilities'

const renderSortDialog = ({ sortDialogOpen, locations }) => /* html */`
  <dialog class="pg-dialog" ${sortDialogOpen ? 'open' : ''}>
    <section class="pg-dialog-body">
      <header class="pg-dialog-header">
        <h1 class="pg-dialog-title">Choose a Location...</h1>
        <button class="pg-dialog-close" onclick="${runMethod('toggleSortDialog', false)}">&times;</button>
      </header>
      <section class="pg-dialog-content">
        <menu class="pg-dialog-menu">
          ${mapString(locations, _location => /* html */`
            <button class="pg-dialog-menu-item" onclick="${runMethod('selectActiveLocation', _location)}">${_location}</button>
          `)}
        </menu>
      </section>
    </section>
  </dialog>
`

export default renderSortDialog
