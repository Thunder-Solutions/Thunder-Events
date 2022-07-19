import { clearHTML, parseHTML } from '../../../utilities'
import { getActiveEvent } from '../componentUtils'
import { renderEventDialog } from '../render'

export default ({ component }) => () => {
  const element = component.root.querySelector('.pg-table')
  const cloned = element.cloneNode(true)
  const style = document.createElement('style')
  style.textContent = /* css */`
    @media print {
      body *:not(.printable, .printable *) {
        display: none;
      }
      body * {
        all: revert;
        text-align: center;
      }
      .pg-table {
        border: 0.1rem solid;
        border-collapse: collapse;
      }
      .pg-table * {
        padding: 0.2rem;
      }
      .pg-cell-wrapper--data {
        border: 0.1rem solid;
      }
    }
  `
  document.body.appendChild(style)
  document.body.appendChild(cloned)
  cloned.classList.add('printable')
  setTimeout(() => {
    window.print()
    document.body.removeChild(style)
    document.body.removeChild(cloned)
  })
}
