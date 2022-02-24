export const fetchEvents = () => Promise.resolve([
  {
    beginTime: new Date('1/1/2023 12:00 PM'),
    endTime: new Date('1/1/2023 12:45 PM'),
    room: 'Main Events',
    title: 'Opening Ceremony',
  },
  {
    beginTime: new Date('1/1/2023 1:00 PM'),
    endTime: new Date('1/1/2023 1:45 PM'),
    room: 'Main Events',
    title: 'Concert',
  },
  {
    beginTime: new Date('1/1/2023 1:00 PM'),
    endTime: new Date('1/1/2023 1:20 PM'),
    room: 'Panel Room',
    title: 'How To Run a Panel',
  },
  {
    beginTime: new Date('1/1/2023 1:30 PM'),
    endTime: new Date('1/1/2023 1:50 PM'),
    room: 'Panel Room',
    title: 'Best of the Best: Top 10',
  },
  {
    beginTime: new Date('1/2/2023 12:00 PM'),
    endTime: new Date('1/2/2023 12:45 PM'),
    room: 'Main Events',
    title: 'Comedy Show',
  },
  {
    beginTime: new Date('1/2/2023 12:00 PM'),
    endTime: new Date('1/2/2023 12:20 PM'),
    room: 'Panel Room',
    title: 'Another Day Another Dollar',
  },
  {
    beginTime: new Date('1/2/2023 12:30 PM'),
    endTime: new Date('1/2/2023 12:50 PM'),
    room: 'Panel Room',
    title: 'Program Guide Writing 101',
  },
  {
    beginTime: new Date('1/2/2023 1:00 PM'),
    endTime: new Date('1/2/2023 1:45 PM'),
    room: 'Main Events',
    title: 'Closing Ceremony',
  },
])

export const fetchFloorPlan = () => Promise.resolve('https://www.lakeside-inn.com/images/floorplans/lakeside-floorplans-all.jpg')
