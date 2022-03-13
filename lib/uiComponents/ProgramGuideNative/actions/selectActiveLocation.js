export default ({ setState, component }) => _location => {
  const { toggleSortDialog } = component
  toggleSortDialog(false) // close upon selection
  setState({
    view: 'guide',
    sortBy: 'location',
    activeLocation: _location,
  })
}
