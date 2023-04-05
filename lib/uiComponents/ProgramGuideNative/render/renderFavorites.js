import { mapString, runMethod, getDateInfo, trim, compareDates } from '../../../utilities'

const roundDateToDay = date => new Date(new Date(date).toISOString().slice(0, 10)).getTime()

const adjustFavorites = (_favorites, events) => {
  const favorites = [..._favorites]
  const matchEvent = cEvent => {
    const allMatches = events.filter(event => event.name === cEvent.name)
    if (allMatches.length === 0) {
      return null
    } else if (allMatches.length === 1) {
      return allMatches[0]
    } else {
      const matchByTime = allMatches.find(event => event.start === cEvent.start)
      if (matchByTime) return matchByTime
      const matchByDayAndPlace = allMatches.find(event => {
        const sameDay = roundDateToDay(event.start) === roundDateToDay(cEvent.start)
        const sameLocation = event.location === cEvent.location
        return sameDay && sameLocation
      })
      if (matchByDayAndPlace) return matchByDayAndPlace
      const matchByDescription = allMatches.find(event => event.description === cEvent.description)
      if (matchByDescription) return matchByDescription
      const matchByLocation = allMatches.find(event => event.location === cEvent.location)
      if (matchByLocation) return matchByLocation
      return allMatches[0]
    }
  }
  favorites.sort(compareDates)
  return favorites.filter(matchEvent).map(matchEvent)
}

const renderFavorites = ({ favorites: _favorites, events }) => {
  const favorites = adjustFavorites(_favorites, events)
  return /* html */`
    <div class="pg-table-wrapper">
      <table class="pg-table">
        <thead class="pg-table-header">
          <tr class="pg-row">
            <td class="pg-cell-wrapper pg-cell-wrapper--column-header">
              <div class="pg-cell pg-cell--column-header">Favorites</div>
            </td>
          </tr>
        </thead>
        <tbody class="pg-table-body">
          ${favorites.length === 0
            ? /* html */`
                <tr class="pg-row">
                  <td class="pg-cell-wrapper pg-cell-wrapper--data pg-cell-wrapper--data-favorite">
                    <div class="pg-cell pg-cell--data pg-cell--data-favorite">You have no favorites.</div>
                  </td>
                </tr>
              `
            : mapString(favorites, event => {
              const { start, end, name, location } = event
              const startDate = getDateInfo(start)
              const endDate = getDateInfo(end)
              const day = `${startDate.day} ${startDate.date}`
              const startTime = startDate.time
              const endTime = endDate.time
              return /* html */`
                <tr class="pg-row">
                  <td class="pg-cell-wrapper pg-cell-wrapper--data pg-cell-wrapper--data-favorite" onclick="${runMethod('openEventDialog', event)}">
                    <div class="pg-cell pg-cell--data pg-cell--data-favorite">
                      <span class="pg-search-result-name">${trim(name)}</span>
                      <span class="pg-inline-result-details">${day}</span>
                      <span class="pg-search-result-details">
                        <span class="pg-inline-text">${startTime}</span>
                        <span class="pg-inline-text">- ${endTime}</span>
                        <span class="pg-inline-text"> @ ${location}</span>
                      </span>
                    </div>
                  </td>
                </tr>
              `
            })
          }
        </tbody>
      </table>
    </div>
  `
}

export default renderFavorites
