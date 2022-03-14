export default ({ component }) => (event, message) => {
  const { root } = component
  const { clientY } = event
  const messageEl = root.querySelector('.pg-floor-plan-message')
  const ACTIVE_CLASS = 'pg-floor-plan-message--active'
  messageEl.style.top = `${clientY}px`
  messageEl.classList.add(ACTIVE_CLASS)
  messageEl.textContent = message

  // show message for 3 seconds
  setTimeout(() => {
    messageEl.classList.remove(ACTIVE_CLASS)
    setTimeout(() => { messageEl.textContent = '' }, 600) // allow animation to finish first
  }, 3000)
}
