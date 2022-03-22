export default ({ state, setState }) => () => {
  setState({ maximized: !state.maximized }, { pushState: false })
}
