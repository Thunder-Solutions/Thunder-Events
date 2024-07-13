import type { Component } from 'solid-js';
import css from './menuBar.module.css';
import Button from '../button/button';

const Menu: Component = () => {
	return (
		<header class={css.menu}>
			<Button icon="bars" category="menu">
				Menu
			</Button>
			<menu style="display: none;">menu placeholder</menu>
			<label style="display: none;">
				Search
				<input />
			</label>
			<div class={css.dateContainer}>
				<time datetime="2023-07-27">Thursday 7/27/2023</time>
				<Button icon="calendar">Choose Date</Button>
			</div>
			<Button icon="magnifier" category="menu">
				Search
			</Button>
			<Button icon="stacked-windows" category="menu">
				Restore
			</Button>
		</header>
	);
};

export default Menu;
