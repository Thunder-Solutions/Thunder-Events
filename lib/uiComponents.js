import { getLocations, getEvents } from './exports'
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
            <tr class="pg-row">
              <th class="pg-cell-wrapper pg-cell-wrapper--row-header">
                <div class="pg-cell pg-cell--row-header">12:00 PM</div>
              </th>
              <td class="pg-cell-wrapper pg-cell-wrapper--data" rowspan="2">
                <div class="pg-cell pg-cell--data">Event 1</div>
              </td>
              <td class="pg-cell-wrapper pg-cell-wrapper--data">
                <div class="pg-cell pg-cell--data">Event 5</div>
              </td>
            </tr>
            <tr class="pg-row">
              <th class="pg-cell-wrapper pg-cell-wrapper--row-header">
                <div class="pg-cell pg-cell--row-header">1:00 PM</div>
              </th>
              <td class="pg-cell-wrapper pg-cell-wrapper--data">
                <div class="pg-cell pg-cell--data">Event 6</div>
              </td>
            </tr>
            <tr class="pg-row">
              <th class="pg-cell-wrapper pg-cell-wrapper--row-header">
                <div class="pg-cell pg-cell--row-header">2:00 PM</div>
              </th>
              <td class="pg-cell-wrapper pg-cell-wrapper--data pg-cell-wrapper--data-empty">
                <div class="pg-cell pg-cell--data pg-cell--data-empty"></div>
              </td>
              <td class="pg-cell-wrapper pg-cell-wrapper--data">
                <div class="pg-cell pg-cell--data">Event 7</div>
              </td>
            </tr>
            <tr class="pg-row">
              <th class="pg-cell-wrapper pg-cell-wrapper--row-header">
                <div class="pg-cell pg-cell--row-header">3:00 PM</div>
              </th>
              <td class="pg-cell-wrapper pg-cell-wrapper--data">
                <div class="pg-cell pg-cell--data">Event 4</div>
              </td>
              <td class="pg-cell-wrapper pg-cell-wrapper--data">
                <div class="pg-cell pg-cell--data">Event 8</div>
              </td>
            </tr>
          </tbody>
        </table>
      `
      clearHTML(component.root)
      component.root.appendChild(tableTemplate.content.cloneNode(true))
    })
  }
}
