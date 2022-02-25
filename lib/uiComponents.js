import { getLocations, getEvents, getTimes } from './exports'
import { programGuideStyles } from './css'
import { clearHTML, mapString, WholeNumber } from './utilities'

export class ProgramGuideNative extends HTMLElement {

  constructor() {

    // set up component
    super()
    const component = this
    component.root = component.attachShadow({ mode: 'open' })

    // render loading spinner
    const loadingTemplate = document.createElement('template')
    loadingTemplate.innerHTML = `
      <style>${component.dataset.css || programGuideStyles}</style>
      <div class="pg-loading"></div>
    `
    component.root.appendChild(loadingTemplate.content.cloneNode(true))

    // asynchronously get data and render table
    getEvents().then(async events => {
      const { times, interval } = await getTimes()
      const locations = await getLocations()
      const tableTemplate = document.createElement('template')

      // this keeps rowspans from previous iterations in memory
      // so we can avoid adding extra table cells.
      const rowState = {}

      // render the table
      tableTemplate.innerHTML = `
        <style>${component.dataset.css || programGuideStyles}</style>
        <table class="pg-table">
          <thead class="pg-header">
            <tr class="pg-row">
              <td class="pg-cell-wrapper pg-cell-wrapper--corner">
                <div class="pg-cell pg-cell--corner"></div>
              </td>
              ${mapString(locations, location => `
                <th class="pg-cell-wrapper pg-cell-wrapper--column-header">
                  <div class="pg-cell pg-cell--column-header">${location}</div>
                </th>
              `)}
            </tr>
          </thead>
          <tbody class="pg-body">
            ${mapString(times, ({ date, timeString }) => `
              <tr class="pg-row">
                <th class="pg-cell-wrapper pg-cell-wrapper--row-header">
                  <div class="pg-cell pg-cell--row-header">${timeString}</div>
                </th>
                ${mapString(locations, location => {
                  const event = events.find(e =>
                    Number(e.start) === Number(date)
                    && e.location === location)
                  const cellType = event ? 'data' : 'data-empty'
                  const duration = event ? WholeNumber((event.end - event.start) / 1000 / 60) : 0
                  const rowspan = duration ? WholeNumber(duration / interval) : 1
                  if (rowState[location]) {
                    --rowState[location]
                    return ''
                  } else {
                    if (rowspan > 1) rowState[location] = rowspan
                    return `
                      <td class="pg-cell-wrapper pg-cell-wrapper--${cellType}" rowspan="${rowspan}">
                        <div class="pg-cell pg-cell--${cellType}">${event ? event.name : ''}</div>
                      </td>
                    `
                  }
                })}
              </tr>
            `)}
          </tbody>
        </table>
      `
      clearHTML(component.root)
      component.root.appendChild(tableTemplate.content.cloneNode(true))
    })
  }
}
