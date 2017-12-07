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

class PlayersSettings extends React.Component<Props, { players: number }> {
  render() {
    var players = [];
    for (var i: number = 0; i < this.props.playersAmount; i++) {
      players.push(
        <PlayerSettings id={i} key={i.toString()} />
      );
    }
    return (
      <div className="Settings">
        <h2>Players</h2>
        <SliderWithTooltip
          min={1}
          max={8}
          step={1}
          dots={true}
          value={this.props.playersAmount}
          tipFormatter={myFormatter}
          onChange={this.playersChanged}
        />
        <div className="PlayersSettings">{players}</div>
      </div>
    );
  }

  playersChanged = (v: number) => {
    this.setState({ players: v });
    this.props.onPlayersChange(v);
  }
}

export default PlayersSettings;

function myFormatter(v: {}) {
  return `${v}`;
}
