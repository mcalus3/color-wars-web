import * as React from 'react';
import './Game.css';
import GameBoard from './ReduxStore/containers/GameBoard';
import ScoreBoard from './ReduxStore/containers/ScoreBoard';
import SettingsControl from './ReduxStore/containers/SettingsControl';

export interface Props {
  touch: number
}

class Game extends React.Component<Props, object> {
  render() {
    return (
      <div className="Game">

        <div className="Board">
          <div className="ScoreBoard">
            <ScoreBoard />
          </div>
          <div className="GameBoard">
            <GameBoard />
          </div>
        </div>

        <SettingsControl />
        
      </div>
    );
  }
}

export default Game;