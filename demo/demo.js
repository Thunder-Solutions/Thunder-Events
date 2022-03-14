import ThunderEvents from '../esm/thunderEvents.min.mjs'

customElements.define('program-guide', ThunderEvents.Components.ProgramGuideNative)

ThunderEvents.init(async () => {
  const response = await fetch('/getDemoEvent')
  const data = await response.json()
  return {
    ...data,
    guide: {
      ...data.guide,
      events: data.guide.events.map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      })),
    }
  }
})

ThunderEvents.getTimes().then(console.log)