import TouchScreen from '../../ReduxStore/containers/TouchScreen';
import EndGame from '../../ReduxStore/containers/EndGame';
import Tails from '../../ReduxStore/containers/Tails';
import * as React from 'react';
import { Stage } from 'react-konva';

import { Point } from '../../utils/objectTypes';
import Players from '../../ReduxStore/containers/Players';
import Fields from '../../ReduxStore/containers/Fields';
import { getCanvasDimension } from '../../utils/functions';

export interface Props {
  dim: Point;
  gameState: string;
  touchscreen: boolean;
}

class GameBoard extends React.Component<Props, object> {
  canvDim: Point = { X: 0, Y: 0 };

  render() {
    this.canvDim = getCanvasDimension(this.props.dim, this.props.touchscreen);

    return (
      <div>
        <Stage width={this.canvDim.X} height={this.canvDim.Y}>
          <Fields />

          <Tails />

          <Players />

          {this.renderEndGame()}

          {this.renderTouchScreen()}
        
        </Stage>
      </div>
    );
  }

  renderEndGame() {
    if (this.props.gameState === 'endGame') {
      return <EndGame />;
    }
    return null;
  }
  
  renderTouchScreen() {
    if (this.props.touchscreen) {
      return <TouchScreen />;
    }
    return null;
  }
}


export default GameBoard;
