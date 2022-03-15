'use strict';const DEFAULT_FLOOR_PLAN = {
  title: 'Venue',
  imageSrc: '',
  dimensions: {
    height: 600,
    width: 800
  },
  clickableAreas: []
};
const DEFAULT_GUIDE = {
  locations: [],
  events: [],
  floorPlan: DEFAULT_FLOOR_PLAN,
  rollOverTime: '12:00 AM'
};
const FAVORITES_KEY = 'FAVORITE_EVENTS';
const DEFAULT_ADD_FAVORITE = async event => {
  const favoriteEvents = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
  favoriteEvents.push(event);
  const eventsJSON = JSON.stringify(favoriteEvents);
  localStorage.setItem(FAVORITES_KEY, eventsJSON);
  return favoriteEvents;
};
const DEFAULT_REMOVE_FAVORITE = async event => {
  const favoriteEvents = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
  const removeIndex = favoriteEvents.findIndex(({
    location: _location,
    start,
    name
  }) => {
    const {
      location: cLocation,
      start: cStart,
      name: cName
    } = event;
    return _location === cLocation && start === cStart && name === cName;
  });
  favoriteEvents.splice(removeIndex, 1);
  const eventsJSON = JSON.stringify(favoriteEvents);
  localStorage.setItem(FAVORITES_KEY, eventsJSON);
  return favoriteEvents;
};
const DEFAULT_GET_FAVORITES = async () => {
  const favoriteEvents = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
  return favoriteEvents;
};
const NOW = Date.now(); // date in milliseconds

const HOUR = 1000 * 60 * 60; // milliseconds * seconds * minutes

const DEFAULT_EVENT = {
  start: NOW,
  end: NOW + HOUR,
  location: '(not provided)',
  name: '(no name)',
  host: '(not provided)',
  category: '(not provided)',
  description: '(no description)'
};
const DEFAULT_TIMES = {
  days: [],
  interval: 60
};
const DEFAULT_BREAKPOINT = '50em';const getType = val => {
  if (val === null) return 'null';
  if (typeof val === 'object') return val.constructor.name.toLowerCase();
  return typeof val;
};
const checkType = (val, type) => {
  const validString = getType(type) === 'string';
  const validArray = getType(type) === 'array' && type.every(t => getType(t) === 'string');
  if (!validString && !validArray) throw '`checkType()` expects either a string or array of strings in the second argument';
  if (validString) return getType(val) === type;
  if (validArray) return type.some(t => getType(val) === t);
};
const isObject = obj => checkType(obj, 'object');
const checkFilterType = (filter = {}) => {
  if ('after' in filter && !checkType(filter.after, ['number', 'date'])) throw 'The `after` field expects a number or date';
  if ('before' in filter && !checkType(filter.before, ['number', 'date'])) throw 'The `before` field expects a number or date';
  if ('locations' in filter && !checkType(filter.locations, 'array')) throw 'The `locations` field expects an array';
  if ('search' in filter && !checkType(filter.search, ['string', 'regexp'])) throw 'The `search` field expects a string or regular expression';
  return true; // indicate success
};
/**
 * This is the most efficient way to clear HTML, much faster than innerHTML.
 * @param {HTMLElement} element - the DOM element we want to empty
 */

const clearHTML = element => {
  let i = element.childNodes.length;

  while (i--) {
    element.removeChild(element.lastChild);
  }
};
/**
 * This is the most efficient way to parse HTML, much faster than innerHTML.
 *
 * @param {string} htmlStr - a string containing only raw HTML
 */

const parseHTML = htmlStr => {
  const range = document.createRange();
  range.selectNode(document.body); // required in Safari

  return range.createContextualFragment(htmlStr);
};
/**
 * This helps us avoid trailing commas when mapping template literals.
 * @param {Array} arr - the array to iterate
 * @param {function} callback - the callback for each iteration; should return a string or stringifiable value
 */

const mapString = (arr, callback) => arr.map(callback).join('');
/**
 * Rounds a date to the nearest given minute
 * @param {Date|number|string} _date - The date to round (or anything that can be parsed as a date)
 * @param {number} nearestMinute - The nearest minute to round to (15 by default)
 */

const roundMinutes = (_date, nearestMinute = 15) => {
  const date = new Date(_date);
  const roundedMinutes = Math.round(date.getMinutes() / nearestMinute) * nearestMinute;
  date.setMinutes(roundedMinutes);
  return date;
};
const WholeNumber = num => Number(num.toFixed());
/**
 * Gets the name of the day based on the index (typically returned by `date.getDay()`)
 * @param {number} idx - The index of the day of the week
 * @param {boolean} short - Whether to abbreviate the day names or not
 * @returns {string} - The name of the day of the week
 */

const getDay = (idx, short = false) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const shortDays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  return short ? shortDays[idx] : days[idx];
};
const getDateInfo = _date => {
  const date = new Date(_date);
  return {
    time: date.toLocaleTimeString('en-US', {
      timeStyle: 'short'
    }),
    day: getDay(date.getDay()),
    date: date.toLocaleDateString()
  };
};
/**
 * Generates a string representing javascript, which can be used in the
 * HTML templates of native web components.
 * 
 * EXAMPLE:
 * ```js
 *   const open = true
 *   const html = `<button onclick="this.getRootNode().host.openDialog(${open})">Click me</button>`
 * ```
 * 
 * versus
 * 
 * ```js
 *   const open = true
 *   const html = `<button onclick="${runMethod('openDialog', open)}">Click me</button>`
 * ```
 * 
 * @param {string} name - The name of the component method to run
 * @param {...*} args - The arguments to be used in the function call (objects will be converted to JSON and encoded as a URI component)
 * @returns {string} - A string representing JavaScript code
 */

const runMethod = (name, ...args) => {
  const mapType = value => {
    // preserve keywords that can be used in html attribute handlers
    if (value === 'event' || value === 'this') return value; // handle the string rendering of arguments based on their type

    const type = getType(value);
    const map = {
      // stringify objects to avoid [object Object] and encode to avoid double quote conflicts
      object: `\`${encodeURIComponent(JSON.stringify(value))}\``,
      // wrap strings in backticks in case they're multiline
      string: `\`${value}\``,
      // all other types are rendered without quotes
      default: String(value)
    };
    return map[type] || map.default;
  };

  return `this.getRootNode().host.${name}(${args.length ? `${[...args].map(mapType)}` : 'event'})`;
};
const getEventId = ({
  location,
  name,
  start: _start
}) => {
  const snip = s => s.replace(/[^a-zA-Z0-9]/g, '');

  const date = new Date(_start);
  const start = `${date.toLocaleDateString()}-${date.toLocaleTimeString()}`;
  return `${snip(location)}-${snip(name)}-${snip(start)}`;
};
const search$1 = (_input, _text) => {
  // * replace variation characters (for example, é becomes e)
  // * remove anything that isn't alphanumeric (including spaces)
  //     ^ this lets "megaman" match "mega man"
  // * use lower case for case-insensitive search
  const formatForSimilarMatch = str => str?.normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase(); // first try matching the entire query


  const input = formatForSimilarMatch(_input);
  const text = formatForSimilarMatch(_text);
  if (text.search(input) !== -1) return true;
  if (input.search(text) !== -1) return true; // if that fails, try each word

  return _input.split(/\s+/g).some(input => text.search(formatForSimilarMatch(input)) !== -1);
};
const trim = str => str.length > 40 ? str.slice(0, 36) + '...' : str;
const getMarkerCoords = (marker, clickableAreas) => {
  const clickableArea = clickableAreas.find(({
    location
  }) => marker === location);
  const allX = clickableArea.coords.filter((_, idx) => idx % 2 === 0);
  const allY = clickableArea.coords.filter((_, idx) => idx % 2 !== 0);
  const minX = Math.min(...allX);
  const minY = Math.min(...allY);
  const maxX = Math.max(...allX);
  const maxY = Math.max(...allY);
  const x = (minX + maxX) / 2;
  const y = (minY + maxY) / 2;
  return [x, y];
};
const getLastTimeInThreshold = (currentDate, allDates, threshold = '12:00 AM') => {
  const lastInCurrentDay = Math.max(...allDates.filter(t => t.getDate() === currentDate.getDate()));
  if (threshold === '12:00 AM') return new Date(lastInCurrentDay);
  const nextDate = new Date(currentDate);
  nextDate.setDate(currentDate.getDate() + 1);
  nextDate.setTime(new Date(`${nextDate.toLocaleDateString()} ${threshold}`).getTime());
  const allTimesNextDay = allDates.filter(t => t.getDate() === nextDate.getDate());
  const lastInNextDay = Math.max(...allTimesNextDay.filter(t => t.getTime() <= nextDate.getTime()));
  return new Date(lastInNextDay > 0 ? lastInNextDay : lastInCurrentDay);
};const state = {
  // utilities for synchronous actions after loading state
  _hasFetched: false,

  get hasFetched() {
    return this._hasFetched;
  },

  set hasFetched(bool) {
    this._hasFetched = bool;
    if (bool === false) return false;
    this.fetchQueue.forEach(resolve => resolve());
    return true;
  },

  fetchQueue: [],

  waitForFetch() {
    return new Promise(resolve => {
      if (this.hasFetched) resolve();else this.fetchQueue.push(() => resolve());
    });
  },

  // default guide
  guide: DEFAULT_GUIDE,
  // default favorite functionality
  addFavorite: DEFAULT_ADD_FAVORITE,
  removeFavorite: DEFAULT_REMOVE_FAVORITE,
  getFavorites: DEFAULT_GET_FAVORITES,

  // get locations and add any missed from events dynamically
  get locations() {
    const locations = this.guide?.locations ?? [];
    const events = this.guide?.events ?? [];
    return [...events.reduce((locations, event) => {
      if (!checkType(event, 'object')) return locations;
      if (!checkType(event.location, 'string')) return locations;
      if (!locations.has(event.location)) locations.add(event.location);
      return locations;
    }, new Set(locations))];
  },

  // get times from events dynamically
  get times() {
    const events = this.guide?.events ?? [];
    const threshold = this.guide?.rollOverTime ?? '12:00 AM';
    const allTimes = [...events.reduce((times, event) => {
      if (!checkType(event, 'object')) return times;
      if (!checkType(event.start, ['number', 'date'])) return times;
      if (!checkType(event.end, ['number', 'date'])) return times;
      times.add(roundMinutes(event.start));
      times.add(roundMinutes(event.end));
      return times;
    }, new Set())].sort();
    const earliestTime = new Date(Math.min(...allTimes));
    const latestTime = new Date(Math.max(...allTimes));
    const interval = allTimes.reduce((interval, date) => {
      if (interval !== 15) {
        const minutes = date.getMinutes();
        if (minutes === 30) interval = 30;
        if (minutes === 15 || minutes === 45) interval = 15;
      }

      return interval;
    }, 0);

    const getTimeObject = date => ({
      date,
      timeString: date.toLocaleTimeString('en-US', {
        timeStyle: 'short'
      })
    });

    const getFullDay = time => `${getDay(time.getDay())} ${time.toLocaleDateString()}`;

    let days = {
      [getFullDay(earliestTime)]: [getTimeObject(earliestTime)]
    };
    let prevTime = earliestTime;
    let currentDay = getFullDay(prevTime);

    while (prevTime < latestTime) {
      const lastTimeInDay = getLastTimeInThreshold(prevTime, allTimes, threshold);
      let currentTime = null;

      if (Number(lastTimeInDay) === Number(prevTime)) {
        currentTime = new Date(allTimes.find(time => time > prevTime));
        currentDay = getFullDay(currentTime);
        days[currentDay] = [getTimeObject(currentTime)];
      } else {
        currentTime = new Date(prevTime);
        const intervalInMs = interval * 1000 * 60;
        currentTime.setTime(currentTime.getTime() + intervalInMs);
        days[currentDay].push(getTimeObject(currentTime));
      }

      prevTime = currentTime;
    }

    return {
      days,
      interval
    };
  }

};// with imports between two separate bundles.

const getState = () => {
  globalThis.__thunderEvents__sharedState = globalThis.__thunderEvents__sharedState // existing state
  ?? state; // initialize if none exists already

  return globalThis.__thunderEvents__sharedState;
};

