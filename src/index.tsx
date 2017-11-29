import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Game from './ColorWars/Game';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { gameReducer } from './ColorWars/ReduxStore/reducers/GameReducer';
import { GameState } from './ColorWars/utils/objectTypes';
import { initialState } from './ColorWars/utils/initialState';

import * as actions from './ColorWars/ReduxStore/actionTypes';

import { createStore, Reducer, Store } from 'redux';
import { Provider } from 'react-redux';

const gStore = initializeGame();

renderReactDom(gStore);

registerServiceWorker();

function initializeGame() {
  // create a store
  const store: Store<GameState> = createStore<GameState>(
    gameReducer as Reducer<GameState>,
    initialState
  );

  // initialize game
  requestAnimationFrame(() => store.dispatch(actions.createGame()));

  // add listener for key input
  document.addEventListener('keydown', (e: any) => {
    if (
      e.keyCode === 37 ||
      e.keyCode === 38 ||
      e.keyCode === 39 ||
      e.keyCode === 40
    ) {
      e.preventDefault();
    }
    store.dispatch(actions.actorAction(e.keyCode));
  });

  // start game loop
  setInterval(() => store.dispatch(actions.tick()), 25);

  return store;
}

function renderReactDom(store: Store<GameState>) {
  ReactDOM.render(
    <div className="App">
      <div className="App-header">
        <h2>Welcome to Color Wars</h2>
      </div>
      <Provider store={store}>
        <Game />
      </Provider>
    </div>,
    document.getElementById('root') as HTMLElement
  );
}
