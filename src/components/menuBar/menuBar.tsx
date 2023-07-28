import type { Component } from 'solid-js';

import css from './menuBar.module.css';

const Menu: Component = () => {
	return (
		<header class={css.menu}>
			<button>Menu</button>
			<menu style="display: none;">menu placeholder</menu>
			<label style="display: none;">
				Search
				<input />
			</label>
			<div class={css.dateContainer}>
				<time datetime="2023-07-27">Thursday 7/27/2023</time>
				<button>Choose Date</button>
			</div>
			<button>Search</button>
			<button>Restore</button>
		</header>
	);
}

export default Menu;