const getEvents = async (_filters = {}) => {
  const state = getState();
  await state.waitForFetch();
  if (!isObject(_filters)) throw '`getEvents()` expects an object in the first argument';
  const {
    include: _include = {},
    exclude: _exclude = {}
  } = _filters;
  checkFilterType(_include); // throws if invalid

  checkFilterType(_exclude); // throws if invalid

  const filters = { ..._filters,
    include: { ..._include,
      after: _include.after ? Number(_include.after) : 0,
      before: _include.before ? Number(_include.before) : Infinity
    },
    exclude: { ..._exclude,
      after: _exclude.after ? Number(_exclude.after) : Infinity,
      before: _exclude.before ? Number(_exclude.before) : 0
    }
  };
  const {
    include = {},
    exclude = {}
  } = filters;
  return state.guide.events.filter(event => {
    // filter within time range
    if (event.start < include.after) return false;
    if (event.start > exclude.after) return false;
    if (event.end > include.before) return false;
    if (event.end < exclude.before) return false; // filter by location

    if ('locations' in include && !contains(include.locations, event.location)) return false;
    if ('locations' in exclude && contains(exclude.locations, event.location)) return false; // filter by name

    if ('search' in include && !contains(event.name, include.search)) return false;
    if ('search' in exclude && contains(event.name, exclude.search)) return false; // if all previous checks pass, keep this event in the array

    return true;
  });
};

const getLocations = async () => {
  const state = getState();
  await state.waitForFetch();
  return state.locations;
};

const getTimes = async () => {
  const state = getState();
  await state.waitForFetch();
  return state.times;
};

const getFloorPlan = async () => {
  const state = getState();
  await state.waitForFetch();
  return state.guide.floorPlan;
};

const addFavorite = async event => {
  const state = getState();
  const favorites = await state.addFavorite(event);
  return favorites;
};

const removeFavorite = async event => {
  const state = getState();
  const favorites = await state.removeFavorite(event);
  return favorites;
};

const getFavorites = async () => {
  const state = getState();
  const favorites = await state.getFavorites();
  return favorites;
};const getActiveEvent = event => ({ ...event,
  start: new Date(event.start),
  end: new Date(event.end)
}); // gets all data needed for one cell, so the logic doesn't clutter the template

