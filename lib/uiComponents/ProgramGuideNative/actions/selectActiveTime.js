import { DEFAULT_TIMES } from '../../../constants'

export default ({ state, setState }) => ({ target }) => {

  // validate the time and autocorrect
  // if (target.min > target.value) target.value = target.min
  // if (target.max < target.value) target.value = target.max
  const { interval } = state.times || DEFAULT_TIMES
  const [hr, mn] = target.value.split(':')
  const roundedMn = Math.round(mn / interval) * interval
  const newMn = String(roundedMn).length === 1 ? `0${roundedMn}` : roundedMn
  target.value = `${hr}:${newMn}`

  // set the time
  const { activeDay } = state
  const timeString = target.value
  const activeTime = new Date(`${activeDay} ${timeString}`)
  if (state.activeTime.toISOString() === activeTime.toISOString()) return
  setState({
    activeTime,
  }, {
    render: false,
  })
}
