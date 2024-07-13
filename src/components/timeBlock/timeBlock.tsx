import type { Component, ParentProps } from 'solid-js';
import css from './timeBlock.module.css';

type TimeBlockProps = {
	time: string;
} & ParentProps;

const TimeBlock: Component<TimeBlockProps> = ({ children, time }) => {
	return (
		<header class={css.timeBlock}>
			<h2 class={css.time}>{time}</h2>
			<div class={css.events}>{children}</div>
		</header>
	);
};

export default TimeBlock;
