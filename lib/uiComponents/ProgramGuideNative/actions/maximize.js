export default ({ state, setState, component }) => async () => {
  const { root } = component
  let currentElement = root.host
  while (currentElement.parentElement) {
    currentElement.parentElement.style.overflow = !state.maximized
      ? 'hidden' : ''
    currentElement = currentElement.parentElement
  }

  await setState({ maximized: !state.maximized }, { pushState: false })
}
