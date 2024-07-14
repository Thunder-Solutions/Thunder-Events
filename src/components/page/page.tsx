import { type Component } from 'solid-js';
import css from './page.module.css';
import Menu from '../menuBar/menuBar';
import NavBar from '../navBar/navBar';
import Router from '../../router';

const Page: Component = () => {
	return (
		<div class={css.page}>
			<Menu />
			<div class={css.body}>
				<Router />
			</div>
			<NavBar />
		</div>
	);
};

export default Page;
