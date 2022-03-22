export default ({ state, setState }) => () => {
  const { prevState } = state
  if (prevState.length === 0) return
  setState({
    ...prevState.slice(-1)[0],
    prevState: prevState.slice(0, -1),
  }, { pushState: false })
}
