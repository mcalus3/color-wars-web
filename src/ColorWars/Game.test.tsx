import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Game from './Game';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Game touch={0}/>, div);
  expect(1 + 1 === 2).toBeTruthy();
});
