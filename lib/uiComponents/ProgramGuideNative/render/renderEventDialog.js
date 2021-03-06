import { mapString, runMethod } from '../../../utilities'

const renderEventDialog = ({ favorites, activeEvent, sortBy }) => {

  const existingFavorite = favorites.find(({ location: _location, start, name }) => {
    const { location: aLocation, start: aStart, name: aName } = activeEvent
    return _location === aLocation && Number(new Date(start)) === Number(aStart) && name === aName
  })
  const favoriteMethod = existingFavorite ? 'removeFavorite' : 'addFavorite'
  const favoriteText = existingFavorite ? 'Remove from Favorites' : 'Add to Favorites'

  return /* html */`
    <article class="pg-dialog-body">
      <header class="pg-dialog-header">
        <h1 class="pg-dialog-title">${activeEvent.name}</h1>
        <button class="pg-dialog-close" onclick="${runMethod('closeEventDialog')}"><i class="pg-close-icon" title="Close"></i></button>
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
        <div>@ ${activeEvent.location}</div>
        <div class="pg-dialog-details">
          <div><strong>Hosted by:</strong> <span>${activeEvent.host}</span></div>
          <div><strong>Category:</strong> <span>${activeEvent.category}</span></div>
        </div>
      </footer>
      <section class="pg-dialog-content">
        <menu class="pg-dialog-menu">
          <button class="pg-dialog-menu-item" onclick="${runMethod(favoriteMethod, activeEvent)}" autofocus>
            <span>${favoriteText}</span>
            <i class="pg-favorite-icon" title="${favoriteText}">&starf;</i>
          </button>
          ${sortBy === 'favorites'
            ? ''
            : /* html */
              `<button class="pg-dialog-menu-item" onclick="${runMethod('selectSortBy', 'favorites')}" autofocus>
                <span>View All Favorites</span>
                <i class="pg-favorite-icon" title="View All Favorites">&starf;</i>
              </button>`
          }
        </menu>
      </section>
    </article>
  `
}

export default renderEventDialog
