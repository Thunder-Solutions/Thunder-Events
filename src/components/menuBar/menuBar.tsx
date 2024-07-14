import { createSignal, type Component } from 'solid-js';
import css from './menuBar.module.css';
import Button from '../button/button';
import Icon from '../icon/icon';
import { isDefined } from '../../utilities';

type Location = {
	name: string;
	active: boolean;
};

const LOCATIONS: Location[] = [
	{
		name: 'Main Events - Exhibitor Hall A',
		active: true,
	},
	{
		name: "Dealer's Hall - Exhibitor Hall B",
		active: false,
	},
	{
		name: 'Panel 1 - Room 201',
		active: true,
	},
	{
		name: 'Panel 2 - Room 202',
		active: true,
	},
	{
		name: 'Panel 3 - Room 203',
		active: true,
	},
];

const Menu: Component = () => {
	const locations = LOCATIONS;
	const [timeOnInput, setTimeOnInput] = createSignal<HTMLInputElement>();
	const [fromTimeInput, setFromTimeInput] = createSignal<HTMLInputElement>();
	const [toTimeInput, setToTimeInput] = createSignal<HTMLInputElement>();
	const handlers = {
		print: () => {
			console.log('print');
		},
		filterNowOn: () => {
			console.log('filter now on');
		},
		filterTimeOn: () => {
			const value = timeOnInput()?.value ?? '';
			if (value.trim() === '') return;
			console.log('filter time on', value);
		},
		filterTimeToTime: () => {
			const fromValue = fromTimeInput()?.value;
			const toValue = toTimeInput()?.value;
			if (fromValue?.trim() === '' || toValue?.trim() === '') return;
			console.log('filter time to time', fromValue, toValue);
		},
		resetTimeOn: () => {
			const input = timeOnInput();
			if (isDefined(input)) {
				input.value = '';
			}
		},
		resetTimeToTime: () => {
			const fromInput = fromTimeInput();
			if (isDefined(fromInput)) {
				fromInput.value = '';
			}
			const toInput = toTimeInput();
			if (isDefined(toInput)) {
				toInput.value = '';
			}
		},
		filterLocation: (loc: Location) => {
			console.log('filter location: ', loc.name);
		},
	};
	return (
		<>
			<section class={css.menuSection}>
				<header>
					<h1 class={css.menuHeading}>Export</h1>
				</header>
				<menu class={css.menu}>
					<li>
						<Button onClick={handlers.print} invisible>
							<div class={css.menuItem}>
								<Icon icon="printer" class={css.menuItemIcon} />
								<span>Print</span>
							</div>
						</Button>
					</li>
				</menu>
			</section>
			<section class={css.menuSection}>
				<header>
					<h1 class={css.menuHeading}>Filter Times</h1>
				</header>
				<menu class={css.menu}>
					<li>
						<Button onClick={handlers.filterNowOn} invisible>
							<div class={css.menuItem}>
								<Icon icon="clock" class={css.menuItemIcon} />
								<span>Now and onward</span>
							</div>
						</Button>
					</li>
					<li>
						<div class={css.menuItem}>
							<span>From</span>
							<input class={css.timeInput} type="time" ref={setTimeOnInput} onChange={handlers.filterTimeOn} />
							<span>and onward</span>
							<div class={css.resetButtonWrapper}>
								<Button icon="x-circle" class={css.resetButton} onClick={handlers.resetTimeOn}>
									Reset
								</Button>
							</div>
						</div>
					</li>
					<li>
						<div class={css.menuItem}>
							<span>From</span>
							<input class={css.timeInput} type="time" ref={setFromTimeInput} onChange={handlers.filterTimeToTime} />
							<span>to</span>
							<input class={css.timeInput} type="time" ref={setToTimeInput} onChange={handlers.filterTimeToTime} />
							<div class={css.resetButtonWrapper}>
								<Button icon="x-circle" class={css.resetButton} onClick={handlers.resetTimeToTime}>
									Reset
								</Button>
							</div>
						</div>
					</li>
				</menu>
			</section>
			<section class={css.menuSection}>
				<header>
					<h1 class={css.menuHeading}>Filter Locations</h1>
				</header>
				<menu class={css.menu}>
					{locations.map((loc) => (
						<li>
							<Button invisible onClick={() => handlers.filterLocation(loc)}>
								<div class={`${css.menuItem} ${css.location} ${loc.active ? css.active : ''}`}>
									<Icon icon={loc.active ? 'eye' : 'closed-eye'} class={css.menuItemIcon} />
									<span>{loc.name}</span>
								</div>
							</Button>
						</li>
					))}
				</menu>
			</section>
		</>
	);
};

const MenuBar: Component = () => {
	const [menuVisible, setMenuVisible] = createSignal(false);
	const [searchVisible, setSearchVisible] = createSignal(false);
	const [searchInput, setSearchInput] = createSignal<HTMLInputElement>();
	const handlers = {
		openMenu: () => {
			setMenuVisible(true);
		},
		closeMenu: () => {
			setMenuVisible(false);
		},
		openSearch: () => {
			setSearchVisible(true);
			searchInput()?.focus();
		},
		closeSearch: () => {
			setSearchVisible(false);
		},
		search: (event: SubmitEvent) => {
			event.preventDefault();
			const target = event.target as HTMLFormElement;
			const formData = new FormData(target);
			const search = formData.get('search') as string;
			if (search.trim() === '') return;
			console.log(formData.get('search'));
		},
	};
	return (
		<header class={css.menuBar}>
			<Button icon="bars" category="menu" onClick={handlers.openMenu}>
				Menu
			</Button>
			<section class={css.mainMenuSection} inert={!menuVisible() || undefined}>
				<div class={css.mainMenuHeader}>
					<header>
						<h1 class={css.mainMenuHeading}>Spring Fest</h1>
					</header>
					<Button icon="x-circle" category="menu" onClick={handlers.closeMenu}>
						Close
					</Button>
				</div>
				<Menu />
			</section>
			<div class={css.dateWrapper}>
				<div class={css.dateContainer}>
					<time datetime="2023-07-27">
						<span class={css.day}>Thursday</span>
						<span class={css.date}>7/27/2023</span>
					</time>
					<Button icon="calendar">Choose Date</Button>
				</div>
			</div>
			<Button icon="magnifier" category="menu" aria-controls="Searching" onClick={handlers.openSearch}>
				Search
			</Button>
			<form
				id="Search"
				class={css.searchForm}
				onSubmit={handlers.search}
				onKeyDown={(event) => event.key === 'Escape' && handlers.closeSearch()}
				inert={!searchVisible() || undefined}
			>
				<label class={css.search}>
					<input placeholder="Search events..." name="search" class={css.searchInput} ref={setSearchInput} />
					<Button icon="magnifier" category="menu">
						Search
					</Button>
					<Button icon="x-circle" category="menu" type="button" onClick={handlers.closeSearch}>
						Close
					</Button>
				</label>
			</form>
			<Button icon="stacked-windows" category="menu">
				Restore
			</Button>
		</header>
	);
};

export default MenuBar;
