import type { Component, JSXElement } from 'solid-js';
import Icon, { IconName } from '../icon/icon';
import css from './button.module.css';
import { isDefined } from '../../utilities';

export type ButtonProps = {
	children: JSXElement;
	icon?: IconName;
	iconClass?: string;
	category?: 'menu' | 'nav' | 'action';
	title?: string;
	active?: boolean;
	onClick?: GlobalEventHandlers['onclick'];
	type?: HTMLButtonElement['type'];
	invisible?: boolean;
	class?: string;
};

const Button: Component<ButtonProps> = (props) => {
	const category = props.category ?? 'action';
	const activeClass = isDefined(props.active) ? css.active : '';
	const invisibleClass = isDefined(props.invisible) ? css.invisible : '';
	const additionalClass = isDefined(props.class) ? props.class : '';
	const clickHandler = props.onClick ?? (() => {});
	return (
		<button
			class={`${css.button} ${css[category]} ${activeClass} ${invisibleClass} ${additionalClass}`}
			title={props.title}
			type={props.type}
			onClick={clickHandler}
		>
			{category === 'nav' ? props.children : <></>}
			{props.icon ? <Icon icon={props.icon} class={`${css.buttonIcon} ${props.iconClass ?? ''}`} /> : <></>}
			{category !== 'nav' ? props.children : <></>}
		</button>
	);
};

export default Button;
