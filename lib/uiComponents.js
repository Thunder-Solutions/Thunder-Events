import { getLocations, getEvents } from './exports'

class ProgramGuide extends HTMLElement {

  constructor() {
    super()
    const component = this
    const template = this.template = document.createElement('template')
    const style = this.style = `
      <style>
        ${component.dataset.css || `
          .pg-table {
            --font: sans-serif 1.5rem;
            --font-cell: var(--font);
            --font-header: var(--font);
            --font-column-header: var(--font-header);
            --font-row-header: var(--font-header);
            --padding-cell: 1rem 2rem;
            --padding-header: var(--padding-cell);
            --padding-column-header: var(--padding-header);
            --padding-row-header: var(--padding-header);
            --color-background: midnightblue;
            --color-cell: lightsteelblue;
            --color-cell-empty: transparent;
            --color-cell-content: black;
            --color-header: steelblue;
            --color-header-content: white;
            --color-column-header: var(--color-header);
            --color-column-header-content: var(--color-header-content);
            --color-row-header: var(--color-header);
            --color-row-header-content: var(--color-header-content);
            --color-corner: var(--color-header);
            background-color: var(--color-background);
          }
          .pg-cell-wrapper {
            background-color: var(--color-cell);
            font: var(--font-cell);
            padding: var(--padding-cell);
            text-align: center;
          }
          .pg-cell-wrapper--corner {
            background-color: var(--color-corner);
          }
          .pg-cell-wrapper--row-header {
            background-color: var(--color-row-header);
            color: var(--color-row-header-content);
            font: var(--font-row-header);
            padding: var(--padding-row-header);
          }
          .pg-cell-wrapper--column-header {
            background-color: var(--color-column-header);
            color: var(--color-column-header-content);
            font: var(--font-column-header);
            padding: var(--padding-column-header);
          }
          .pg-cell-wrapper--data-empty {
            background-color: var(--color-cell-empty);
          }
        `}
      </style>
    `
    template.innerHTML = `
      ${style}
      <div class="loading"></div>
    `
    component.root = component.attachShadow({ mode: 'open' })
    component.root.appendChild(template.content.cloneNode(true))
  }

  async connectedCallback() {
    const locations = await getLocations()
    const events = await getEvents()
    this.template.innerHTML = `
      ${this.style}
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
  }
}

customElements.define('program-guide', ProgramGuide)
