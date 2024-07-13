import type { Component } from 'solid-js';
import css from './icon.module.css';
import Bars from './svg/bars.svg';
import Calendar from './svg/calendar.svg';
import ClockMagnifier from './svg/clock-magnifier.svg';
import Clock from './svg/clock.svg';
import ClosedEye from './svg/closed-eye.svg';
import Crosshairs from './svg/crosshairs.svg';
import Eye from './svg/eye.svg';
import LeftArrowCircle from './svg/left-arrow-circle.svg';
import LeftTriangle from './svg/left-triangle.svg';
import Magnifier from './svg/magnifier.svg';
import PinMagnifier from './svg/pin-magnifier.svg';
import PinMap from './svg/pin-map.svg';
import Pin from './svg/pin.svg';
import Printer from './svg/printer.svg';
import RightTriangle from './svg/right-triangle.svg';
import StackedWindows from './svg/stacked-windows.svg';
import Star from './svg/star.svg';
import XCircle from './svg/x-circle.svg';

const icons = {
	'bars': Bars,
	'calendar': Calendar,
	'clock-magnifier': ClockMagnifier,
	'clock': Clock,
	'closed-eye': ClosedEye,
	'crosshairs': Crosshairs,
	'eye': Eye,
	'left-arrow-circle': LeftArrowCircle,
	'left-triangle': LeftTriangle,
	'magnifier': Magnifier,
	'pin-magnifier': PinMagnifier,
	'pin-map': PinMap,
	'pin': Pin,
	'printer': Printer,
	'right-triangle': RightTriangle,
	'stacked-windows': StackedWindows,
	'star': Star,
	'x-circle': XCircle,
} as const;

export type IconName = keyof typeof icons;

export type IconProps = {
	icon: IconName;
	class?: string;
};

const Icon: Component<IconProps> = (props) => {
	const IconComponent = icons[props.icon];
	return (
		<div class={`${css.icon} ${props.class ?? ''}`}>
			<IconComponent />
		</div>
	);
};

export default Icon;
