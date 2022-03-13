export default ({ component }) => event => {
  const { toggleSortDialog, closeEventDialog } = component
  if (event.key === 'Esc' || event.key === 'Escape') {
    event.preventDefault()
    toggleSortDialog(false)
    closeEventDialog()
  }
}
