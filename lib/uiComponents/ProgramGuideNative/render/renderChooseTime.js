import { DEFAULT_TIMES } from '../../../constants'
import { runMethod } from '../../../utilities'

const renderChooseTime = ({ floorPlan, times, activeTime: _activeTime }) => {

  const { title } = floorPlan
  const { interval } = times || DEFAULT_TIMES
  const step = interval * 60
  const getTimeValue = date => date.toLocaleTimeString([], { hour12: false, timeStyle: 'short' })
  const activeTime = getTimeValue(_activeTime)

  return /* html */`
    <section class="pg-dialog-body">
      <header class="pg-dialog-header">
        <h1 class="pg-dialog-title">Choose a Time</h1>
        <button class="pg-dialog-close" title="Close" onclick="${runMethod('toggleChooseTime', false)}"><i class="pg-close-icon" title="Close"></i></button>
      </header>
      <section class="pg-dialog-content">
        <menu class="pg-dialog-menu">
          <h2 class="pg-dialog-menu-title">${title}</h2>
          <div class="pg-dialog-menu-item pg-dialog-menu-item--input">
            <input
              type="time"
              class="pg-dialog-menu-input pg-dialog-menu-input--time"
              value="${activeTime}"
              step="${step}"
              onchange="${runMethod('selectActiveTime')}"
            />
          </div>
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
