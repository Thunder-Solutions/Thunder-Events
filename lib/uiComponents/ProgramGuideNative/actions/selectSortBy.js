export default ({ setState, component }) => sortBy => {
  const { toggleSortDialog, toggleDateDialog } = component

  // close upon selection
  toggleSortDialog(false)
  toggleDateDialog(false)
  setState({
    view: 'guide',
    marker: 'none',
    sortBy,
  })
}
