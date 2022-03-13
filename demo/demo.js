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
        dimensions: {
          height: 689,
          width: 800,
        },
        clickableAreas: [
          {
            location: 'Main Events',
            shape: 'rect',
            coords: [20, 20, 227, 337],
            href: '#View-Location-Main-Events',
            alt: 'Main Events',
          },
          {
            location: 'Panel Room',
            shape: 'rect',
            coords: [227, 86, 376, 288],
            href: '#View-Location-Panel-Room',
            alt: 'Panel Room',
          },
        ],
      },
    },
  }
})
