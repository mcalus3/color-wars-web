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

      {this.renderAppHeader()} 

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

  renderAppHeader(){
    if (this.props.touch === 0) {
      return <div className="App-header">
          <h2>Welcome to Color Wars</h2>
        </div>
    }
    return null;
  }
}

export default Game;