import { mapString, runMethod, parseLocationHash } from '../../../utilities'

const renderChooseLocation = ({ locations, floorPlan }) => {

  const { title } = floorPlan

  return /* html */`
    <section class="pg-dialog-body">
      <header class="pg-dialog-header">
        <h1 class="pg-dialog-title">Choose a Location</h1>
        <button class="pg-dialog-close" title="Close" onclick="${runMethod('toggleChooseLocation', false)}"><i class="pg-close-icon" title="Close"></i></button>
      </header>
      <section class="pg-dialog-content">
        <menu class="pg-dialog-menu">
          <h2 class="pg-dialog-menu-title">${title}</h2>
          <p class="pg-dialog-paragraph">Choose a location below.</p>
          ${mapString(locations, _location => /* html */`
            <a class="pg-dialog-menu-item" href="${parseLocationHash(_location)}">${_location}</a>
          `)}
        </menu>
        <p class="pg-dialog-paragraph">* Some locations may not appear, according to your settings. You can change your location filters from the main menu.</p>
      </section>
    </section>
  `
}

export default renderChooseLocation
