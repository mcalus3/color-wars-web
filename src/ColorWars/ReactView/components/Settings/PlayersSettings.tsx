import PlayerSettings from '../../../ReduxStore/containers/PlayerSettings';
import 'rc-slider/assets/index.css';
import '../../../Settings.css';
import * as React from 'react';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import * as actions from '../../../ReduxStore/actionTypes';

const SliderWithTooltip = createSliderWithTooltip(Slider);

export interface Props {
  playersAmount: number;
  onPlayersChange: (amount: number) => actions.SetPlayersAmount;
}

class PlayersSettings extends React.Component<Props, object> {
  maxPlayers = 50;

  render() {
    var players = [];
    for (var i: number = 0; i < this.props.playersAmount; i++) {
      players.push(<PlayerSettings id={i} key={i.toString()} />);
    }
    return (
      <div className="SettingsPanel">
        <h2>Players</h2>
        <SliderWithTooltip
          min={0}
          max={Math.log2(this.maxPlayers)}
          value={Math.log2(this.props.playersAmount)}
          step={1 / this.maxPlayers}
          tipFormatter={myFormatter}
          onChange={this.onSpeedChange}
        />
        <div className="PlayersSettings">{players}</div>
      </div>
    );
  }

  onSpeedChange = (v: number) => {
    let realAmount = Math.round(Math.pow(2, v));
    this.props.onPlayersChange(realAmount);
  };
}

export default PlayersSettings;

function myFormatter(v: number) {
  return `${Math.round(Math.pow(2, v))}`;
}
