import { getToday } from '../../../utilities'

export default ({ state, setState, component }) => async sortBy => {
  const { toggleMainMenu } = component

  // close upon selection
  toggleMainMenu(false)
  if (state.sortBy === sortBy && state.view === 'guide') return
  const currentDay = sortBy === 'now' || sortBy === 'nowOnly' ? getToday(state) : state.activeDay
  await setState({
    view: 'guide',
    marker: 'none',
    sortBy,
    activeDay: currentDay,
  })
}
