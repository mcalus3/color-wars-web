import TouchScreen from "../../ReduxStore/containers/TouchScreen";
import Message from "../../ReduxStore/containers/Message";
import Tails from "../../ReduxStore/containers/Tails";
import * as React from "react";
import { Stage } from "react-konva";

import { Point } from "../../utils/objectTypes";
import Players from "../../ReduxStore/containers/Players";
import Fieldsx from "../../ReduxStore/containers/Fields";
import { getDimensionForGameBoard } from "../../utils/functions";

export interface Props {
  dim: Point;
  gameState: string;
  touchscreen: number;
  tick: number;
}

class GameBoard extends React.Component<Props, object> {
  canvDim: Point = { X: 0, Y: 0 };

  render() {
    this.canvDim = getDimensionForGameBoard(
      this.props.dim,
      this.props.touchscreen !== 0
    );

    return (
      <div>
        <Stage width={this.canvDim.X} height={this.canvDim.Y}>
          <Fieldsx />

          <Tails />

          <Players />

          {this.renderMessage()}

          {this.renderTouchScreen()}
        </Stage>
      </div>
    );
  }

  renderMessage() {
    if (
      this.props.gameState === "endGame" ||
      this.props.gameState === "paused" ||
      this.props.gameState === "initializing"
    ) {
      return <Message />;
    }
    return null;
  }

  renderTouchScreen() {
    if (this.props.touchscreen !== 0) {
      return <TouchScreen />;
    }
    return null;
  }
}

export default GameBoard;
