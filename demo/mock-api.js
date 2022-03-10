export const fetchEvents = () => Promise.resolve([
  {
    beginTime: new Date('1/1/2023 12:00 PM'),
    endTime: new Date('1/1/2023 12:45 PM'),
    room: 'Main Events',
    title: 'Opening Ceremony',
    description: 'We welcome you to our latest event as we kick off with some announcements.',
    hostedBy: 'Management',
    cat: 'General',
  },
  {
    beginTime: new Date('1/1/2023 1:00 PM'),
    endTime: new Date('1/1/2023 1:45 PM'),
    room: 'Main Events',
    title: 'Concert',
    description: 'Coming all the way from overseas, this artist is performing especially for our event-goers.',
    hostedBy: 'The Band',
    cat: 'Music',
  },
  {
    beginTime: new Date('1/1/2023 1:00 PM'),
    endTime: new Date('1/1/2023 1:15 PM'),
    room: 'Panel Room',
    title: 'How To Run a Panel',
    description: 'Everyone starts somewhere.  Come learn how to execute the perfect panel!',
    hostedBy: 'John Doe',
    cat: 'Panel',
  },
  {
    beginTime: new Date('1/1/2023 1:30 PM'),
    endTime: new Date('1/1/2023 1:50 PM'),
    room: 'Panel Room',
    title: 'Best of the Best: Top 10',
    description: 'Join us as we count down the top 10 best things in the world!',
    hostedBy: 'John Doe',
    cat: 'Panel',
  },
  {
    beginTime: new Date('1/2/2023 12:00 PM'),
    endTime: new Date('1/2/2023 12:45 PM'),
    room: 'Main Events',
    title: 'Comedy Show',
    description: 'You\'ll never laugh more in your life, we guarantee it.',
    hostedBy: 'The Comedian',
    cat: 'Entertainment',
  },
  {
    beginTime: new Date('1/2/2023 12:00 PM'),
    endTime: new Date('1/2/2023 12:20 PM'),
    room: 'Panel Room',
    title: 'Another Day Another Dollar',
    description: 'It\'s a new day at the event, and we\'re happy to celebrate it.',
    hostedBy: 'Joe Schmoe',
    cat: 'Panel',
  },
  {
    beginTime: new Date('1/2/2023 12:30 PM'),
    endTime: new Date('1/2/2023 12:50 PM'),
    room: 'Panel Room',
    title: 'Program Guide Writing 101',
    description: 'Come learn how to write a program guide, even if you\'ve never done it before.',
    hostedBy: 'Joe Schmoe',
    cat: 'Panel',
  },
  {
    beginTime: new Date('1/2/2023 1:00 PM'),
    endTime: new Date('1/2/2023 1:45 PM'),
    room: 'Main Events',
    title: 'Closing Ceremony',
    description: 'We promise to send you off with confidence in our next event, with an open Q&A at the end.',
    hostedBy: 'Management',
    cat: 'General',
  },
])

export const fetchFloorPlan = () => Promise.resolve('https://www.lakeside-inn.com/images/floorplans/lakeside-floorplans-all.jpg')
