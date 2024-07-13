import type { Component } from 'solid-js';
import css from './timeHeader.module.css';
import Button from '../button/button';

const TimeHeader: Component = () => {
	return (
		<header class={css.timeHeader}>
			<h1>List of Events</h1>
			<Button icon="clock">Choose Time</Button>
			<Button icon="pin-magnifier">View by Location</Button>
		</header>
	);
};

export default TimeHeader;
