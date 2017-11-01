import PlayerVisual from '../../ReduxStore/containers/PlayerVisual';
import { FastLayer } from 'react-konva';
import * as React from 'react';

export interface Props {
  playerNames: string[],
  activePlayers: number,
}

class Players extends React.Component<Props, object>{

  render(){
    let playerComponents: JSX.Element[] = [];

    this.props.playerNames.slice(0, this.props.activePlayers).forEach((name: string) => {
      playerComponents.push(
        <PlayerVisual
          name={name}
          key={name}
        />
      );
    });

    return (
      <FastLayer ref='players'>
      {playerComponents}
      </FastLayer>
    );
  }
}

export default Players;
