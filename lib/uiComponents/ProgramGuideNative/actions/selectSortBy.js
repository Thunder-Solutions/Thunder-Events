import { getToday } from '../../../utilities'

export default ({ state, setState, component }) => async sortBy => {
  const { toggleMainMenu } = component

  // close upon selection
  toggleMainMenu(false)
  if (state.sortBy === sortBy && state.view === 'guide') return
  const currentDay = sortBy === 'now' || sortBy === 'nowOnly' ? getToday(state) : state.activeDay

  // to avoid rewriting logic, I'm just temporarily hacking around this.
  const _sortBy = sortBy === 'schedule' ? state.sortBy : sortBy

  await setState({
    view: 'guide',
    marker: 'none',
    sortBy: _sortBy,
    activeDay: currentDay,
  })
}