const getCellData = ({
  events,
  spanState,
  date,
  interval,
  _location,
  currentTime
}) => {
  // find an event starting at this time
  const _event = events.find(e => Number(e.start) === Number(date) && e.location === _location); // handle events that already started before the start time


  const event = !_event ? events.find(e => Number(e.end) > Number(date) && Number(e.start) < Number(currentTime) && e.location === _location) : _event;
  const hasStarted = event ? event.start < currentTime : false;
  const eventName = event ? event.name : '';
  const cellType = event ? 'data' : 'data-empty';

  const getStart = event => hasStarted ? currentTime : event.start;

  const duration = event ? WholeNumber((event.end - getStart(event)) / 1000 / 60) : 0;
  const span = duration ? WholeNumber(duration / interval) : 1;
  const blank = spanState[_location] > 0; // handle spanState to prevent extra columns

  if (blank) --spanState[_location];else if (span > 1) spanState[_location] = span - 1; // return all necessary information included in the template

  return {
    eventName,
    cellType,
    span,
    blank,
    event,
    hasStarted
  };
};var dialogPolyfill$1 = /* css */
`
dialog {
  position: absolute;
  left: 0; right: 0;
  width: -moz-fit-content;
  width: -webkit-fit-content;
  width: fit-content;
  height: -moz-fit-content;
  height: -webkit-fit-content;
  height: fit-content;
  margin: auto;
  border: solid;
  padding: 1em;
  background: white;
  color: black;
  display: block;
}

dialog:not([open]) {
  display: none;
}

dialog + .backdrop {
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0;
  background: rgba(0,0,0,0.1);
}

._dialog_overlay {
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0;
}

dialog.fixed {
  position: fixed;
  top: 50%;
  transform: translate(0, -50%);
}
`;var dialog = /* css */
`
.pg-dialog {
  background-color: var(--color-header);
  bottom: 0;
  border: 0 solid;
  border-radius: 0.5rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  color: var(--color-header-content);
  height: max-content;
  left: 0;
  margin: auto;
  max-height: 100vh;
  max-width: 40rem;
  min-height: 40rem;
  position: fixed;
  right: 0;
  top: 0;
  width: calc(100% - 0.5rem);
  z-index: 2;
}
.pg-dialog + .backdrop {
  background-color: rgba(0, 0, 0, 0.8);
}
/* ::backdrop must be kept separate because of safari */
.pg-dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.8);
}
.pg-dialog-header {
  display: grid;
  grid-template-columns: 1fr auto;
}
.pg-dialog-title {
  margin: 0;
}
.pg-dialog-details {
  padding-top: 1rem;
}
.pg-dialog-select {
  border: 0 solid;
  border-radius: 0.3rem;
  padding: 0.5rem;
}
.pg-dialog-close {
  align-items: center;
  background-color: var(--color-header-content);
  border: 0 solid;
  border-radius: 50%;
  color: var(--color-header);
  cursor: pointer;
  display: flex;
  height: 2rem;
  justify-content: center;
  width: 2rem;
}
.pg-dialog-menu {
  display: grid;
  gap: 0.5rem;
  margin: 0 auto;
  max-width: 30rem;
  padding: 2rem 2rem 0;
}
.pg-dialog-menu-title {
  width: max-content;
  margin: 0 auto;
}
.pg-dialog-menu-item {
  align-items: center;
  background-color: var(--color-cell);
  border: none;
  box-shadow: 0 0 1.2rem rgba(0, 0, 0, 0.5);
  color: var(--color-content);
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  padding: 1rem 0.5rem;
}
.pg-dialog-menu-item--input,
.pg-dialog-menu-input {
  cursor: text;
}
.pg-dialog-menu-input {
  background-color: transparent;
  border: none;
}
.pg-dialog-menu-input--time {
  width: 10.2rem;
}
.pg-dialog-menu-special-item {
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 2fr 1fr;
}
.pg-dialog-body {
  display: grid;
  grid-auto-rows: auto;
  grid-template-rows: auto minmax(0, 1fr);
  height: 100%;
  max-height: calc(100vh - 2rem);
  min-height: 38rem;
  overflow: hidden;
  position: relative;
}
.pg-dialog-body:before,
.pg-dialog-body:after {
  content: '\\02771';
  color: var(--color-header);
  display: inline-block;
  font-size: 3rem;
  height: 3rem;
  left: 0;
  line-height: 3rem;
  margin: auto;
  position: absolute;
  right: 0;
  width: 3rem;
}
.pg-dialog-body:before {
  top: 1rem;
  transform: rotate(-90deg);
}
.pg-dialog-body:after {
  bottom: -1.8rem;
  transform: rotate(90deg);
}
.pg-dialog-content {
  overflow: auto;
  padding-bottom: 2rem;
}
.pg-dialog-content--text-container,
.pg-dialog-footer {
  background-color: var(--color-cell);
  border: 0 solid;
  border-radius: 0.5rem;
  color: var(--color-content);
  margin: 2rem 0 0;
  text-align: center;
}
.pg-dialog-content--text-container:after {
  background-image: linear-gradient(transparent, var(--color-cell) 90%);
  bottom: -2rem;
  content: '';
  display: block;
  height: 4rem;
  left: 0;
  position: sticky;
  width: 100%;
}
.pg-dialog-paragraph {
  margin: 0;
  padding: 1rem;
}
.pg-dialog-footer {
  padding: 1rem;
}
`;var theme = /* css */
`
:host {

  /* general fonts */
  --font: inherit;
  --font-secondary: var(--font);

  /* specific fonts */
  --font-header: var(--font);
  --font-content: var(--font-secondary);
  --font-column-header: var(--font-header);
  --font-row-header: var(--font-header);

  /* padding */
  --padding-cell: 1rem 2rem;
  --padding-header: var(--padding-cell);
  --padding-column-header: var(--padding-header);
  --padding-row-header: var(--padding-header);

  /* general colors */
  --color-primary: lightsteelblue;
  --color-primary-contrast: black;
  --color-secondary: steelblue;
  --color-secondary-contrast: white;
  --color-tertiary: midnightblue;
  --color-tertiary-contrast: white;

  /* specific colors */
  --color-background: var(--color-tertiary);
  --color-foreground: var(--color-tertiary-contrast);
  --color-cell: var(--color-primary);
  --color-empty: transparent;
  --color-content: var(--color-primary-contrast);
  --color-header: var(--color-secondary);
  --color-header-content: var(--color-secondary-contrast);
  --color-column-header: var(--color-header);
  --color-column-header-content: var(--color-header-content);
  --color-row-header: var(--color-header);
  --color-row-header-content: var(--color-header-content);
  --color-corner: var(--color-header);
  --color-corner-content: var(--color-header-content);

  /* loading spinner */
  --color-loading-primary: var(--color-primary);
  --color-loading-secondary: var(--color-secondary);
  --size-loader: 5rem;
}

/* remove browser defaults so fonts can be fully customized */
:host, button, input {
  font-family: var(--font-secondary);
  font-size: inherit;
}
`;var loading = /* css */
`
.pg-loading {
  height: 10rem;
  width: 100%;
  position: relative;
  z-index: 1;
}
.pg-loading:before,
.pg-loading:after {
  bottom: 0;
  border-radius: 50%;
  content: '';
  display: block;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(359deg); }
}
.pg-loading:before {
  animation: spin 1s linear infinite;
  background-image: conic-gradient(var(--color-loading-primary), var(--color-loading-secondary));
  border: 0.4rem solid var(--color-loading-primary);
  height: var(--size-loader);
  width: var(--size-loader);
  z-index: 1;
}
.pg-loading:after {
  background-color: var(--color-loading-primary);
  border: 0 solid;
  height: calc(var(--size-loader) - 1rem);
  width: calc(var(--size-loader) - 1rem);
  z-index: 2;
}
`;var mobile = /* css */
`
.pg-cell-wrapper--column-header,
.pg-cell-wrapper--data,
.pg-cell-wrapper--data-empty {
  display: none;
}
.pg-cell-wrapper--column-header-active,
.pg-cell-wrapper--column-header-time,
.pg-cell-wrapper--data-active,
.pg-cell-wrapper--data-time,
.pg-cell-wrapper--data-favorite,
.pg-cell-wrapper--data-search,
.pg-cell-wrapper--data-empty-time,
.pg-cell-wrapper--data-empty-active {
  filter: none;
  display: revert;
  min-width: 0;
}
.pg-cell--data {
  margin: 0;
}
.pg-cell--data-search,
.pg-cell--data-favorite {
  margin: auto;
}
.pg-floor-plan-header {
  grid-template-areas:
    "options title"
    "view view";
}
.pg-floor-plan-menu-section {
  grid-template-columns: auto 1fr;
  gap: 1rem;
}
.pg-cell-wrapper--corner,
.pg-cell-wrapper--row-header-time,
.pg-cell-wrapper--row-header-time:after {
  transition: all 0.5s;
}
.pg-table-wrapper--scrolled .pg-cell-wrapper--row-header-time {
  cursor: pointer;
}
.pg-table-wrapper--scrolled .pg-cell-wrapper--row-header-time:after {
  bottom: 0;
  content: '\\25C0';
  display: inline-block;
  font-size: 1rem;
  height: 1rem;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}
.pg-table-wrapper--scrolled .pg-cell-wrapper--corner-collapsed,
.pg-table-wrapper--scrolled .pg-cell-wrapper--row-header-collapsed {
  left: -9.5rem;
}
.pg-table-wrapper--scrolled .pg-cell-wrapper--row-header-collapsed:after {
  transform: rotate(180deg);
}
.pg-table-wrapper--scrolled .pg-cell-wrapper--row-header-collapsed .pg-cell--row-header {
  pointer-events: none;
}
.pg-table-wrapper--scrolled .pg-cell-wrapper--corner-collapsed {
  padding-right: 0;
}
.pg-table-wrapper--scrolled .pg-cell-wrapper--corner-collapsed .pg-corner-text {
  order: -1;
}
`;var search = /* css */
`
.pg-search-bar {
  background-color: var(--color-background);
  display: grid;
  gap: 0.2rem;
  grid-template-columns: 1fr auto;
  margin: 0;
  padding: 0.2rem 0.2rem 0;
}
.pg-search-icon {
  border: 0.2rem solid;
  border-radius: 50%;
  display: block;
  height: 0.8rem;
  position: relative;
  transform: translate(-0.15rem, -0.1rem);
  width: 0.8rem;
}
.pg-search-icon:after {
  background-color: var(--color-content);
  bottom: -0.2rem;
  content: '';
  display: block;
  height: 0.2rem;
  width: 0.5rem;
  position: absolute;
  right: -0.4rem;
  transform: rotate(45deg);
}
.pg-search-input,
.pg-search-button {
  align-items: center;
  background-color: var(--color-cell);
  border: none;
  box-shadow: 0 0 1.2rem rgba(0, 0, 0, 0.5);
  color: var(--color-content);
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  padding: 1rem 0.5rem;
}
.pg-search-input {
  cursor: text;
}
.pg-search-input,
.pg-search-button {
  padding: 0.5rem 1rem;
}
.pg-search-input {
  min-width: 0;
}
`;var table = /* css */
`
.pg-table-wrapper {
  background-color: var(--color-background);
  display: grid;
  height: 60rem;
  max-height: calc(100vh - 6rem);
  max-width: 100%;
  margin-bottom: 1rem;
  overflow: auto;
  position: relative;
}
.pg-table {
  width: 100%;
}
.pg-cell-wrapper {
  background-color: var(--color-cell);
  font-family: var(--font-content);
  padding: var(--padding-cell);
  position: relative;
  text-align: center;
}
.pg-cell-wrapper--overflow:before {
  content: '\\2039';
  font-size: 2.5rem;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  line-height: 2.5rem;
}
.pg-cell-wrapper--row-header,
.pg-cell-wrapper--corner {
  border-right: 0.1rem solid var(--color-background);
  left: 0;
  position: sticky;
  width: 0; /* columns size to the minimum width */
  z-index: 1;
}
.pg-cell-wrapper--corner {
  background-color: var(--color-corner);
  border-bottom: 0.1rem solid var(--color-background);
  color: var(--color-corner-content);
  cursor: pointer;
  top: 0;
  z-index: 2;
}
.pg-cell-wrapper--row-header {
  background-color: var(--color-row-header);
  box-shadow: 0 0.2rem 0 var(--color-background);
  color: var(--color-row-header-content);
  font-family: var(--font-row-header);
  padding: var(--padding-row-header);
  text-align: right;
}
.pg-cell--corner,
.pg-cell--row-header {
  width: 9rem;
}
.pg-cell--row-header {
  cursor: pointer;
  user-select: none;
}
.pg-cell-wrapper--row-header .pg-cell {
  align-items: center;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: auto 1fr;
}
.pg-cell--data {
  position: sticky;
  left: 14rem;
  margin: auto;
  width: fit-content;
  z-index: 0;
  top: 8rem;
}
.pg-cell--data-search,
.pg-cell--data-favorite {
  display: grid;
  left: 0;
  justify-content: center;
  margin: auto;
}
.pg-search-result-name {
  font-weight: bold;
  padding-bottom: 0.8rem;
}
.pg-inline-text {
  display: inline-block;
}
.pg-cell--corner {
  align-items: center;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: auto auto;
  justify-content: center;
  margin: auto;
}
.pg-cell-wrapper--column-header {
  background-color: var(--color-column-header);
  border-bottom: 0.1rem solid var(--color-background);
  color: var(--color-column-header-content);
  font-family: var(--font-column-header);
  padding: var(--padding-column-header);
  position: sticky;
  top: 0;
  z-index: 1;
}
.pg-cell-wrapper--column-header-location {
  cursor: pointer;
}
.pg-cell-wrapper--column-header-active-location,
.pg-cell-wrapper--column-header-active-time {
  filter: brightness(1.3);
}
.pg-cell-wrapper--column-header-active-time > .pg-cell {
  grid-template-columns: 1fr;
  gap: 0;
}
.pg-cell--column-header {
  align-items: center;
  display: grid;
  gap: 1rem;
  grid-template-columns: auto 1fr;
  justify-content: center;
  min-width: 8rem;
}
.pg-cell-wrapper--data {
  cursor: pointer;
}
.pg-cell-wrapper--data-empty {
  background-color: var(--color-empty);
}
.pg-time {
  display: inline-block;
  font-weight: bold;
}
`;var icons = /* css */
`
.pg-favorite-icon {
  font-size: 2rem;
  font-style: normal;
  line-height: 2rem;
}
.pg-more-icon {
  background-color: var(--color-header);
  border: 0.8rem solid var(--color-header-content);
  display: block;
  position: relative;
  vertical-align: middle;
  z-index: 0;
}
.pg-more-icon,
.pg-more-icon:before,
.pg-more-icon:after {
  border-radius: 50%;
  height: 0.4rem;
  width: 0.4rem;
}
.pg-more-icon:before,
.pg-more-icon:after {
  background-color: var(--color-header);
  border: 0 solid;
  content: '';
  display: block;
  position: absolute;
  top: 0;
  z-index: 1;
}
.pg-more-icon:before {
  left: -0.5rem;
}
.pg-more-icon:after {
  right: -0.5rem;
}
.pg-close-icon {
  height: 100%;
  display: block;
  position: relative;
  width: 100%;
}
.pg-close-icon:before,
.pg-close-icon:after {
  background-color: var(--color-header);
  bottom: 0;
  content: '';
  display: block;
  height: 1.3rem;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 0.2rem;
}
.pg-close-icon:before {
  transform: rotate(45deg);
}
.pg-close-icon:after {
  transform: rotate(-45deg);
}
.pg-map-icon {
  --color: var(--color-header-content);
  display: inline-block;
  height: 1.5rem;
  width: 1.5rem;
  margin-bottom: 0.5rem;
  position: relative;
  vertical-align: middle;
  z-index: 0;
}
.pg-map-icon:before {
  border: 0.37rem solid var(--color);
  border-radius: 50%;
  content: '';
  display: block;
  height: 0.75rem;
  left: 0;
  position: absolute;
  top: 0;
  width: 0.75rem;
  z-index: 1;
}
.pg-map-icon:after {
  border: 0.5rem solid var(--color);
  border-top-color: transparent;
  border-left-color: transparent;
  border-radius: 20%;
  bottom: 0;
  content: '';
  display: block;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  transform: translateY(0.3rem) scaleX(0.7) rotate(45deg);
  z-index: 0;
}
`;var floorPlan = /* css */
`
.pg-floor-plan-wrapper {
  background-color: var(--color-background);
  margin-bottom: 1rem;
  height: 60rem;
  max-height: calc(100vh - 6rem);
  overflow: auto;
  position: relative;
}
.pg-floor-plan-header {
  align-items: center;
  background-color: var(--color-header);
  border: 0.2rem solid var(--color-background);
  display: grid;
  grid-template-areas: "options view title";
  grid-template-columns: auto 1fr auto;
  position: sticky;
  right: 0;
  top: 0;
  z-index: 1;
}
.pg-floor-plan-menu-button {
  border: 0 solid;
  background-color: transparent;
  cursor: pointer;
  padding: 1rem 1.3rem;
}
.pg-floor-plan-title {
  color: var(--color-header-content);
  margin: 0;
  padding: 1rem;
  text-align: right;
}
.pg-floor-plan-container {
  overflow: auto;
  padding: 0rem 0.2rem 0.2rem;
  position: relative;
}
.pg-floor-plan-image-wrapper {
  margin: 0 auto;
  position: relative;
  width: 100%;
}
.pg-floor-plan-image {
  display: block;
  margin: 0 auto;
  object-fit: contain;
  width: 100%;
  height: auto;
}
.pg-floor-plan-image-wrapper--interactive {
  width: min-content;
}
.pg-floor-plan-image--interactive {
  width: unset;
  height: unset;
}
.pg-overlay-image {
  display: block;
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.pg-floor-plan-marker {
  --x: 0;
  --y: 0;
  align-items: center;
  background-image: radial-gradient(white 25%, rgba(255, 0, 0, 0.2) 25%);
  border: 0.1rem solid red;
  border-radius: 50%;
  display: grid;
  left: var(--x);
  pointer-events: none;
  position: absolute;
  top: var(--y);
  transform: translate(-50%, -50%);
  height: 8rem;
  justify-items: center;
  width: 8rem;
}
.pg-floor-plan-marker > .pg-map-icon {
  --color: red;
}
.pg-floor-plan-menu {
  align-items: center;
  color: var(--color-header-content);
  display: contents;
  margin: 0;
}
.pg-floor-plan-menu-section {
  align-items: center;
  display: grid;
  gap: 0.5rem;
  grid-area: view;
  justify-content: center;
  left: 0;
  margin: 0 auto;
  padding: 0.5rem;
}
.pg-floor-plan-interactive-button {
  align-items: center;
  background-color: var(--color-cell);
  border: none;
  box-shadow: 0 0 1.2rem rgba(0, 0, 0, 0.5);
  color: var(--color-content);
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  padding: 1rem 2rem;
}
.pg-floor-plan-message {
  background-image: linear-gradient(to right, transparent, white, transparent);
  opacity: 0;
  left: 0;
  pointer-events: none;
  position: fixed;
  text-align: center;
  transition: opacity 0.5s;
  width: 100vw;
  z-index: 3;
}
.pg-floor-plan-message--active {
  opacity: 1;
}
`;const getStyles = breakpoint =>
/* css */
`

/* browser defaults for dialog element */
${dialogPolyfill$1}

.pg-header {
  background-color: var(--color-background);
  display: grid;
  grid-template-columns: 1fr auto;
  height: 3.5rem;
}

.pg-maximize-button {
  background-color: var(--color-header);
  border: 0.2rem solid var(--color-background);
  border-left-width: 0;
  border-bottom-width: 0;
  color: var(--color-header-content);
  cursor: pointer;
  margin: 0;
}

.pg-maximized {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}

.pg-maximized .pg-table-wrapper,
.pg-maximized .pg-floor-plan-wrapper {
  height: calc(100vh - 3.5rem);
  max-height: none;
}

${loading}
${theme}
${search}
${table}
${icons}
${dialog}
${floorPlan}

/* apply mobiles styles within the provided breakpoint */
@media (max-width: ${breakpoint}) {
  ${mobile}
}
`;const renderSortDialog = ({
  hasFloorPlan,
  locations,
  times,
  activeDay,
  activeTime: _activeTime
}, breakpoint = DEFAULT_BREAKPOINT) => {
  // only show location list if the columns are collapsed
  const beyondThreshold = !window.matchMedia(`(max-width: ${breakpoint})`).matches;
  const {
    days,
    interval
  } = times || DEFAULT_TIMES;

  const getTimeValue = date => date.toLocaleTimeString([], {
    hour12: false,
    timeStyle: 'short'
  });

  const activeTime = getTimeValue(_activeTime);
  const currentTimes = days[activeDay];
  const minTime = getTimeValue(currentTimes[0].date);
  const maxTime = getTimeValue(currentTimes[currentTimes.length - 1].date);
  const step = interval * 60;
  return (
    /* html */
    `
    <section class="pg-dialog-body">
      <header class="pg-dialog-header">
        <h1 class="pg-dialog-title">Options</h1>
        <button class="pg-dialog-close" title="Close" onclick="${runMethod('toggleSortDialog', false)}"><i class="pg-close-icon" title="Close"></i></button>
      </header>
      <section class="pg-dialog-content">
        <menu class="pg-dialog-menu">
          <button class="pg-dialog-menu-item" onclick="${runMethod('selectSortBy', 'favorites')}">
            <i class="pg-favorite-icon" title="View Favorites">&starf;</i>
            <span>View Favorites</span>
          </button>
          ${hasFloorPlan ?
    /* html */
    `
              <button class="pg-dialog-menu-item" onclick="${runMethod('showFloorPlan', 'none')}">
                <span>View Floor Plan</span>
              </button>` : ''}
        </menu>
        <menu class="pg-dialog-menu">
          <label class="pg-dialog-menu-title">Which day?
            <select class="pg-dialog-select" onchange="${runMethod('selectActiveDay')}">
              ${mapString(Object.keys(days), day =>
    /* html */
    `
                <option value="${day}" ${day === activeDay ? 'selected' : ''}>${day}</option>
              `)}
            </select>
          </label>
        </menu>
        <menu class="pg-dialog-menu">
          <h2 class="pg-dialog-menu-title">Filter by Time</h2>
          <button class="pg-dialog-menu-item" onclick="${runMethod('selectSortBy', 'allTime')}" autofocus>All Times This Day</button>
          <button class="pg-dialog-menu-item" onclick="${runMethod('selectSortBy', 'now')}">Right Now &amp; Onward</button>
          <button class="pg-dialog-menu-item" onclick="${runMethod('selectSortBy', 'nowOnly')}">Right Now Only</button>
          <div class="pg-dialog-menu-special-item">
            <div class="pg-dialog-menu-item pg-dialog-menu-item--input">
              <input
                type="time"
                class="pg-dialog-menu-input pg-dialog-menu-input--time"
                value="${activeTime}"
                min="${minTime}"
                max="${maxTime}"
                step="${step}"
                onchange="${runMethod('selectActiveTime')}"
              />
              <span class="pg-inline-text">&amp; On</span>
            </div>
            <button class="pg-dialog-menu-item" onclick="${runMethod('selectSortBy', 'time')}">Go &roarr;</button>
          </div>
        </menu>
        <menu class="pg-dialog-menu">
          <h2 class="pg-dialog-menu-title">Filter by Location</h2>
          ${beyondThreshold ?
    /* html */
    `<button class="pg-dialog-menu-item" onclick="${runMethod('selectSortBy', 'location')}">All Locations</button>` : mapString(locations, _location =>
    /* html */
    `
              <button class="pg-dialog-menu-item" onclick="${runMethod('selectActiveLocation', _location)}">${_location}</button>
            `)}
        </menu>
      </section>
    </section>
  `
  );
};const renderEventDialog = ({
  favorites,
  activeEvent,
  sortBy
}) => {
  const existingFavorite = favorites.find(({
    location: _location,
    start,
    name
  }) => {
    const {
      location: aLocation,
      start: aStart,
      name: aName
    } = activeEvent;
    return _location === aLocation && Number(new Date(start)) === Number(aStart) && name === aName;
  });
  const favoriteMethod = existingFavorite ? 'removeFavorite' : 'addFavorite';
  const favoriteText = existingFavorite ? 'Remove from Favorites' : 'Add to Favorites';
  return (
    /* html */
    `
    <article class="pg-dialog-body">
      <header class="pg-dialog-header">
        <h1 class="pg-dialog-title">${activeEvent.name}</h1>
        <button class="pg-dialog-close" onclick="${runMethod('closeEventDialog')}"><i class="pg-close-icon" title="Close"></i></button>
      </header>
      <section class="pg-dialog-content pg-dialog-content--text-container">
        ${mapString(activeEvent.description.split(/\n/), paragraph =>
    /* html */
    `
          <p class="pg-dialog-paragraph">${paragraph}</p>
        `)}
      </section>
      <footer class="pg-dialog-footer">
        <time datetime="${activeEvent.start.toISOString()}" class="pg-time pg-time--start">
          ${activeEvent.start.toLocaleTimeString('en-US', {
      timeStyle: 'short'
    })}
        </time>
        to
        <time datetime="${activeEvent.end.toISOString()}" class="pg-time pg-time--end">
          ${activeEvent.end.toLocaleTimeString('en-US', {
      timeStyle: 'short'
    })}
        </time>
        <div>@ ${activeEvent.location}</div>
        <div class="pg-dialog-details">
          <div><strong>Hosted by:</strong> <span>${activeEvent.host}</span></div>
          <div><strong>Category:</strong> <span>${activeEvent.category}</span></div>
        </div>
      </footer>
      <section class="pg-dialog-content">
        <menu class="pg-dialog-menu">
          <button class="pg-dialog-menu-item" onclick="${runMethod(favoriteMethod, activeEvent)}" autofocus>
            <span>${favoriteText}</span>
            <i class="pg-favorite-icon" title="${favoriteText}">&starf;</i>
          </button>
          ${sortBy === 'favorites' ? '' :
    /* html */
    `<button class="pg-dialog-menu-item" onclick="${runMethod('selectSortBy', 'favorites')}" autofocus>
                <span>View All Favorites</span>
                <i class="pg-favorite-icon" title="View All Favorites">&starf;</i>
              </button>`}
        </menu>
      </section>
    </article>
  `
  );
};const renderByLocation = ({
  activeLocation,
  events,
  times: allTimes,
  locations,
  activeDay,
  marker
}) => {
  const {
    days,
    interval
  } = allTimes || DEFAULT_TIMES; // this keeps rowspans from previous iterations in memory
  // so we can avoid adding extra table cells.

  const spanState = {}; // utility to check if the given location is active and return the class accordingly

  const getActiveClass = (_location, className) => activeLocation === _location ? className : '';

  const getMarkerClass = (_location, className) => marker === _location ? className : ''; // get all the times in the current day


  const times = days[activeDay];
  return (
    /* html */
    `
    <div class="pg-table-wrapper">
      <table class="pg-table">
        <thead class="pg-table-header">
          <tr class="pg-row">
            <td class="pg-cell-wrapper pg-cell-wrapper--corner" onclick="${runMethod('toggleSortDialog', true)}">
              <div class="pg-cell pg-cell--corner"><i class="pg-more-icon" title="Options..."></i> <span class="pg-corner-text">${activeDay}</span></div>
            </td>
            ${mapString(locations, _location =>
    /* html */
    `
              <th
                class="
                  pg-cell-wrapper
                  pg-cell-wrapper--column-header
                  pg-cell-wrapper--column-header-location
                  ${getActiveClass(_location, 'pg-cell-wrapper--column-header-active')}
                  ${getMarkerClass(_location, 'pg-cell-wrapper--column-header-active-location')}
                "
                onclick="${runMethod('showFloorPlan', _location)}"
              >
                <div class="pg-cell pg-cell--column-header ${getActiveClass(_location, 'pg-cell--column-header-active')}">
                  <i class="pg-map-icon"></i>
                  <span class="pg-inline-text">${_location}</span>
                </div>
              </th>
            `)}
          </tr>
        </thead>
        <tbody class="pg-body">
          ${mapString(times, ({
      date,
      timeString
    }) =>
    /* html */
    `
            <tr class="pg-row">
              <th class="pg-cell-wrapper pg-cell-wrapper--row-header">
                <div class="pg-cell pg-cell--row-header">${timeString}</div>
              </th>
              ${mapString(locations, _location => {
      const {
        eventName,
        cellType,
        span,
        blank,
        event
      } = getCellData({
        events,
        spanState,
        date,
        interval,
        _location
      });
      if (blank) return ''; // blank if cell from previous row occupies this space

      return (
        /* html */
        `
                  <td
                    class="pg-cell-wrapper pg-cell-wrapper--${cellType} ${getActiveClass(_location, `pg-cell-wrapper--${cellType}-active`)}"
                    rowspan="${span}"
                    id="${event ? getEventId(event) : ''}"
                    ${event ? `onclick="${runMethod('openEventDialog', event)}"` : ''}
                  >
                    <div class="pg-cell pg-cell--${cellType} ${getActiveClass(_location, `pg-cell--${cellType}-active`)}">${trim(eventName)}</div>
                  </td>
                `
      );
    })}
            </tr>
          `)}
        </tbody>
      </table>
    </div>
  `
  );
};const renderByTime = ({
  events,
  times: allTimes,
  locations,
  sortBy,
  activeTime,
  activeDay
}) => {
  const {
    days,
    interval
  } = allTimes || DEFAULT_TIMES; // this keeps colspans from previous iterations in memory
  // so we can avoid adding extra table cells.

  const spanState = {}; // determine how to filter times

  const _times = days[activeDay];
  const now = roundMinutes(Date.now(), interval);
  const {
    day: nowDay,
    date: nowDate,
    time: nowTime
  } = getDateInfo(now);
  const filterMap = {
    now: _times.filter(({
      date
    }) => date >= now),
    nowOnly: _times.filter(({
      date
    }) => date === now),
    time: _times.filter(({
      date
    }) => date >= activeTime),
    allTime: _times
  };
  const filteredTimes = filterMap[sortBy];
  const times = filteredTimes.length ? filteredTimes : [{
    date: now,
    timeString: nowTime
  }];
  const currentDay = filteredTimes.length ? activeDay : `${nowDay} ${nowDate}`;
  const timeMap = {
    now,
    nowOnly: now,
    time: activeTime,
    allTime: new Date(0)
  };
  const currentTime = timeMap[sortBy];
  return (
    /* html */
    `
    <div class="pg-table-wrapper">
      <table class="pg-table">
        <thead class="pg-table-header">
          <tr class="pg-row">
            <td class="pg-cell-wrapper pg-cell-wrapper--corner pg-cell-wrapper--corner-collapsed" onclick="${runMethod('toggleSortDialog', true)}">
              <div class="pg-cell pg-cell--corner"><i class="pg-more-icon" title="Options..."></i> <span class="pg-corner-text">${currentDay}</span></div>
            </td>
            ${mapString(times, ({
      date,
      timeString
    }) =>
    /* html */
    `
              <th class="pg-cell-wrapper pg-cell-wrapper--column-header pg-cell-wrapper--column-header-time ${date === now ? 'pg-cell-wrapper--column-header-active-time' : ''}">
                <div class="pg-cell pg-cell--column-header pg-cell--column-header-time">
                  <span>${timeString}</span>
                  <div>${date === now ? '(Current Time)' : ''}</div>
                </div>
              </th>
            `)}
          </tr>
        </thead>
        <tbody class="pg-body">
          ${mapString(locations, _location =>
    /* html */
    `
            <tr class="pg-row">
              <th class="pg-cell-wrapper pg-cell-wrapper--row-header pg-cell-wrapper--row-header-${sortBy === 'nowOnly' ? 'now' : 'time'} pg-cell-wrapper--row-header-collapsed" onclick="${runMethod('toggleHeaders')}">
                <div class="pg-cell pg-cell--row-header" onclick="${runMethod('showFloorPlan', _location)}">
                  <i class="pg-map-icon"></i>
                  <span class="pg-inline-text">${_location}</span>
                </div>
              </th>
              ${mapString(times, ({
      date
    }) => {
      const {
        eventName,
        cellType,
        span,
        blank,
        event,
        hasStarted
      } = getCellData({
        events,
        spanState,
        date,
        interval,
        _location,
        currentTime
      });
      if (blank) return ''; // blank if cell from previous row occupies this space

      return (
        /* html */
        `
                  <td
                    class="pg-cell-wrapper pg-cell-wrapper--${cellType} pg-cell-wrapper--${cellType}-${sortBy === 'nowOnly' ? 'now' : 'time'} ${hasStarted ? 'pg-cell-wrapper--overflow' : ''}"
                    colspan="${span}"
                    id="${event ? getEventId(event) : ''}"
                    ${event ? `onclick="${runMethod('openEventDialog', event)}"` : ''}
                  >
                    <div class="pg-cell pg-cell--${cellType} pg-cell--${cellType}-${sortBy === 'nowOnly' ? 'now' : 'time'}">${trim(eventName)}</div>
                  </td>
                `
      );
    })}
            </tr>
          `)}
        </tbody>
      </table>
    </div>
  `
  );
};const renderFavorites = ({
  favorites
}) =>
/* html */
`
  <div class="pg-table-wrapper">
    <table class="pg-table">
      <thead class="pg-table-header">
        <tr class="pg-row">
          <td class="pg-cell-wrapper pg-cell-wrapper--corner" onclick="${runMethod('toggleSortDialog', true)}">
            <div class="pg-cell pg-cell--corner"><i class="pg-more-icon" title="Options..."></i> Favorites</div>
          </td>
        </tr>
      </thead>
      <tbody class="pg-body">
        ${favorites.length === 0 ?
/* html */
`
              <tr class="pg-row">
                <td class="pg-cell-wrapper pg-cell-wrapper--data pg-cell-wrapper--data-favorite">
                  <div class="pg-cell pg-cell--data pg-cell--data-favorite">You have no favorites.</div>
                </td>
              </tr>
            ` : mapString(favorites, event => {
  const {
    start,
    end,
    name,
    location
  } = event;
  const startDate = getDateInfo(start);
  const endDate = getDateInfo(end);
  const day = `${startDate.day} ${startDate.date}`;
  const startTime = startDate.time;
  const endTime = endDate.time;
  return (
    /* html */
    `
              <tr class="pg-row">
                <td class="pg-cell-wrapper pg-cell-wrapper--data pg-cell-wrapper--data-favorite" onclick="${runMethod('openEventDialog', event)}">
                  <div class="pg-cell pg-cell--data pg-cell--data-favorite">
                    <span class="pg-search-result-name">${trim(name)}</span>
                    <span class="pg-inline-result-details">${day}</span>
                    <span class="pg-search-result-details">
                      <span class="pg-inline-text">${startTime}</span>
                      <span class="pg-inline-text">- ${endTime}</span>
                      <span class="pg-inline-text"> @ ${location}</span>
                    </span>
                  </div>
                </td>
              </tr>
            `
  );
})}
      </tbody>
    </table>
  </div>
`;const renderSearchBar = ({
  currentSearch
}) =>
/* html */
`
  <form class="pg-search-bar" onsubmit="${runMethod('search')}">
    <input class="pg-search-input" onchange="${runMethod('changeSearch')}" placeholder="Search events ..." value="${currentSearch}" />
    <button class="pg-search-button"><i class="pg-search-icon" title="Search"></i></button>
  </form>
`;const renderSearchResults = ({
  searchResults
}) =>
/* html */
`
  <div class="pg-table-wrapper">
    <table class="pg-table">
      <thead class="pg-table-header">
        <tr class="pg-row">
          <td class="pg-cell-wrapper pg-cell-wrapper--corner" onclick="${runMethod('toggleSortDialog', true)}">
            <div class="pg-cell pg-cell--corner"><i class="pg-more-icon" title="Options..."></i> Search Results</div>
          </td>
        </tr>
      </thead>
      <tbody class="pg-body">
        ${searchResults.length === 0 ?
/* html */
`
              <tr class="pg-row">
                <td class="pg-cell-wrapper pg-cell-wrapper--data pg-cell-wrapper--data-search">
                  <div class="pg-cell pg-cell--data pg-cell--data-search">No results found.</div>
                </td>
              </tr>
            ` : mapString(searchResults, event => {
  const {
    start,
    end,
    name,
    location
  } = event;
  const startDate = getDateInfo(start);
  const endDate = getDateInfo(end);
  const day = `${startDate.day} ${startDate.date}`;
  const startTime = startDate.time;
  const endTime = endDate.time;
  return (
    /* html */
    `
              <tr class="pg-row">
                <td class="pg-cell-wrapper pg-cell-wrapper--data pg-cell-wrapper--data-search" onclick="${runMethod('openEventDialog', event)}">
                  <div class="pg-cell pg-cell--data pg-cell--data-search">
                    <span class="pg-search-result-name">${trim(name)}</span>
                    <span class="pg-inline-result-details">${day}</span>
                    <span class="pg-search-result-details">
                      <span class="pg-inline-text">${startTime}</span>
                      <span class="pg-inline-text">- ${endTime}</span>
                      <span class="pg-inline-text"> @ ${location}</span>
                    </span>
                  </div>
                </td>
              </tr>
            `
  );
})}
      </tbody>
    </table>
  </div>
`;const renderFloorPlan = ({
  floorPlan,
  floorPlanInteractive,
  marker
}) => {
  const {
    title,
    clickableAreas,
    dimensions
  } = floorPlan;
  const {
    height,
    width
  } = dimensions;
  const showMap = clickableAreas.length > 0 && floorPlanInteractive;
  const markerCoords = marker !== 'none' ? getMarkerCoords(marker, clickableAreas) : [];
  const [x, y] = markerCoords;
  const zoomButtonText = floorPlanInteractive ? 'Fit to Screen' : 'Original Size';
  return (
    /* html */
    `
    <div class="pg-floor-plan-wrapper">
      <header class="pg-floor-plan-header">
        <menu class="pg-floor-plan-menu">
          <button class="pg-floor-plan-menu-button" onclick="${runMethod('toggleSortDialog', true)}">
            <i class="pg-more-icon" title="Options..."></i>
          </button>
          <div class="pg-floor-plan-menu-section">
            <button class="pg-floor-plan-interactive-button" onclick="${runMethod('toggleFloorPlanInteractive', null)}">
              <i class="pg-search-icon" title="${zoomButtonText}"></i> ${zoomButtonText}
            </button>
            ${clickableAreas.length > 0 ? floorPlanInteractive ?
    /* html */
    `<span class="pg-inline-text">Select an area for details.</span>` :
    /* html */
    `<span class="pg-inline-text">View original size for more actions.</span>` : ''}
          </div>
        </menu>
        <h1 class="pg-floor-plan-title">${title}</h1>
      </header>
      <div class="pg-floor-plan-container">

        ${showMap ?
    /* html */
    `
            <map name="floorPlan" id="floorPlan">
              ${mapString(clickableAreas, ({
      shape,
      coords,
      href,
      alt,
      location: _location
    }) => {
      const fullHref = href.startsWith(':') ? `http${href}` : href.startsWith('//') ? `http:${href}` : href;
      const isExternalLink = fullHref.startsWith('http') && new URL(fullHref).hostname !== location.hostname;
      return (
        /* html */
        `
                  <area
                    shape="${shape}"
                    coords="${coords.join(',')}"
                    href="${href}"
                    ${isExternalLink ? `
                      target="_blank"
                      rel="noopener noreferrer"
                    ` : ''}
                    alt="${alt ?? _location}"
                  />
                `
      );
    })}
            </map>` : ''}

        <div class="pg-floor-plan-image-wrapper ${showMap ? 'pg-floor-plan-image-wrapper--interactive' : ''}" onclick="${runMethod('showFloorPlanMessage', 'event', 'No link was provided for that area.')}">

          <!-- This exists to prevent a safari OCR bug from interfering with the image map -->
          <img
            class="pg-overlay-image"
            ${showMap ? 'usemap="#floorPlan"' : ''}
            height="${height}"
            width="${width}"
            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4xLWMwMDAgNzkuYjBmOGJlOTAsIDIwMjEvMTIvMTUtMjE6MjU6MTUgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMy4yIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxQUE0RjNBMEE0MDkxMUVDOTAwN0ZBRjQwRjZGNkFBMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxQUE0RjNBMUE0MDkxMUVDOTAwN0ZBRjQwRjZGNkFBMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFBQTRGMzlFQTQwOTExRUM5MDA3RkFGNDBGNkY2QUEyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFBQTRGMzlGQTQwOTExRUM5MDA3RkFGNDBGNkY2QUEyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAAAAsAAAAAAEAAQAAAgJEAQA7"
          />

          <!-- This gets replaced by the image element stored in memory for optimization -->
          <img class="pg-floor-plan-image" height="${height}" width="${width}" />
          ${x && y && showMap ?
    /* html */
    `
              <div class="pg-floor-plan-marker" style="--x: ${x}; --y: ${y}">
                <i class="pg-map-icon"></i>
              </div>` : ''}
          <div class="pg-floor-plan-message" role="alert"></div>
        </div>
      </div>
    </div>
  `
  );
};// nb. This is for IE10 and lower _only_.
var supportCustomEvent = window.CustomEvent;
if (!supportCustomEvent || typeof supportCustomEvent === 'object') {
  supportCustomEvent = function CustomEvent(event, x) {
    x = x || {};
    var ev = document.createEvent('CustomEvent');
    ev.initCustomEvent(event, !!x.bubbles, !!x.cancelable, x.detail || null);
    return ev;
  };
  supportCustomEvent.prototype = window.Event.prototype;
}

