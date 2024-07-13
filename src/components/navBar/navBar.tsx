import { useContext, type Component } from 'solid-js';
import css from './navBar.module.css';
import Button from '../button/button';
import { RouteContext } from '../../router';

const NavBar: Component = () => {
	const router = useContext(RouteContext);
	const handlers = {
		back: () => {
			router?.goBack();
		},
		schedule: () => {
			router?.navigate('events-by-time');
		},
		floorPlan: () => {
			router?.navigate('floor-plan');
		},
		favorites: () => {
			router?.navigate('favorites');
		},
	};
	return (
		<menu class={css.navBar}>
			<Button icon="left-arrow-circle" category="nav" onClick={handlers.back}>
				Back
			</Button>
			<Button icon="clock" category="nav" onClick={handlers.schedule}>
				Schedule
			</Button>
			<Button icon="pin-map" category="nav" onClick={handlers.floorPlan}>
				Floor Plan
			</Button>
			<Button icon="star" category="nav" onClick={handlers.favorites}>
				Favorites
			</Button>
		</menu>
	);
};

export default NavBar;
