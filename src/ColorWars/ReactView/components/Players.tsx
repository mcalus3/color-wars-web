import PlayerVisual from "../../ReduxStore/containers/PlayerVisual";
import KillsLabel from "../../ReduxStore/containers/KillsLabel";
import { Layer } from "react-konva";
import * as React from "react";
import { Player } from "../../utils/objectTypes";

export interface Props {
  activePlayers: number;
  phase: string;
  players: Player[];
}

class Players extends React.Component<Props, object> {
  render() {
    let playerComponents: JSX.Element[] = [];
    let killsLabelComponents: JSX.Element[] = [];

    const paused: boolean =
      this.props.phase === "paused"
        ? true
        : this.props.phase === "initializing"
        ? true
        : this.props.phase === "endGame"
        ? true
        : false;

    for (let i = 0; i < this.props.activePlayers; i++) {
      playerComponents.push(<PlayerVisual id={i} key={i.toString()} />);
      if (paused && !this.props.players[i].aiControlled) {
        killsLabelComponents.push(
          <KillsLabel id={i} key={i.toString() + "l"} />
        );
      }
    }

    return <Layer>{playerComponents.concat(killsLabelComponents)}</Layer>;
  }
}

export default Players;
