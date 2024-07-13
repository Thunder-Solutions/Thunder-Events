import type { Component } from 'solid-js';
import css from './navBar.module.css';
import Button from '../button/button';

const NavBar: Component = () => {
	return (
		<menu class={css.navBar}>
			<Button icon="left-arrow-circle" category="nav">
				Back
			</Button>
			<Button icon="clock" category="nav">
				Schedule
			</Button>
			<Button icon="pin-map" category="nav">
				Floor Plan
			</Button>
			<Button icon="star" category="nav">
				Favorites
			</Button>
		</menu>
	);
};

export default NavBar;
