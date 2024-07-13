import { createSignal, type Component } from 'solid-js';
import Menu from './components/menuBar/menuBar';
import css from './App.module.css';
import NavBar from './components/navBar/navBar';
import Router, { createRouteContext, RouteContext } from './router';

const App: Component = () => {
	const router = createRouteContext();
	return (
		<RouteContext.Provider value={router}>
			<div class={css.schedule}>
				<Menu />
				<div class={css.scheduleBody}>
					<Router route={router.route()} />
				</div>
				<NavBar />
			</div>
		</RouteContext.Provider>
	);
};

export default App;
