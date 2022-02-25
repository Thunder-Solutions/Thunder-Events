import { getLocations, getEvents, getTimes } from './exports'
import { programGuideStyles } from './css'
import { clearHTML } from './utilities'

export class ProgramGuideNative extends HTMLElement {

  constructor() {

    // set up component
    super()
    const component = this
    component.root = component.attachShadow({ mode: 'open' })

    // initiate with loading spinner
    const loadingTemplate = document.createElement('template')
    const style = `<style>${component.dataset.css || programGuideStyles}</style>`
    loadingTemplate.innerHTML = `${style}<div class="pg-loading"></div>`
    component.root.appendChild(loadingTemplate.content.cloneNode(true))

    // asynchronously get data and render table
    getEvents().then(async events => {
      console.log(events)
      const times = await getTimes()
      const locations = await getLocations()
      const tableTemplate = document.createElement('template')
      tableTemplate.innerHTML = `
        ${style}
        <table class="pg-table">
          <thead class="pg-header">
            <tr class="pg-row">
              <td class="pg-cell-wrapper pg-cell-wrapper--corner">
                <div class="pg-cell pg-cell--corner"></div>
              </td>
              ${locations.map(location => `
                <th class="pg-cell-wrapper pg-cell-wrapper--column-header">
                  <div class="pg-cell pg-cell--column-header">${location}</div>
                </th>
              `)}
            </tr>
          </thead>
          <tbody class="pg-body">
            ${times.map(({ date, timeString }) => `
              <tr class="pg-row">
                <th class="pg-cell-wrapper pg-cell-wrapper--row-header">
                  <div class="pg-cell pg-cell--row-header">${timeString}</div>
                </th>
                ${locations.map(location => {
                  const event = events.find(e =>
                    Number(e.start) === Number(date)
                    && e.location === location)
                  const cellType = event ? 'data' : 'data-empty'
                  return `
                    <td class="pg-cell-wrapper pg-cell-wrapper--${cellType}" rowspan="1">
                      <div class="pg-cell pg-cell--${cellType}">${event ? event.name : ''}</div>
                    </td>
                  `
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
