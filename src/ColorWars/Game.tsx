import * as React from 'react';
import './Game.css';
import GameBoard from './ReduxStore/containers/GameBoard';
import ScoreBoard from './ReduxStore/containers/ScoreBoard';
import SettingsControl from './ReduxStore/containers/SettingsControl';
import NavBar from './ReduxStore/containers/NavBar';

export interface Props {
  mobile: boolean
}

class Game extends React.Component<Props, object> {
  render() {
    return (
      <div className="Game">
        <NavBar />
        {renderGithubRibbon(this.props.mobile)}
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

function renderGithubRibbon(mobile: boolean){
  if (mobile){
    return null;
  } else {
    return <a target="_blank" className="github-fork-ribbon right-top" href="https://github.com/mcalus3/color-wars-web" data-ribbon="Fork me on GitHub" title="Fork me on GitHub">Fork me on GitHub</a>
  }
}