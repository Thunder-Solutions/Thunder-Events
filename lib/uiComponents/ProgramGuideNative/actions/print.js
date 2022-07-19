import { clearHTML, parseHTML } from '../../../utilities'
import { getActiveEvent } from '../componentUtils'
import { renderEventDialog } from '../render'

export default ({ component }) => () => {
  const element = component.root.querySelector('.pg-table')
  const cloned = element.cloneNode(true)
  const style = document.createElement('style')
  style.textContent = /* css */`
    @media print {
      body {
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact
      }
      body *:not(.printable, .printable *) {
        display: none;
      }
      body * {
        all: revert;
        font-size: 1vmin;
        text-align: center;
      }
      .pg-table {
        border: 0.1rem solid;
        border-collapse: collapse;
      }
      .pg-table * {
        padding: 0.2rem;
      }
      .pg-row:nth-child(odd) {
        background-color: #eee;
      }
      .pg-row:nth-child(even) {
        background-color: #ddd;
      }
      .pg-cell-wrapper--data {
        background-color: #fff;
        border: 0.1rem solid;
      }
      .pg-cell-wrapper--corner,
      .pg-cell-wrapper--column-header,
      .pg-cell-wrapper--row-header {
        background-color: #555;
        color: #fff;
      }
      @page {
        size: A3 landscape;
        margin: 0.05in;
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