/**
 * Dispatches the passed event to both an "on<type>" handler as well as via the
 * normal dispatch operation. Does not bubble.
 *
 * @param {!EventTarget} target
 * @param {!Event} event
 * @return {boolean}
 */
function safeDispatchEvent(target, event) {
  var check = 'on' + event.type.toLowerCase();
  if (typeof target[check] === 'function') {
    target[check](event);
  }
  return target.dispatchEvent(event);
}

/**
 * @param {Element} el to check for stacking context
 * @return {boolean} whether this el or its parents creates a stacking context
 */
function createsStackingContext(el) {
  while (el && el !== document.body) {
    var s = window.getComputedStyle(el);
    var invalid = function(k, ok) {
      return !(s[k] === undefined || s[k] === ok);
    };

    if (s.opacity < 1 ||
        invalid('zIndex', 'auto') ||
        invalid('transform', 'none') ||
        invalid('mixBlendMode', 'normal') ||
        invalid('filter', 'none') ||
        invalid('perspective', 'none') ||
        s['isolation'] === 'isolate' ||
        s.position === 'fixed' ||
        s.webkitOverflowScrolling === 'touch') {
      return true;
    }
    el = el.parentElement;
  }
  return false;
}

/**
 * Finds the nearest <dialog> from the passed element.
 *
 * @param {Element} el to search from
 * @return {HTMLDialogElement} dialog found
 */
