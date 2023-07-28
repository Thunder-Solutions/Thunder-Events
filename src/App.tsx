import type { Component } from 'solid-js';
import Menu from './components/menuBar/menuBar';
import css from './App.module.css';
import TimeHeader from './components/timeHeader/timeHeader';
import TimeBlock from './components/timeBlock/timeBlock';
import Event from './components/event/event';
import NavBar from './components/navBar/navBar';

const App: Component = () => {
  return (
    <div class={css.schedule}>
      <Menu />
      <TimeHeader />
      <div class={css.scheduleBody}>
        <TimeBlock time="2:00">
          <Event />
          <Event />
          <Event />
        </TimeBlock>
        <TimeBlock time="4:00">
          <Event />
          <Event />
          <Event />
        </TimeBlock>
      </div>
      <NavBar />
    </div>
  );
};

export default App;
