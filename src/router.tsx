import { Accessor, createContext, createSignal, Match, Switch, useContext, type Component } from 'solid-js';
import EventsByTime from './routes/eventsByTime';
import EventsByLocation from './routes/eventsByLocation';
import Favorites from './routes/favorites';
import FloorPlan from './routes/floorPlan';

const routes = {
	'events-by-time': EventsByTime,
	'events-by-location': EventsByLocation,
	'favorites': Favorites,
	'floor-plan': FloorPlan,
} as const;

export type RouteName = keyof typeof routes;

type RouteContextType = {
	route: Accessor<RouteName>;
	goBack: () => void;
	navigate: (route: RouteName) => void;
};

export const RouteContext = createContext<RouteContextType>();

/**
 * Creates a simple router that won't impact the URL.
 */
export const createRouteContext = (): RouteContextType => {
	const [route, setRoute] = createSignal<RouteName>('events-by-time');
	const [history, setHistory] = createSignal<RouteName[]>([route()]);
	const goBack = () => {
		const historyValue = history();
		if (historyValue.length > 1) {
			historyValue.pop();
			setRoute(historyValue[historyValue.length - 1]);
			setHistory(historyValue);
		}
	};
	const navigate = (route: RouteName) => {
		const historyValue = history();
		historyValue.push(route);
		setRoute(route);
		setHistory(historyValue);
	};
	return { route, goBack, navigate };
};

const Router: Component = () => {
	const router = useContext(RouteContext);
	return (
		<Switch>
			<Match when={router?.route() === 'events-by-time'}>
				<EventsByTime />
			</Match>
			<Match when={router?.route() === 'events-by-location'}>
				<EventsByLocation />
			</Match>
			<Match when={router?.route() === 'favorites'}>
				<Favorites />
			</Match>
			<Match when={router?.route() === 'floor-plan'}>
				<FloorPlan />
			</Match>
		</Switch>
	);
};

export default Router;