function findNearestDialog(el) {
  while (el) {
    if (el.localName === 'dialog') {
      return /** @type {HTMLDialogElement} */ (el);
    }
    if (el.parentElement) {
      el = el.parentElement;
    } else if (el.parentNode) {
      el = el.parentNode.host;
    } else {
      el = null;
    }
  }
  return null;
}

/**
 * Blur the specified element, as long as it's not the HTML body element.
 * This works around an IE9/10 bug - blurring the body causes Windows to
 * blur the whole application.
 *
 * @param {Element} el to blur
 */
function safeBlur(el) {
  // Find the actual focused element when the active element is inside a shadow root
  while (el && el.shadowRoot && el.shadowRoot.activeElement) {
    el = el.shadowRoot.activeElement;
  }

  if (el && el.blur && el !== document.body) {
    el.blur();
  }
}

/**
 * @param {!NodeList} nodeList to search
 * @param {Node} node to find
 * @return {boolean} whether node is inside nodeList
 */
function inNodeList(nodeList, node) {
  for (var i = 0; i < nodeList.length; ++i) {
    if (nodeList[i] === node) {
      return true;
    }
  }
  return false;
}

/**
 * @param {HTMLFormElement} el to check
 * @return {boolean} whether this form has method="dialog"
 */
function isFormMethodDialog(el) {
  if (!el || !el.hasAttribute('method')) {
    return false;
  }
  return el.getAttribute('method').toLowerCase() === 'dialog';
}

/**
 * @param {!DocumentFragment|!Element} hostElement
 * @return {?Element}
 */
function findFocusableElementWithin(hostElement) {
  // Note that this is 'any focusable area'. This list is probably not exhaustive, but the
  // alternative involves stepping through and trying to focus everything.
  var opts = ['button', 'input', 'keygen', 'select', 'textarea'];
  var query = opts.map(function(el) {
    return el + ':not([disabled])';
  });
  // TODO(samthor): tabindex values that are not numeric are not focusable.
  query.push('[tabindex]:not([disabled]):not([tabindex=""])');  // tabindex != "", not disabled
  var target = hostElement.querySelector(query.join(', '));

  if (!target && 'attachShadow' in Element.prototype) {
    // If we haven't found a focusable target, see if the host element contains an element
    // which has a shadowRoot.
    // Recursively search for the first focusable item in shadow roots.
    var elems = hostElement.querySelectorAll('*');
    for (var i = 0; i < elems.length; i++) {
      if (elems[i].tagName && elems[i].shadowRoot) {
        target = findFocusableElementWithin(elems[i].shadowRoot);
        if (target) {
          break;
        }
      }
    }
  }
  return target;
}

/**
 * Determines if an element is attached to the DOM.
 * @param {Element} element to check
 * @return {boolean} whether the element is in DOM
 */
function isConnected(element) {
  return element.isConnected || document.body.contains(element);
}

/**
 * @param {!Event} event
 * @return {?Element}
 */
function findFormSubmitter(event) {
  if (event.submitter) {
    return event.submitter;
  }

  var form = event.target;
  if (!(form instanceof HTMLFormElement)) {
    return null;
  }

  var submitter = dialogPolyfill.formSubmitter;
  if (!submitter) {
    var target = event.target;
    var root = ('getRootNode' in target && target.getRootNode() || document);
    submitter = root.activeElement;
  }

  if (!submitter || submitter.form !== form) {
    return null;
  }
  return submitter;
}

/**
 * @param {!Event} event
 */
function maybeHandleSubmit(event) {
  if (event.defaultPrevented) {
    return;
  }
  var form = /** @type {!HTMLFormElement} */ (event.target);

  // We'd have a value if we clicked on an imagemap.
  var value = dialogPolyfill.imagemapUseValue;
  var submitter = findFormSubmitter(event);
  if (value === null && submitter) {
    value = submitter.value;
  }

  // There should always be a dialog as this handler is added specifically on them, but check just
  // in case.
  var dialog = findNearestDialog(form);
  if (!dialog) {
    return;
  }

  // Prefer formmethod on the button.
  var formmethod = submitter && submitter.getAttribute('formmethod') || form.getAttribute('method');
  if (formmethod !== 'dialog') {
    return;
  }
  event.preventDefault();

  if (value != null) {
    // nb. we explicitly check against null/undefined
    dialog.close(value);
  } else {
    dialog.close();
  }
}

/**
 * @param {!HTMLDialogElement} dialog to upgrade
 * @constructor
 */
