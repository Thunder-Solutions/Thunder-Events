import { mapString, runMethod } from '../../utilities'

const renderSortDialog = ({ locationDialogOpen, locations }) => /* html */`
  <dialog class="pg-dialog" ${locationDialogOpen ? 'open' : ''}>
    <section class="pg-dialog-body">
      <header class="pg-dialog-header">
        <h1 class="pg-dialog-title">Choose a Location...</h1>
        <button class="pg-dialog-close" onclick="${runMethod('toggleLocationDialog', false)}">&times;</button>
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
