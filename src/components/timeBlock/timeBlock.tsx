import type { Component, ParentProps } from 'solid-js';
import css from './timeBlock.module.css';

type TimeBlockProps = {
	time: string;
} & ParentProps;

const TimeBlock: Component<TimeBlockProps> = ({ children, time }) => {
	return (
		<header class={css.timeBlock}>
			<h2>{time}</h2>
			{children}
		</header>
	);
};

export default TimeBlock;
