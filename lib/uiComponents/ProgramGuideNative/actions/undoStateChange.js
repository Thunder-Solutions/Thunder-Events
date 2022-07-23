export default ({ state, setState }) => async () => {
  const { prevState } = state
  if (prevState.length === 0) return
  await setState({
    ...prevState.slice(-1)[0],
    maximized: state.maximized,
    prevState: prevState.slice(0, -1),
  }, { pushState: false })
}
