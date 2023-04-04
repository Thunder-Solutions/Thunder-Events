export default ({ component }) => event => {
  const { toggleMainMenu, closeEventDialog } = component
  if (event.key === 'Esc' || event.key === 'Escape') {
    event.preventDefault()
    toggleMainMenu(false)
    closeEventDialog()
  }
}
