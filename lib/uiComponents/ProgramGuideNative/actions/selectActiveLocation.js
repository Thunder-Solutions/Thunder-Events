export default ({ setState, component }) => async _location => {
  const { toggleSortDialog } = component
  toggleSortDialog(false) // close upon selection
  if (state.sortBy === 'location' && state.view === 'guide') return
  await setState({
    view: 'guide',
    sortBy: 'location',
    activeLocation: _location,
  })
}
