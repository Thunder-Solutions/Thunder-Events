import { mapString, runMethod, parseLocationHash } from '../../../utilities'

const renderChooseTime = () => {

  return /* html */`
    <section class="pg-dialog-body">
      <header class="pg-dialog-header">
        <h1 class="pg-dialog-title">Choose a Time</h1>
        <button class="pg-dialog-close" title="Close" onclick="${runMethod('toggleChooseTime', false)}"><i class="pg-close-icon" title="Close"></i></button>
      </header>
      <section class="pg-dialog-content">
        ...
        <p class="pg-dialog-paragraph"></p>
      </section>
    </section>
  `
}

export default renderChooseTime
