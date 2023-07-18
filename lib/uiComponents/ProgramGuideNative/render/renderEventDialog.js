import { mapString, runMethod } from '../../../utilities'

const renderEventDialog = ({ favorites, activeEvent, hasFloorPlan }, { root }) => {

  const existingFavorite = favorites.find(({ id }) => id === activeEvent.id)
  const favoriteMethod = existingFavorite ? 'removeFavorite' : 'addFavorite'
  const favoriteText = existingFavorite ? 'Remove from Favorites' : 'Add to Favorites'

  // reset scrollbar to top (not sure why it renders at the bottom?)
  requestAnimationFrame(() => {
    const dialogContentEl = root.querySelector('.pg-event-dialog-content')
    if (dialogContentEl) dialogContentEl.scrollTop = 0
  })

  return /* html */`
    <article class="pg-dialog-body">
      <header class="pg-dialog-header">
        <h1 class="pg-dialog-title">${activeEvent.name}</h1>
        <button class="pg-dialog-close" onclick="${runMethod('closeEventDialog')}"><i class="pg-close-icon" title="Close"></i></button>
      </header>
      <div class="pg-event-dialog-content">
        <footer class="pg-event-dialog-info">
          <button class="pg-event-dialog-button ${!hasFloorPlan ? 'pg-disabled' : ''}" onclick="${runMethod('showFloorPlan', activeEvent.location)}" ${!hasFloorPlan ? 'disabled' : ''}>
            <i class="pg-target-icon"></i>
            <span class="pg-button-label-text">Show
on Map</span>
          </button>
          <div>
            <time datetime="${activeEvent.start.toISOString()}" class="pg-time pg-time--start">
              ${activeEvent.start.toLocaleTimeString('en-US', { timeStyle: 'short' })}
            </time>
            to
            <time datetime="${activeEvent.end.toISOString()}" class="pg-time pg-time--end">
              ${activeEvent.end.toLocaleTimeString('en-US', { timeStyle: 'short' })}
            </time> @ ${activeEvent.location}
            <div><strong>Hosted by:</strong> <span>${activeEvent.host}</span></div>
            <div><strong>Category:</strong> <span>${activeEvent.category}</span></div>
          </div>
        </footer>
        <section class="pg-dialog-content">
          ${mapString(activeEvent.description.split(/\n/), paragraph => /* html */`
            <p class="pg-dialog-paragraph">${paragraph}</p>
          `)}
        </section>
        <section class="pg-dialog-content">
          <menu class="pg-dialog-menu">
            <button class="pg-dialog-menu-item" onclick="${runMethod(favoriteMethod, activeEvent)}" autofocus>
              <span>${favoriteText}</span>
              <i class="${existingFavorite ? 'pg-favorite-icon' : 'pg-empty-favorite-icon'}" title="${favoriteText}"></i>
            </button>
          </menu>
        </section>
      </div>
    </article>
  `
}

export default renderEventDialog