function dialogPolyfillInfo(dialog) {
  this.dialog_ = dialog;
  this.replacedStyleTop_ = false;
  this.openAsModal_ = false;

  // Set a11y role. Browsers that support dialog implicitly know this already.
  if (!dialog.hasAttribute('role')) {
    dialog.setAttribute('role', 'dialog');
  }

  dialog.show = this.show.bind(this);
  dialog.showModal = this.showModal.bind(this);
  dialog.close = this.close.bind(this);

  dialog.addEventListener('submit', maybeHandleSubmit, false);

  if (!('returnValue' in dialog)) {
    dialog.returnValue = '';
  }

  if ('MutationObserver' in window) {
    var mo = new MutationObserver(this.maybeHideModal.bind(this));
    mo.observe(dialog, {attributes: true, attributeFilter: ['open']});
  } else {
    // IE10 and below support. Note that DOMNodeRemoved etc fire _before_ removal. They also
    // seem to fire even if the element was removed as part of a parent removal. Use the removed
    // events to force downgrade (useful if removed/immediately added).
    var removed = false;
    var cb = function() {
      removed ? this.downgradeModal() : this.maybeHideModal();
      removed = false;
    }.bind(this);
    var timeout;
    var delayModel = function(ev) {
      if (ev.target !== dialog) { return; }  // not for a child element
      var cand = 'DOMNodeRemoved';
      removed |= (ev.type.substr(0, cand.length) === cand);
      window.clearTimeout(timeout);
      timeout = window.setTimeout(cb, 0);
    };
    ['DOMAttrModified', 'DOMNodeRemoved', 'DOMNodeRemovedFromDocument'].forEach(function(name) {
      dialog.addEventListener(name, delayModel);
    });
  }
  // Note that the DOM is observed inside DialogManager while any dialog
  // is being displayed as a modal, to catch modal removal from the DOM.

  Object.defineProperty(dialog, 'open', {
    set: this.setOpen.bind(this),
    get: dialog.hasAttribute.bind(dialog, 'open')
  });

  this.backdrop_ = document.createElement('div');
  this.backdrop_.className = 'backdrop';
  this.backdrop_.addEventListener('mouseup'  , this.backdropMouseEvent_.bind(this));
  this.backdrop_.addEventListener('mousedown', this.backdropMouseEvent_.bind(this));
  this.backdrop_.addEventListener('click'    , this.backdropMouseEvent_.bind(this));
}

dialogPolyfillInfo.prototype = /** @type {HTMLDialogElement.prototype} */ ({

  get dialog() {
    return this.dialog_;
  },

  /**
   * Maybe remove this dialog from the modal top layer. This is called when
   * a modal dialog may no longer be tenable, e.g., when the dialog is no
   * longer open or is no longer part of the DOM.
   */
  maybeHideModal: function() {
    if (this.dialog_.hasAttribute('open') && isConnected(this.dialog_)) { return; }
    this.downgradeModal();
  },

  /**
   * Remove this dialog from the modal top layer, leaving it as a non-modal.
   */
  downgradeModal: function() {
    if (!this.openAsModal_) { return; }
    this.openAsModal_ = false;
    this.dialog_.style.zIndex = '';

    // This won't match the native <dialog> exactly because if the user set top on a centered
    // polyfill dialog, that top gets thrown away when the dialog is closed. Not sure it's
    // possible to polyfill this perfectly.
    if (this.replacedStyleTop_) {
      this.dialog_.style.top = '';
      this.replacedStyleTop_ = false;
    }

    // Clear the backdrop and remove from the manager.
    this.backdrop_.parentNode && this.backdrop_.parentNode.removeChild(this.backdrop_);
    dialogPolyfill.dm.removeDialog(this);
  },

  /**
   * @param {boolean} value whether to open or close this dialog
   */
  setOpen: function(value) {
    if (value) {
      this.dialog_.hasAttribute('open') || this.dialog_.setAttribute('open', '');
    } else {
      this.dialog_.removeAttribute('open');
      this.maybeHideModal();  // nb. redundant with MutationObserver
    }
  },

  /**
   * Handles mouse events ('mouseup', 'mousedown', 'click') on the fake .backdrop element, redirecting them as if
   * they were on the dialog itself.
   *
   * @param {!Event} e to redirect
   */
  backdropMouseEvent_: function(e) {
    if (!this.dialog_.hasAttribute('tabindex')) {
      // Clicking on the backdrop should move the implicit cursor, even if dialog cannot be
      // focused. Create a fake thing to focus on. If the backdrop was _before_ the dialog, this
      // would not be needed - clicks would move the implicit cursor there.
      var fake = document.createElement('div');
      this.dialog_.insertBefore(fake, this.dialog_.firstChild);
      fake.tabIndex = -1;
      fake.focus();
      this.dialog_.removeChild(fake);
    } else {
      this.dialog_.focus();
    }

    var redirectedEvent = document.createEvent('MouseEvents');
    redirectedEvent.initMouseEvent(e.type, e.bubbles, e.cancelable, window,
        e.detail, e.screenX, e.screenY, e.clientX, e.clientY, e.ctrlKey,
        e.altKey, e.shiftKey, e.metaKey, e.button, e.relatedTarget);
    this.dialog_.dispatchEvent(redirectedEvent);
    e.stopPropagation();
  },

  /**
   * Focuses on the first focusable element within the dialog. This will always blur the current
   * focus, even if nothing within the dialog is found.
   */
  focus_: function() {
    // Find element with `autofocus` attribute, or fall back to the first form/tabindex control.
    var target = this.dialog_.querySelector('[autofocus]:not([disabled])');
    if (!target && this.dialog_.tabIndex >= 0) {
      target = this.dialog_;
    }
    if (!target) {
      target = findFocusableElementWithin(this.dialog_);
    }
    safeBlur(document.activeElement);
    target && target.focus();
  },

  /**
   * Sets the zIndex for the backdrop and dialog.
   *
   * @param {number} dialogZ
   * @param {number} backdropZ
   */
  updateZIndex: function(dialogZ, backdropZ) {
    if (dialogZ < backdropZ) {
      throw new Error('dialogZ should never be < backdropZ');
    }
    this.dialog_.style.zIndex = dialogZ;
    this.backdrop_.style.zIndex = backdropZ;
  },

  /**
   * Shows the dialog. If the dialog is already open, this does nothing.
   */
  show: function() {
    if (!this.dialog_.open) {
      this.setOpen(true);
      this.focus_();
    }
  },

  /**
   * Show this dialog modally.
   */
  showModal: function() {
    if (this.dialog_.hasAttribute('open')) {
      throw new Error('Failed to execute \'showModal\' on dialog: The element is already open, and therefore cannot be opened modally.');
    }
    if (!isConnected(this.dialog_)) {
      throw new Error('Failed to execute \'showModal\' on dialog: The element is not in a Document.');
    }
    if (!dialogPolyfill.dm.pushDialog(this)) {
      throw new Error('Failed to execute \'showModal\' on dialog: There are too many open modal dialogs.');
    }

    if (createsStackingContext(this.dialog_.parentElement)) {
      console.warn('A dialog is being shown inside a stacking context. ' +
          'This may cause it to be unusable. For more information, see this link: ' +
          'https://github.com/GoogleChrome/dialog-polyfill/#stacking-context');
    }

    this.setOpen(true);
    this.openAsModal_ = true;

    // Optionally center vertically, relative to the current viewport.
    if (dialogPolyfill.needsCentering(this.dialog_)) {
      dialogPolyfill.reposition(this.dialog_);
      this.replacedStyleTop_ = true;
    } else {
      this.replacedStyleTop_ = false;
    }

    // Insert backdrop.
    this.dialog_.parentNode.insertBefore(this.backdrop_, this.dialog_.nextSibling);

    // Focus on whatever inside the dialog.
    this.focus_();
  },

  /**
   * Closes this HTMLDialogElement. This is optional vs clearing the open
   * attribute, however this fires a 'close' event.
   *
   * @param {string=} opt_returnValue to use as the returnValue
   */
  close: function(opt_returnValue) {
    if (!this.dialog_.hasAttribute('open')) {
      throw new Error('Failed to execute \'close\' on dialog: The element does not have an \'open\' attribute, and therefore cannot be closed.');
    }
    this.setOpen(false);

    // Leave returnValue untouched in case it was set directly on the element
    if (opt_returnValue !== undefined) {
      this.dialog_.returnValue = opt_returnValue;
    }

    // Triggering "close" event for any attached listeners on the <dialog>.
    var closeEvent = new supportCustomEvent('close', {
      bubbles: false,
      cancelable: false
    });
    safeDispatchEvent(this.dialog_, closeEvent);
  }

});

var dialogPolyfill = {};

dialogPolyfill.reposition = function(element) {
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  var topValue = scrollTop + (window.innerHeight - element.offsetHeight) / 2;
  element.style.top = Math.max(scrollTop, topValue) + 'px';
};

dialogPolyfill.isInlinePositionSetByStylesheet = function(element) {
  for (var i = 0; i < document.styleSheets.length; ++i) {
    var styleSheet = document.styleSheets[i];
    var cssRules = null;
    // Some browsers throw on cssRules.
    try {
      cssRules = styleSheet.cssRules;
    } catch (e) {}
    if (!cssRules) { continue; }
    for (var j = 0; j < cssRules.length; ++j) {
      var rule = cssRules[j];
      var selectedNodes = null;
      // Ignore errors on invalid selector texts.
      try {
        selectedNodes = document.querySelectorAll(rule.selectorText);
      } catch(e) {}
      if (!selectedNodes || !inNodeList(selectedNodes, element)) {
        continue;
      }
      var cssTop = rule.style.getPropertyValue('top');
      var cssBottom = rule.style.getPropertyValue('bottom');
      if ((cssTop && cssTop !== 'auto') || (cssBottom && cssBottom !== 'auto')) {
        return true;
      }
    }
  }
  return false;
};

dialogPolyfill.needsCentering = function(dialog) {
  var computedStyle = window.getComputedStyle(dialog);
  if (computedStyle.position !== 'absolute') {
    return false;
  }

  // We must determine whether the top/bottom specified value is non-auto.  In
  // WebKit/Blink, checking computedStyle.top == 'auto' is sufficient, but
  // Firefox returns the used value. So we do this crazy thing instead: check
  // the inline style and then go through CSS rules.
  if ((dialog.style.top !== 'auto' && dialog.style.top !== '') ||
      (dialog.style.bottom !== 'auto' && dialog.style.bottom !== '')) {
    return false;
  }
  return !dialogPolyfill.isInlinePositionSetByStylesheet(dialog);
};

/**
 * @param {!Element} element to force upgrade
 */
dialogPolyfill.forceRegisterDialog = function(element) {
  if (window.HTMLDialogElement || element.showModal) {
    console.warn('This browser already supports <dialog>, the polyfill ' +
        'may not work correctly', element);
  }
  if (element.localName !== 'dialog') {
    throw new Error('Failed to register dialog: The element is not a dialog.');
  }
  new dialogPolyfillInfo(/** @type {!HTMLDialogElement} */ (element));
};

/**
 * @param {!Element} element to upgrade, if necessary
 */
dialogPolyfill.registerDialog = function(element) {
  if (!element.showModal) {
    dialogPolyfill.forceRegisterDialog(element);
  }
};

/**
 * @constructor
 */
dialogPolyfill.DialogManager = function() {
  /** @type {!Array<!dialogPolyfillInfo>} */
  this.pendingDialogStack = [];

  var checkDOM = this.checkDOM_.bind(this);

  // The overlay is used to simulate how a modal dialog blocks the document.
  // The blocking dialog is positioned on top of the overlay, and the rest of
  // the dialogs on the pending dialog stack are positioned below it. In the
  // actual implementation, the modal dialog stacking is controlled by the
  // top layer, where z-index has no effect.
  this.overlay = document.createElement('div');
  this.overlay.className = '_dialog_overlay';
  this.overlay.addEventListener('click', function(e) {
    this.forwardTab_ = undefined;
    e.stopPropagation();
    checkDOM([]);  // sanity-check DOM
  }.bind(this));

  this.handleKey_ = this.handleKey_.bind(this);
  this.handleFocus_ = this.handleFocus_.bind(this);

  this.zIndexLow_ = 100000;
  this.zIndexHigh_ = 100000 + 150;

  this.forwardTab_ = undefined;

  if ('MutationObserver' in window) {
    this.mo_ = new MutationObserver(function(records) {
      var removed = [];
      records.forEach(function(rec) {
        for (var i = 0, c; c = rec.removedNodes[i]; ++i) {
          if (!(c instanceof Element)) {
            continue;
          } else if (c.localName === 'dialog') {
            removed.push(c);
          }
          removed = removed.concat(c.querySelectorAll('dialog'));
        }
      });
      removed.length && checkDOM(removed);
    });
  }
};

/**
 * Called on the first modal dialog being shown. Adds the overlay and related
 * handlers.
 */
dialogPolyfill.DialogManager.prototype.blockDocument = function() {
  document.documentElement.addEventListener('focus', this.handleFocus_, true);
  document.addEventListener('keydown', this.handleKey_);
  this.mo_ && this.mo_.observe(document, {childList: true, subtree: true});
};

