import { type Component } from 'solid-js';
import { createRouteContext, RouteContext } from './router';
import Page from './components/page/page';

const App: Component = () => {
	const router = createRouteContext();
	return (
		<RouteContext.Provider value={router}>
			<Page />
		</RouteContext.Provider>
	);
};

export default App;
