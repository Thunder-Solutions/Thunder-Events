import { DEFAULT_TIMES } from '../../../constants'
import { mapString, runMethod } from '../../../utilities'

const renderChooseDate = ({ times, activeTime: _activeTime }) => {

  // only show location list if the columns are collapsed
  const { days } = times || DEFAULT_TIMES

  return /* html */`
    <section class="pg-dialog-body">
      <header class="pg-dialog-header">
        <h1 class="pg-dialog-title">Choose a Date</h1>
        <button class="pg-dialog-close" title="Close" onclick="${runMethod('toggleChooseDate', false)}"><i class="pg-close-icon" title="Close"></i></button>
      </header>
      <section class="pg-dialog-content">
        <menu class="pg-dialog-menu">
          ${mapString(Object.keys(days), day => /* html */`
            <button class="pg-dialog-menu-item" value="${day}" onclick="${runMethod('selectActiveDay')}">
              <i class="pg-date-icon"></i>
              <span>${day}</span>
            </button>
          `)}
        </menu>
      </section>
    </section>
  `
}

export default renderChooseDate
