import { getDateInfo } from "../../../utilities"

export default ({ state, setState, component }) => sortBy => {
  const { toggleSortDialog } = component
  const { days } = state.times

  // close upon selection
  toggleSortDialog(false)
  if (state.sortBy === sortBy && state.view === 'guide') return
  const { day: nowDay, date: nowDate } = getDateInfo(Date.now())
  const currentDay = sortBy === 'now' || sortBy === 'nowOnly'
    ? Object.keys(days).find(day => day === `${nowDay} ${nowDate}`) ?? state.activeDay
    : state.activeDay
  setState({
    view: 'guide',
    marker: 'none',
    sortBy,
    activeDay: currentDay,
  })
}
