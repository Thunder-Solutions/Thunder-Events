import { clearHTML } from '../../../utilities'

const cloneTable = (table, cols) => {
  const thead = table.querySelector('thead')
	const tbody = table.querySelector('tbody')
  const clone = table.cloneNode(true)
  const cloneHeadRow = clone.querySelector('thead > tr')
  const cloneBodyRows = clone.querySelectorAll('tbody > tr')
  const allHeaders = thead.querySelectorAll('th')
  const allColumns = [...allHeaders].map(e => e.textContent.trim())
  const allRows = tbody.querySelectorAll('tr')
  
  // clone table head
  const { firstElementChild } = cloneHeadRow
  clearHTML(cloneHeadRow)
  cloneHeadRow.appendChild(firstElementChild)
  for (const idx in allHeaders) {
    const th = allHeaders[idx]
  	if (+idx < cols) cloneHeadRow.appendChild(th)
  }

  // clone table body
  for (const idx in [...allRows]) {
    const tr = allRows[idx]
    const cloneTr = cloneBodyRows[idx]
    const th = tr.querySelector('th')
    const allCells = tr.querySelectorAll('td')
  	clearHTML(cloneTr)
    cloneTr.appendChild(th.cloneNode(true))
    for (const cellIdx in [...allCells]) {
      const cell = allCells[cellIdx]
      const colIdx = allColumns.findIndex(c => c === cell.dataset.column)
      if (colIdx < cols) cloneTr.appendChild(cell)
    }
  }
  return clone
}

const divideIntoChunks = (table, cols, chunks = []) => {
  const container = table.parentElement
  const thead = table.querySelector('thead')
  const { length } = thead.querySelectorAll('th')
  if (length > cols) {
    const clone = cloneTable(table, cols)
    container.insertBefore(clone, table)
    return divideIntoChunks(table, cols, [clone, ...chunks])
  }
  return [table, ...chunks]
}

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
        page-break-inside: avoid;
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
  const chunks = divideIntoChunks(cloned, 16)
  setTimeout(() => {
    window.print()
    document.body.removeChild(style)
    for (const chunk of chunks) {
      document.body.removeChild(chunk)
    }
  })
}
