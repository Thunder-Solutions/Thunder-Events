export default ({ component }) => () => {
  const { root } = component
  const dialog = root.querySelector('.pg-dialog--event')
  dialog.close()
}
