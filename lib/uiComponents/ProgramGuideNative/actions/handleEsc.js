export default ({ component }) => event => {
  const { toggleSortDialog, toggleDateDialog, closeEventDialog } = component
  if (event.key === 'Esc' || event.key === 'Escape') {
    event.preventDefault()
    toggleSortDialog(false)
    toggleDateDialog(false)
    closeEventDialog()
  }
}