/**
 * Called on the first modal dialog being removed, i.e., when no more modal
 * dialogs are visible.
 */
dialogPolyfill.DialogManager.prototype.unblockDocument = function() {
  document.documentElement.removeEventListener('focus', this.handleFocus_, true);
  document.removeEventListener('keydown', this.handleKey_);
  this.mo_ && this.mo_.disconnect();
};

/**
 * Updates the stacking of all known dialogs.
 */
dialogPolyfill.DialogManager.prototype.updateStacking = function() {
  var zIndex = this.zIndexHigh_;

  for (var i = 0, dpi; dpi = this.pendingDialogStack[i]; ++i) {
    dpi.updateZIndex(--zIndex, --zIndex);
    if (i === 0) {
      this.overlay.style.zIndex = --zIndex;
    }
  }

  // Make the overlay a sibling of the dialog itself.
  var last = this.pendingDialogStack[0];
  if (last) {
    var p = last.dialog.parentNode || document.body;
    p.appendChild(this.overlay);
  } else if (this.overlay.parentNode) {
    this.overlay.parentNode.removeChild(this.overlay);
  }
};

/**
 * @param {Element} candidate to check if contained or is the top-most modal dialog
 * @return {boolean} whether candidate is contained in top dialog
 */
dialogPolyfill.DialogManager.prototype.containedByTopDialog_ = function(candidate) {
  while (candidate = findNearestDialog(candidate)) {
    for (var i = 0, dpi; dpi = this.pendingDialogStack[i]; ++i) {
      if (dpi.dialog === candidate) {
        return i === 0;  // only valid if top-most
      }
    }
    candidate = candidate.parentElement;
  }
  return false;
};

dialogPolyfill.DialogManager.prototype.handleFocus_ = function(event) {
  var target = event.composedPath ? event.composedPath()[0] : event.target;

  if (this.containedByTopDialog_(target)) { return; }

  if (document.activeElement === document.documentElement) { return; }

  event.preventDefault();
  event.stopPropagation();
  safeBlur(/** @type {Element} */ (target));

  if (this.forwardTab_ === undefined) { return; }  // move focus only from a tab key

  var dpi = this.pendingDialogStack[0];
  var dialog = dpi.dialog;
  var position = dialog.compareDocumentPosition(target);
  if (position & Node.DOCUMENT_POSITION_PRECEDING) {
    if (this.forwardTab_) {
      // forward
      dpi.focus_();
    } else if (target !== document.documentElement) {
      // backwards if we're not already focused on <html>
      document.documentElement.focus();
    }
  }

  return false;
};

dialogPolyfill.DialogManager.prototype.handleKey_ = function(event) {
  this.forwardTab_ = undefined;
  if (event.keyCode === 27) {
    event.preventDefault();
    event.stopPropagation();
    var cancelEvent = new supportCustomEvent('cancel', {
      bubbles: false,
      cancelable: true
    });
    var dpi = this.pendingDialogStack[0];
    if (dpi && safeDispatchEvent(dpi.dialog, cancelEvent)) {
      dpi.dialog.close();
    }
  } else if (event.keyCode === 9) {
    this.forwardTab_ = !event.shiftKey;
  }
};

/**
 * Finds and downgrades any known modal dialogs that are no longer displayed. Dialogs that are
 * removed and immediately readded don't stay modal, they become normal.
 *
 * @param {!Array<!HTMLDialogElement>} removed that have definitely been removed
 */
dialogPolyfill.DialogManager.prototype.checkDOM_ = function(removed) {
  // This operates on a clone because it may cause it to change. Each change also calls
  // updateStacking, which only actually needs to happen once. But who removes many modal dialogs
  // at a time?!
  var clone = this.pendingDialogStack.slice();
  clone.forEach(function(dpi) {
    if (removed.indexOf(dpi.dialog) !== -1) {
      dpi.downgradeModal();
    } else {
      dpi.maybeHideModal();
    }
  });
};

/**
 * @param {!dialogPolyfillInfo} dpi
 * @return {boolean} whether the dialog was allowed
 */
dialogPolyfill.DialogManager.prototype.pushDialog = function(dpi) {
  var allowed = (this.zIndexHigh_ - this.zIndexLow_) / 2 - 1;
  if (this.pendingDialogStack.length >= allowed) {
    return false;
  }
  if (this.pendingDialogStack.unshift(dpi) === 1) {
    this.blockDocument();
  }
  this.updateStacking();
  return true;
};

/**
 * @param {!dialogPolyfillInfo} dpi
 */
dialogPolyfill.DialogManager.prototype.removeDialog = function(dpi) {
  var index = this.pendingDialogStack.indexOf(dpi);
  if (index === -1) { return; }

  this.pendingDialogStack.splice(index, 1);
  if (this.pendingDialogStack.length === 0) {
    this.unblockDocument();
  }
  this.updateStacking();
};

dialogPolyfill.dm = new dialogPolyfill.DialogManager();
dialogPolyfill.formSubmitter = null;
dialogPolyfill.imagemapUseValue = null;

/**
 * Installs global handlers, such as click listers and native method overrides. These are needed
 * even if a no dialog is registered, as they deal with <form method="dialog">.
 */
