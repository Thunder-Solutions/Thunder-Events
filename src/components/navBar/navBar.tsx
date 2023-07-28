import type { Component } from 'solid-js';

import css from './navBar.module.css';

const NavBar: Component = () => {
	return (
		<menu class={css.navBar}>
			<button>Back</button>
			<button>Schedule</button>
			<button>Floor Plan</button>
			<button>Favorites</button>
		</menu>
	);
}

export default NavBar;
