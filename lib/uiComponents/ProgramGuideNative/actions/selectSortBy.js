export default ({ setState, component }) => sortBy => {
  const { toggleSortDialog } = component
  toggleSortDialog(false) // close upon selection
  setState({
    view: 'guide',
    marker: 'none',
    sortBy,
  })
}
