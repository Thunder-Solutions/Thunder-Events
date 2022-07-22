export default ({ setState, component }) => sortBy => {
  const { toggleSortDialog } = component

  // close upon selection
  toggleSortDialog(false)
  setState({
    view: 'guide',
    marker: 'none',
    sortBy,
  })
}
