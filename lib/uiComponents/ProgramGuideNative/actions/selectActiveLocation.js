export default ({ setState, component }) => _location => {
  const { toggleSortDialog } = component
  toggleSortDialog(false) // close upon selection
  if (state.sortBy === 'location' && state.view === 'guide') return
  setState({
    view: 'guide',
    sortBy: 'location',
    activeLocation: _location,
  })
}
