import { DEFAULT_TIMES } from '../../../constants'

export default ({ state, setState, component }) => async () => {
  component.toggleChooseTime(false)

  const { days } = state.times || DEFAULT_TIMES
  const times = days[state.activeDay]

  const inRange = (date) => date > times[0].date && date < times[times.length - 1].date
  const sortFn = (e1, e2) => e1.start > e2.start ? 1 : e1.start < e2.start ? -1 : 0
  const reverseFn = (e1, e2) => e1.start < e2.start ? 1 : e1.start > e2.start ? -1 : 0

  const events = [...state.events].filter(event => inRange(event.start)).sort(sortFn)

  const activeTime = events.find(event => event.start >= state.activeTime)?.start
    ?? events.sort(reverseFn).find(event => event.start < state.activeTime)?.start

  console.log(activeTime)

  const time = activeTime.toLocaleTimeString('en-US', { timeStyle: 'short' })

  await setState({
    view: 'guide',
    marker: 'none',
    sortBy: 'list',
    activeTime,
    scrollTo: `#t-${time.replace(/:|\s/g, '-')}`,
  })
}
