import type { Component } from 'solid-js';
import TimeHeader from '../components/timeHeader/timeHeader';
import TimeBlock from '../components/timeBlock/timeBlock';
import Event from '../components/event/event';

const EventsByTime: Component = () => {
	return (
		<>
			<TimeHeader />
			<TimeBlock time="2:00">
				<Event />
				<Event />
				<Event />
			</TimeBlock>
			<TimeBlock time="4:00">
				<Event />
				<Event />
				<Event />
			</TimeBlock>
		</>
	);
};

export default EventsByTime;
