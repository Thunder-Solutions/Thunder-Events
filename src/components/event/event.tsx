import type { Component } from 'solid-js';
import css from './event.module.css';
import Button from '../button/button';

const Event: Component = () => {
	return (
		<article class={css.event}>
			<header class={css.locationHeader}>
				<Button icon="crosshairs">Show on map</Button>
				<div class={css.locationNameWrapper}>
					<h3 class={css.locationName}>Location Name</h3>
				</div>
			</header>
			<div class={css.eventBody}>
				<header class={css.eventHeader}>
					<div class={css.eventInfo}>
						<h3 class={css.eventName}>Event Name</h3>
						<h4 class={css.eventHost}>
							<span class={css.eventHostLabel}>Host: </span>
							<span class={css.eventHostValue}>Jon Snow</span>
						</h4>
						<h4 class={css.eventCategory}>
							<span class={css.eventCategoryLabel}>Category: </span>
							<span class={css.eventCategoryValue}>Main Events</span>
						</h4>
					</div>
					<Button icon="star-outline">Favorite</Button>
				</header>
				<p class={css.eventDescription}>This is just placeholder description text.</p>
				<span class={css.readMore}>Read more</span>
			</div>
		</article>
	);
};

export default Event;
