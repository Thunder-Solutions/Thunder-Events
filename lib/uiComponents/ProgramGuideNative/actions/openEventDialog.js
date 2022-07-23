import { clearHTML, parseHTML } from '../../../utilities'
import { getActiveEvent } from '../componentUtils'
import { renderEventDialog } from '../render'

export default ({ setState, component }) => async encodedEvent => {
  const { root } = component

  // set event data
  const eventJSON = decodeURIComponent(encodedEvent)
  const event = JSON.parse(eventJSON)
  const newState = await setState({ activeEvent: getActiveEvent(event) }, { render: false, pushState: false })

  // show the dialog
  const dialog = root.querySelector('.pg-dialog--event')
  const dialogContent = parseHTML(renderEventDialog(newState))
  clearHTML(dialog)
  dialog.appendChild(dialogContent)
  if (!dialog.open) dialog.showModal()
}
