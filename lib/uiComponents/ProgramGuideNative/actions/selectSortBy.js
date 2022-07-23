export default ({ state, setState, component }) => sortBy => {
  const { toggleSortDialog } = component

  // close upon selection
  toggleSortDialog(false)
  if (state.sortBy === sortBy && state.view === 'guide') return
  setState({
    view: 'guide',
    marker: 'none',
    sortBy,
  })
}
