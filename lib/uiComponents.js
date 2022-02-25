import { getLocations, getEvents, getTimes } from './exports'
import { programGuideStyles } from './css'
import { clearHTML, mapString, WholeNumber } from './utilities'

// a small local utility to extract logic away from the template
const getCellData = ({ events, rowState, date, interval, location }) => {
  const event = events.find(e =>
    Number(e.start) === Number(date)
    && e.location === location)
  const eventName = event ? event.name : ''
  const cellType = event ? 'data' : 'data-empty'
  const duration = event ? WholeNumber((event.end - event.start) / 1000 / 60) : 0
  const rowspan = duration ? WholeNumber(duration / interval) : 1
  const blank = !!rowState[location]
  if (blank) --rowState[location]
  else if (rowspan > 1) rowState[location] = rowspan
  return { eventName, cellType, rowspan, blank }
}

// A native web component for the main event schedule
export class ProgramGuideNative extends HTMLElement {

  constructor() {

    // set up basic component needs
    super()
    const component = this
    component.root = component.attachShadow({ mode: 'open' })

    // component state
    component.activeLocation = ''

    // render loading spinner
    component.render({ loading: true })

    // asynchronously get data and render table
    getLocations().then(async locations => {

      // set the default active location for mobile view
      component.activeLocation = locations[0]

      // initial render
      component.render()
    })
  }

  async render({ loading } = {}) {
    const component = this

    // clear previously rendered content
    clearHTML(component.root)

    // get style
    const style = component.dataset.css || programGuideStyles

    // render loading spinner if necessary
    if (loading) {
      const loadingTemplate = document.createElement('template')
      loadingTemplate.innerHTML = /* html */`
        <style>${style}</style>
        <div class="pg-loading"></div>
      `
      component.root.appendChild(loadingTemplate.content.cloneNode(true))
      return true // success
    }

    // wait for data to fetch
    const events = await getEvents()
    const { days, interval } = await getTimes()
    const locations = await getLocations()

    // this keeps rowspans from previous iterations in memory
    // so we can avoid adding extra table cells.
    const rowState = {}

    // rewrite the template HTML
    const tableTemplate = document.createElement('template')
    tableTemplate.innerHTML = /* html */`
      <style>${style}</style>
      ${mapString(Object.keys(days), day => {
        const times = days[day]
        return /* html */`
          <table class="pg-table">
            <thead class="pg-header">
              <tr class="pg-row">
                <td class="pg-cell-wrapper pg-cell-wrapper--corner">
                  <div class="pg-cell pg-cell--corner">${day}</div>
                </td>
                ${mapString(locations, location => /* html */`
                  <th class="pg-cell-wrapper pg-cell-wrapper--column-header">
                    <div class="pg-cell pg-cell--column-header">${location}</div>
                  </th>
                `)}
              </tr>
            </thead>
            <tbody class="pg-body">
              ${mapString(times, ({ date, timeString }) => /* html */`
                <tr class="pg-row">
                  <th class="pg-cell-wrapper pg-cell-wrapper--row-header">
                    <div class="pg-cell pg-cell--row-header">${timeString}</div>
                  </th>
                  ${mapString(locations, location => {
                    const { eventName, cellType, rowspan, blank } = getCellData({ events, rowState, date, interval, location })
                    if (blank) return '' // blank if cell from previous row occupies this space
                    return /* html */`
                      <td class="pg-cell-wrapper pg-cell-wrapper--${cellType}" rowspan="${rowspan}">
                        <div class="pg-cell pg-cell--${cellType}">${eventName}</div>
                      </td>
                    `
                  })}
                </tr>
              `)}
            </tbody>
          </table>
        `
      })}
    `
    component.root.appendChild(tableTemplate.content.cloneNode(true))
    return true // success
  }
}
