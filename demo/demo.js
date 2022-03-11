import ThunderEvents from '../esm/thunderEvents.min.mjs'
import { fetchEvents, fetchFloorPlan } from './mock-api.js'

customElements.define('program-guide', ThunderEvents.Components.ProgramGuideNative)

ThunderEvents.init(async () => {
  const events = await fetchEvents()
  const imageSrc = await fetchFloorPlan()
  return {
    guide: {
      events: events.map(event => ({
        name: event.title,
        location: event.room,
        start: event.beginTime,
        end: event.endTime,
        description: event.description,
        host: event.hostedBy,
        category: event.cat,
      })),
      floorPlan: {
        title: 'Demo Inn',
        imageSrc,
        clickableAreas: [
          {
            shape: 'rect',
            coords: [0, 0, 800, 689],
            href: '#View-Location-Panel-Room',
            alt: 'See full map',
          },
        ],
      },
    },
  }
})
