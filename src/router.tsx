import { Accessor, createContext, createSignal, type Component } from 'solid-js';
import EventsByTime from './routes/eventsByTime';

const routes = {
	'events-by-time': EventsByTime,
} as const;

export type RouteName = keyof typeof routes;

type RouteContextType = {
	route: Accessor<RouteName>;
	goBack: () => void;
	navigate: (route: RouteName) => void;
};

export const RouteContext = createContext<RouteContextType>();

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

export type RouterProps = {
	route: RouteName;
};

const Router: Component<RouterProps> = (props) => {
	const Route = routes[props.route];
	return <Route />;
};

export default Router;
