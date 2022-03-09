import { mapString, runMethod } from '../../utilities'

const renderEventDialog = ({ eventDialogOpen, activeEvent }) => /* html */`
  <dialog class="pg-dialog" ${eventDialogOpen ? 'open' : ''}>
    <article class="pg-dialog-body">
      <header class="pg-dialog-header">
        <h1 class="pg-dialog-title">${activeEvent.name}</h1>
        <button class="pg-dialog-close" onclick="${runMethod('closeEventDialog')}">&times;</button>
      </header>
      <section class="pg-dialog-content pg-dialog-content--text-container">
        ${mapString(activeEvent.description.split(/\n/), paragraph => /* html */`
          <p class="pg-dialog-paragraph">${paragraph}</p>
        `)}
      </section>
      <footer class="pg-dialog-footer">
        <time datetime="${activeEvent.start.toISOString()}" class="pg-time pg-time--start">
          ${activeEvent.start.toLocaleTimeString('en-US', { timeStyle: 'short' })}
        </time>
        to
        <time datetime="${activeEvent.end.toISOString()}" class="pg-time pg-time--end">
          ${activeEvent.end.toLocaleTimeString('en-US', { timeStyle: 'short' })}
        </time>
        <br/>
        @ ${activeEvent.location}
      </footer>
    </article>
  </dialog>
`

export default renderEventDialog