if (window.HTMLDialogElement === undefined) {

  /**
   * If HTMLFormElement translates method="DIALOG" into 'get', then replace the descriptor with
   * one that returns the correct value.
   */
  var testForm = document.createElement('form');
  testForm.setAttribute('method', 'dialog');
  if (testForm.method !== 'dialog') {
    var methodDescriptor = Object.getOwnPropertyDescriptor(HTMLFormElement.prototype, 'method');
    if (methodDescriptor) {
      // nb. Some older iOS and older PhantomJS fail to return the descriptor. Don't do anything
      // and don't bother to update the element.
      var realGet = methodDescriptor.get;
      methodDescriptor.get = function() {
        if (isFormMethodDialog(this)) {
          return 'dialog';
        }
        return realGet.call(this);
      };
      var realSet = methodDescriptor.set;
      /** @this {HTMLElement} */
      methodDescriptor.set = function(v) {
        if (typeof v === 'string' && v.toLowerCase() === 'dialog') {
          return this.setAttribute('method', v);
        }
        return realSet.call(this, v);
      };
      Object.defineProperty(HTMLFormElement.prototype, 'method', methodDescriptor);
    }
  }

  /**
   * Global 'click' handler, to capture the <input type="submit"> or <button> element which has
   * submitted a <form method="dialog">. Needed as Safari and others don't report this inside
   * document.activeElement.
   */
  document.addEventListener('click', function(ev) {
    dialogPolyfill.formSubmitter = null;
    dialogPolyfill.imagemapUseValue = null;
    if (ev.defaultPrevented) { return; }  // e.g. a submit which prevents default submission

    var target = /** @type {Element} */ (ev.target);
    if ('composedPath' in ev) {
      var path = ev.composedPath();
      target = path.shift() || target;
    }
    if (!target || !isFormMethodDialog(target.form)) { return; }

    var valid = (target.type === 'submit' && ['button', 'input'].indexOf(target.localName) > -1);
    if (!valid) {
      if (!(target.localName === 'input' && target.type === 'image')) { return; }
      // this is a <input type="image">, which can submit forms
      dialogPolyfill.imagemapUseValue = ev.offsetX + ',' + ev.offsetY;
    }

    var dialog = findNearestDialog(target);
    if (!dialog) { return; }

    dialogPolyfill.formSubmitter = target;

  }, false);

  /**
   * Global 'submit' handler. This handles submits of `method="dialog"` which are invalid, i.e.,
   * outside a dialog. They get prevented.
   */
  document.addEventListener('submit', function(ev) {
    var form = ev.target;
    var dialog = findNearestDialog(form);
    if (dialog) {
      return;  // ignore, handle there
    }

    var submitter = findFormSubmitter(ev);
    var formmethod = submitter && submitter.getAttribute('formmethod') || form.getAttribute('method');
    if (formmethod === 'dialog') {
      ev.preventDefault();
    }
  });

  /**
   * Replace the native HTMLFormElement.submit() method, as it won't fire the
   * submit event and give us a chance to respond.
   */
  var nativeFormSubmit = HTMLFormElement.prototype.submit;
  var replacementFormSubmit = function () {
    if (!isFormMethodDialog(this)) {
      return nativeFormSubmit.call(this);
    }
    var dialog = findNearestDialog(this);
    dialog && dialog.close();
  };
  HTMLFormElement.prototype.submit = replacementFormSubmit;
}const getRender = ({
  state,
  component
}) => async ({
  loading
} = {}) => {
  const {
    root,
    dataset,
    templateCache
  } = component; // This assures renders happen at the end of the current event loop

  await new Promise(resolve => {
    setTimeout(() => {
      resolve();
    });
  }); // clear previously rendered content

  clearHTML(root); // get style

  const {
    css,
    breakpoint
  } = dataset;
  const style = css || getStyles(breakpoint || DEFAULT_BREAKPOINT); // render loading spinner if necessary

  if (loading) {
    const loadingTemplate = document.createElement('template');
    loadingTemplate.innerHTML =
    /* html */
    `
      <style>${style}</style>
      <div class="pg-loading"></div>
    `;
    root.appendChild(loadingTemplate.content.cloneNode(true));
    return true; // success
  } // determine which render method to use


  const renderMap = {
    location: renderByLocation,
    time: renderByTime,
    allTime: renderByTime,
    now: renderByTime,
    nowOnly: renderByTime,
    favorites: renderFavorites,
    search: renderSearchResults
  };
  const renderTable = renderMap[state.sortBy];
  const showFloorPlan = state.view === 'floorPlan'; // rewrite the template HTML

  const tableTemplate = document.createElement('template');
  tableTemplate.innerHTML =
  /* html */
  `
    <style>
      /* typical browser defaults for dialog polyfill */
      dialog + .backdrop { position: fixed; top: 0; right: 0; bottom: 0; left: 0; background: rgba(0, 0, 0, 0.1); }
      ${style}
    </style>
    <section id="ProgramGuide" class="${state.maximized ? 'pg-maximized' : ''}">
      <header class="pg-header">
        ${renderSearchBar(state)}
        <button class="pg-maximize-button" onclick="${runMethod('maximize')}">${state.maximized ? 'Exit Full Screen' : 'Full Screen'}</button>
      </header>
      ${showFloorPlan ? renderFloorPlan(state) : renderTable(state)}
    </section>
    <dialog class="pg-dialog pg-dialog--sort">${renderSortDialog(state, breakpoint)}</dialog>
    <dialog class="pg-dialog pg-dialog--event">${renderEventDialog(state)}</dialog>
  `;
  root.appendChild(tableTemplate.content.cloneNode(true)); // register dialogs with the polyfill

  const dialogs = root.querySelectorAll('.pg-dialog');

  for (const dialog of dialogs) dialogPolyfill.registerDialog(dialog);

  if (state.view === 'guide') {
    // handle scrolling within the table
    const wrapper = root.querySelector('.pg-table-wrapper');

    const handleScroll = () => {
      const SCROLLED_CLASS = 'pg-table-wrapper--scrolled';
      const needsClass = wrapper.scrollLeft > 0 && !wrapper.classList.contains(SCROLLED_CLASS);
      if (needsClass) wrapper.classList.add(SCROLLED_CLASS);
      if (wrapper.scrollLeft === 0) wrapper.classList.remove(SCROLLED_CLASS);
    };

    wrapper.addEventListener('scroll', handleScroll);
  } else if (state.view === 'floorPlan') {
    // replace placeholder <img> with the real one stored in memory
    // (this allows the image to load prior to viewing the map, and
    // prevents unnecessary reloading of the image)
    const image = root.querySelector('.pg-floor-plan-image');
    image.replaceWith(templateCache.floorPlanImage); // scroll marker into view if necessary

    const marker = root.querySelector('.pg-floor-plan-marker');
    if (marker) marker.scrollIntoView({
      block: 'end'
    });
  }

  return true; // success
};var getAddFavorite = (({
  state,
  setState,
  component
}) => async encodedEvent => {
  const {
    openEventDialog
  } = component;
  const eventJSON = decodeURIComponent(encodedEvent);
  const event = JSON.parse(eventJSON);
  setState({
    favorites: [...state.favorites, event]
  }, {
    render: false
  });
  openEventDialog(encodedEvent); // update the event modal

  return await addFavorite(event);
});var getRemoveFavorite = (({
  state,
  setState,
  component
}) => async encodedEvent => {
  const {
    openEventDialog
  } = component;
  const eventJSON = decodeURIComponent(encodedEvent);
  const event = JSON.parse(eventJSON);
  const removeIndex = state.favorites.findIndex(({
    location: _location,
    start,
    name
  }) => {
    const {
      location: cLocation,
      start: cStart,
      name: cName
    } = event;
    return _location === cLocation && start === cStart && name === cName;
  });
  const favorites = [...state.favorites];
  favorites.splice(removeIndex, 1);

  if (state.sortBy === 'favorites') {
    setState({
      favorites
    });
  } else {
    setState({
      favorites
    }, {
      render: false
    });
    openEventDialog(encodedEvent); // update the event modal
  }

  return await removeFavorite(event);
});var getHandleEsc = (({
  component
}) => event => {
  const {
    toggleSortDialog,
    closeEventDialog
  } = component;

  if (event.key === 'Esc' || event.key === 'Escape') {
    event.preventDefault();
    toggleSortDialog(false);
    closeEventDialog();
  }
});var getHandleHashChange = (({
  setState,
  component
}) => () => {
  const {
    root
  } = component; // a little extra insurance to avoid conflicts with other code...

  const hash = location.hash.replace('#', '');
  if (!hash.startsWith('View-Location-')) return; // navigate to location view

  const _location = hash.replace('View-Location-', '').replace('-', ' ');

  setState({
    activeLocation: _location,
    marker: _location,
    view: 'guide',
    sortBy: 'location'
  }); // reset the hash so the navigation can be used more than once in a row

  history.replaceState({}, '', location.href.replace(/#.+/, '')); // scroll location into view if necessary

  setTimeout(() => {
    // wait for render
    const activeLocationEl = root.querySelector('.pg-cell-wrapper--column-header-active-location');
    if (activeLocationEl) activeLocationEl.scrollIntoView();
  });
});var getShowFloorPlan = (({
  state,
  setState,
  component
}) => locationName => {
  const {
    hasFloorPlan
  } = state;
  if (!hasFloorPlan) return;
  const {
    toggleFloorPlanInteractive
  } = component;
  setState({
    marker: locationName,
    view: 'floorPlan'
  });
  toggleFloorPlanInteractive(locationName !== 'none');
});var getToggleFloorPlanInteractive = (({
  state,
  setState,
  component
}) => _bool => {
  const {
    templateCache
  } = component;
  const bool = _bool ?? !state.floorPlanInteractive;
  const floorPlanInteractive = bool;
  const {
    floorPlanImage
  } = templateCache;
  const INTERACTIVE_CLASS = 'pg-floor-plan-image--interactive';
  const addOrRemove = floorPlanInteractive ? 'add' : 'remove';
  floorPlanImage.classList[addOrRemove](INTERACTIVE_CLASS);
  setState({
    floorPlanInteractive
  });
});var getToggleHeaders = (({
  state,
  component
}) => ({
  target
}) => {
  const {
    root
  } = component; // do nothing if viewing by "now only", because there's nothing to collapse

  if (state.sortBy === 'nowOnly') return; // do nothing if the table hasn't scrolled

  const wrapper = root.querySelector('.pg-table-wrapper');
  if (!wrapper.classList.contains('pg-table-wrapper--scrolled')) return; // toggle the collapsed classes

  const allHeaders = root.querySelectorAll('.pg-cell-wrapper--row-header');
  const COLLAPSED_CLASS = 'pg-cell-wrapper--row-header-collapsed';
  const addOrRemove = target.classList.contains(COLLAPSED_CLASS) ? 'remove' : 'add';

  for (const header of allHeaders) header.classList[addOrRemove](COLLAPSED_CLASS); // also collapse the corner


  const corner = root.querySelector('.pg-cell-wrapper--corner');
  corner.classList[addOrRemove]('pg-cell-wrapper--corner-collapsed');
});var getToggleSortDialog = (({
  state,
  component
}) => _bool => {
  const {
    root,
    dataset
  } = component;
  const bool = _bool === 'true' ? true : !!_bool;
  const dialog = root.querySelector('.pg-dialog--sort');
  const dialogContent = parseHTML(renderSortDialog(state, dataset.breakpoint));
  clearHTML(dialog);
  dialog.appendChild(dialogContent);
  if (bool) dialog.showModal();else if (dialog.open) dialog.close();
});var getOpenEventDialog = (({
  setState,
  component
}) => encodedEvent => {
  const {
    root
  } = component; // set event data

  const eventJSON = decodeURIComponent(encodedEvent);
  const event = JSON.parse(eventJSON);
  const newState = setState({
    activeEvent: getActiveEvent(event)
  }, {
    render: false
  }); // show the dialog

  const dialog = root.querySelector('.pg-dialog--event');
  const dialogContent = parseHTML(renderEventDialog(newState));
  clearHTML(dialog);
  dialog.appendChild(dialogContent);
  if (!dialog.open) dialog.showModal();
});var getCloseEventDialog = (({
  component
}) => () => {
  const {
    root
  } = component;
  const dialog = root.querySelector('.pg-dialog--event');
  dialog.close();
});var getSelectActiveLocation = (({
  setState,
  component
}) => _location => {
  const {
    toggleSortDialog
  } = component;
  toggleSortDialog(false); // close upon selection

  setState({
    view: 'guide',
    sortBy: 'location',
    activeLocation: _location
  });
});var getSelectActiveDay = (({
  state,
  setState
}) => event => {
  const activeDay = event.target.value;
  const timeString = state.activeTime.toLocaleTimeString();
  setState({
    activeDay,
    // also reset the active time to match the selected day
    activeTime: new Date(`${activeDay} ${timeString}`)
  }, {
    render: false
  });
});var getSelectActiveTime = (({
  state,
  setState
}) => ({
  target
}) => {
  // validate the time and autocorrect
  if (target.min > target.value) target.value = target.min;
  if (target.max < target.value) target.value = target.max;
  const {
    interval
  } = state.times || DEFAULT_TIMES;
  const [hr, mn] = target.value.split(':');
  const roundedMn = Math.round(mn / interval) * interval;
  const newMn = String(roundedMn).length === 1 ? `0${roundedMn}` : roundedMn;
  target.value = `${hr}:${newMn}`; // set the time

  const {
    activeDay
  } = state;
  const timeString = target.value;
  setState({
    activeTime: new Date(`${activeDay} ${timeString}`)
  }, {
    render: false
  });
});var getSelectSortBy = (({
  setState,
  component
}) => sortBy => {
  const {
    toggleSortDialog
  } = component;
  toggleSortDialog(false); // close upon selection

  setState({
    view: 'guide',
    marker: 'none',
    sortBy
  });
});var getChangeSearch = (({
  setState
}) => ({
  target
}) => {
  setState({
    currentSearch: target.value
  }, {
    render: false
  });
});var getSearch = (({
  state,
  setState
}) => event => {
  event.preventDefault();
  const {
    currentSearch,
    events
  } = state; // filter search results

  const searchResults = events.filter(event => {
    return search$1(currentSearch, event.name) || search$1(currentSearch, event.location) || search$1(currentSearch, event.host) || search$1(currentSearch, event.category) || search$1(currentSearch, event.description);
  }).sort((prev, next) => {
    // sort name matches at the top
    const prevName = search$1(currentSearch, prev.name);
    const nextName = search$1(currentSearch, next.name);
    return !prevName && nextName ? 1 : prevName && !nextName ? -1 : 0;
  });
  setState({
    searchResults,
    sortBy: 'search'
  });
});var getShowFloorPlanMessage = (({
  state,
  component
}) => (event, message) => {
  const {
    floorPlanInteractive
  } = state;
  if (!floorPlanInteractive) return; // skip if floor plan is not in original size mode

  const {
    root
  } = component;
  const {
    clientY
  } = event;
  const messageEl = root.querySelector('.pg-floor-plan-message');
  const ACTIVE_CLASS = 'pg-floor-plan-message--active';
  messageEl.style.top = `${clientY}px`;
  messageEl.classList.add(ACTIVE_CLASS);
  messageEl.textContent = message; // show message for 3 seconds

  setTimeout(() => {
    messageEl.classList.remove(ACTIVE_CLASS);
    setTimeout(() => {
      messageEl.textContent = '';
    }, 600); // allow animation to finish first
  }, 3000);
});var getMaximize = (({
  state,
  setState
}) => () => {
  setState({
    maximized: !state.maximized
  });
});class ProgramGuideNative extends HTMLElement {
  // the initial state is never reflected in the UI;
  // a loading spinner is rendered instead.
  #state = {
    locations: [],
    events: [],
    times: DEFAULT_TIMES,
    activeDay: '',
    activeTime: new Date(),
    activeLocation: '',
    activeEvent: getActiveEvent(DEFAULT_EVENT),
    sortBy: 'location',
    // location | allTime | now | nowOnly | time | favorites
    view: 'guide',
    // guide | floorPlan
    marker: 'none',
    // one of the provided location names or 'none'
    favorites: [],
    currentSearch: '',
    searchResults: [],
    hasFloorPlan: false,
    floorPlan: {},
    floorPlanInteractive: false,
    maximized: false
  }; // cache to avoid unnecessary reloading

  templateCache = {
    floorPlanImage: new Image()
  };

  constructor() {
    super();
    const component = this;
    component.root = component.attachShadow({
      mode: 'open'
    }); // assign action methods from other files

    const actionMap = {
      render: getRender,
      handleEsc: getHandleEsc,
      handleHashChange: getHandleHashChange,
      addFavorite: getAddFavorite,
      removeFavorite: getRemoveFavorite,
      showFloorPlan: getShowFloorPlan,
      toggleFloorPlanInteractive: getToggleFloorPlanInteractive,
      toggleHeaders: getToggleHeaders,
      toggleSortDialog: getToggleSortDialog,
      openEventDialog: getOpenEventDialog,
      closeEventDialog: getCloseEventDialog,
      selectActiveLocation: getSelectActiveLocation,
      selectActiveDay: getSelectActiveDay,
      selectActiveTime: getSelectActiveTime,
      selectSortBy: getSelectSortBy,
      changeSearch: getChangeSearch,
      search: getSearch,
      showFloorPlanMessage: getShowFloorPlanMessage,
      maximize: getMaximize
    };

    for (const actionName in actionMap) {
      const action = actionMap[actionName];
      component[actionName] = component.provideState(action);
    } // render loading spinner


    component.render({
      loading: true
    }); // asynchronously fetch data and update internal state

    component.waitForFetch = getLocations().then(async locations => {
      // the initial results of the async data fetcher
      const programGuideData = {
        events: await getEvents(),
        times: await getTimes(),
        favorites: await getFavorites(),
        floorPlan: await getFloorPlan(),
        locations: locations
      }; // load floor plan image and store it in the cache

      const {
        floorPlanImage
      } = component.templateCache;
      const {
        imageSrc,
        dimensions
      } = programGuideData.floorPlan;
      const {
        height,
        width
      } = dimensions;
      floorPlanImage.className = 'pg-floor-plan-image';
      floorPlanImage.src = imageSrc;
      floorPlanImage.height = height;
      floorPlanImage.width = width; // derive the active date and time from the earliest date in the data

      const {
        days
      } = programGuideData.times || DEFAULT_TIMES;
      const activeDay = Object.keys(days)[0];
      const firstTime = days[activeDay][0].date;
      const {
        date,
        time
      } = getDateInfo(firstTime); // update the data and replace the loading spinner with the real element

      component.setState({ ...programGuideData,
        activeLocation: locations[0],
        activeDay,
        activeTime: new Date(`${date} ${time}`),
        hasFloorPlan: !!imageSrc
      });
    });
  }

  connectedCallback() {
    const component = this;
    window.addEventListener('keydown', component.handleEsc);
    component.waitForFetch.then(() => {
      window.addEventListener('hashchange', component.handleHashChange);
    });
  }

  disconnectedCallback() {
    const component = this;
    window.removeEventListener('keydown', component.handleEsc);
    window.removeEventListener('hashchange', component.handleHashChange);
  }

  setState(state, options = {
    render: true
  }) {
    const component = this;
    component.#state = { ...component.#state,
      ...state
    };
    if (options.render) component.render();
    return { ...component.#state
    };
  }

  provideState(getCallback) {
    const component = this;
    return (...args) => {
      const state = { ...component.#state
      };
      const setState = component.setState.bind(component);
      const callback = getCallback({
        state,
        setState,
        component
      });
      return callback(...args);
    };
  }

}var Components=/*#__PURE__*/Object.freeze({__proto__:null,ProgramGuideNative:ProgramGuideNative});module.exports=Components;