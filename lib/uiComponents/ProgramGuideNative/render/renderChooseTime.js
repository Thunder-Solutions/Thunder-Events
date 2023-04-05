import { mapString, runMethod, parseLocationHash } from '../../../utilities'

const renderChooseTime = ({ floorPlan }) => {

  const { title } = floorPlan

  return /* html */`
    <section class="pg-dialog-body">
      <header class="pg-dialog-header">
        <h1 class="pg-dialog-title">Choose a Time</h1>
        <button class="pg-dialog-close" title="Close" onclick="${runMethod('toggleChooseTime', false)}"><i class="pg-close-icon" title="Close"></i></button>
      </header>
      <section class="pg-dialog-content">
        <menu class="pg-dialog-menu">
          <h2 class="pg-dialog-menu-title">${title}</h2>
          <input type="time">
          <a class="pg-dialog-menu-item" href="#">
            <i class="pg-schedule-icon"></i>
            <span>Jump to this time</span>
          </a>
        </menu>
        <p class="pg-dialog-paragraph">* This will jump the scrollbar to a time on the schedule, but it will not filter times. You can filter times from the main menu.</p>
        <p class="pg-dialog-paragraph">* To choose a different date, use the calendar icon at the top of the program guide.</p>
      </section>
    </section>
  `
}

export default renderChooseTime
