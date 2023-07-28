import type { Component } from 'solid-js';

import css from './timeHeader.module.css';

const TimeHeader: Component = () => {
	return (
		<header class={css.timeHeader}>
			<h1>List of Events</h1>
			<button>Choose Time</button>
			<button>View by Location</button>
		</header>
	);
}

export default TimeHeader;
