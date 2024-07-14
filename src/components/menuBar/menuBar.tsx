import { createSignal, type Component } from 'solid-js';
import css from './menuBar.module.css';
import Button from '../button/button';

const Menu: Component = () => {
	const [searching, setSearching] = createSignal(false);
	const [searchInput, setSearchInput] = createSignal<HTMLInputElement>();
	const handlers = {
		openSearch: () => {
			setSearching(true);
			searchInput()?.focus();
		},
		closeSearch: () => {
			setSearching(false);
		},
		search: (event: SubmitEvent) => {
			event.preventDefault();
			const target = event.target as HTMLFormElement;
			const formData = new FormData(target);
			const search = formData.get('search') as string;
			if (search.trim() === '') {
				return;
			}
			console.log(formData.get('search'));
		},
	};
	return (
		<header class={css.menu}>
			<Button icon="bars" category="menu">
				Menu
			</Button>
			<menu style="display: none;">menu placeholder</menu>
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
				inert={!searching() || undefined}
				aria-hidden={!searching()}
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

export default Menu;
