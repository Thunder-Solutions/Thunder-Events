import type { Component } from 'solid-js';

import css from './event.module.css';

const Event: Component = () => {
	return (
		<article class={css.event}>
			<header>
				<h3>Location Name</h3>
				<button>Show on map</button>
			</header>
			<header>
				<h3>Event Name</h3>
				<h4>
					Host: <span>Jon Snow</span>
				</h4>
				<h4>
					Category: <span>Main Events</span>
				</h4>
			</header>
			<p>This is just placeholder description text.</p>
		</article>
	);
};

export default Event;
