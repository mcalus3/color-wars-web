import PlayerVisual from '../../ReduxStore/containers/PlayerVisual';
import { Layer } from 'react-konva';
import * as React from 'react';

export interface Props {
  activePlayers: number;
}

class Players extends React.Component<Props, object> {
  render() {
    let playerComponents: JSX.Element[] = [];

    for (let i = 0; i < this.props.activePlayers; i++) {
        playerComponents.push(<PlayerVisual id={i} key={i.toString()} />);
      };

    return <Layer>{playerComponents}</Layer>;
  }
}

export default Players;