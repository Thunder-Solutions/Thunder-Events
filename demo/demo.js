import ThunderEvents from '../esm/thunderEvents.min.mjs'
import { fetchEvents, fetchFloorPlan } from './mock-api.js'

customElements.define('program-guide', ThunderEvents.Components.ProgramGuideNative)

ThunderEvents.fetchGuide(async () => {
  const events = await fetchEvents()
  const imageSrc = await fetchFloorPlan()
  return {
    events: events.map(event => ({
      name: event.title,
      location: event.room,
      start: event.beginTime,
      end: event.endTime,
      description: event.description,
    })),
    floorPlan: {
      title: 'Demo Inn',
      imageSrc,
      clickableAreas: [
        {
          shape: 'rect',
          coords: [0, 0, 800, 689],
          href: 'https://www.lakeside-inn.com/images/floorplans/lakeside-floorplans-all.jpg',
          alt: 'See full map',
        },
      ],
    },
  }
})
