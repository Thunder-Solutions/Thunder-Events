import { mapString, runMethod, getDateInfo, roundMinutes } from '../../../utilities'

const renderAsList = ({ events, hiddenLocations, activeDay, activeTime, sortBy, times: allTimes }) => {

  // only show location list if the columns are collapsed
  const { days, interval } = allTimes || DEFAULT_TIMES

  // Sort events in ascending order (earliest to latest)
  const sortedEvents = [...events].sort(
    (e1, e2) => Number(new Date(e1.start)) - Number(new Date(e2.start)),
  )

  // determine how to filter times
  const _times = days[activeDay]
  const now = roundMinutes(Date.now(), interval)
  const { time: nowTime } = getDateInfo(now)
  const filterMap = {
    now: _times.filter(({ date }) => date >= now),
    time: _times.filter(({ date }) => date >= activeTime),
    allTime: _times,
  }
  const _sortBy = ['now', 'time', 'allTime'].includes(sortBy) ? sortBy : 'allTime'
  console.log(_sortBy)
  const filteredTimes = filterMap[_sortBy]
  const times = filteredTimes.length ? filteredTimes : [{ date: now, timeString: nowTime }]

  const earliest = times[0].date
  const latest = times[times.length - 1].date

  return /* html */`
    <div></div>
    <div class="pg-table-wrapper">
      <table class="pg-table">
        <thead class="pg-table-header">
          <tr class="pg-row">
            <td class="pg-cell-wrapper pg-cell-wrapper--column-header">
              <div class="pg-cell pg-cell--column-header pg-cell--column-header-list">
                <span class="pg-corner-text">
                  List of Events
                </span>
                <button class="pg-header-button" onclick="${runMethod('toggleChooseTime', true)}">
                  <i class="pg-schedule-icon"></i>
                  <span>Choose Time</span>
                </button>
                <button class="pg-header-button" onclick="${runMethod('selectSortBy', 'location')}">
                  <i class="pg-view-location-icon"></i>
                  <span>View by Location</span>
                </button>
              </div>
            </td>
          </tr>
        </thead>
        <tbody class="pg-body">
          ${(() => {

              // use the closure to manage state through iterations
              let timeBlock

              return mapString(sortedEvents, event => {
                const { start, end, name, location } = event

                // Don't render if time is filtered out
                if (end <= earliest || start >= latest) return

                // Don't render if location is filtered out
                if (hiddenLocations.includes(location)) return
                
                // Don't render if not same date
                if (new Date(activeDay).getDate() !== new Date(start).getDate()) return

                const startDate = getDateInfo(start)
                const endDate = getDateInfo(end)
                const day = `${startDate.day} ${startDate.date}`
                const startTime = startDate.time
                const endTime = endDate.time
                const newTimeBlock = timeBlock !== startTime
                if (newTimeBlock) timeBlock = startTime
                return /* html */`
                  ${newTimeBlock ? /* html */`
                    <tr class="pg-row pg-row--time">
                      <td class="pg-cell-wrapper pg-cell-wrapper--data pg-cell-wrapper--data-time">
                        ${start < earliest ? `${startTime} (Ends after ${times[0].timeString})` : startTime}
                      </td>
                    </tr>
                  ` : ''}
                  <tr class="pg-row">
                    <td class="pg-cell-wrapper pg-cell-wrapper--data pg-cell-wrapper--data-favorite" onclick="${runMethod('openEventDialog', event)}">
                      <div class="pg-cell pg-cell--data pg-cell--data-favorite">
                        <span class="pg-search-result-name">${name}</span>
                        <span class="pg-inline-result-details"><strong>Location:</strong> ${location}</span>
                        <span class="pg-inline-result-details">${day}</span>
                        <span class="pg-search-result-details">
                          <span class="pg-inline-text">${startTime}</span>
                          <span class="pg-inline-text">- ${endTime}</span>
                        </span>
                      </div>
                    </td>
                  </tr>
                `
              })
          })()}
        </tbody>
      </table>
    </div>
  `
}

export default renderAsList
