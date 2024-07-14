import { createSignal, type Component } from 'solid-js';
import css from './menuBar.module.css';
import Button from '../button/button';

const Menu: Component = () => {
	return (
		<menu class={css.menu}>
			<li></li>
		</menu>
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
			<section class={css.menuSection} inert={!menuVisible() || undefined}>
				<div class={css.menuHeader}>
					<header>
						<h1 class={css.menuHeading}>Spring Fest</h1>
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
