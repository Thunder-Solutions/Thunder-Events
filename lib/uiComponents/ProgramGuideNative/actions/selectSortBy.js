import { getToday } from '../../../utilities'

export default ({ state, setState, component }) => async sortBy => {
  const { toggleMainMenu } = component

  // close upon selection
  toggleMainMenu(false)
  if (state.sortBy === sortBy && state.view === 'guide') return
  const currentDay = sortBy === 'now' || sortBy === 'nowOnly' ? getToday(state) : state.activeDay

  // to avoid rewriting logic, I'm just temporarily hacking around this.
  const sortPref = sortBy === 'list' || sortBy === 'location' ? sortBy : state.sortPref
  const _sortBy = sortBy === 'schedule' ? sortPref : sortBy

  await setState({
    view: 'guide',
    marker: 'none',
    sortBy: _sortBy,
    sortPref,
    activeDay: currentDay,
  })
}
