import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Game from './Game';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Game mobile={false}/>, div);
  expect(1 + 1 === 2).toBeTruthy();
});