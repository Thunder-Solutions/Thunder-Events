import { useContext, type Component } from 'solid-js';
import css from './timeHeader.module.css';
import Button from '../button/button';
import { RouteContext } from '../../router';

const TimeHeader: Component = () => {
	const router = useContext(RouteContext);
	return (
		<header class={css.timeHeader}>
			<h1 class={css.timeHeading}>List of Events</h1>
			<Button icon="clock">Choose Time</Button>
			<Button icon="pin-magnifier" onClick={() => router?.navigate('events-by-location')}>
				View by Location
			</Button>
		</header>
	);
};

export default TimeHeader;
