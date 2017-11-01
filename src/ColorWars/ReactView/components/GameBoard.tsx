import EndGame from '../../ReduxStore/containers/EndGame';
import Tails from '../../ReduxStore/containers/Tails';
import * as React from 'react';
import { Stage } from 'react-konva';

import { Point } from '../../utils/objectTypes';
import Players from '../../ReduxStore/containers/Players';
import Fields from '../../ReduxStore/containers/Fields';
import { getCanvasDimension } from '../../utils/functions';

export interface Props {
  dim: Point,
  gameState: string
}

class GameBoard extends React.Component<Props, object>{
  
  canvDim: Point = {X: 0, Y: 0};
  
    componentWillMount(){
    }

    render(){
      this.canvDim = getCanvasDimension(this.props.dim);
      return (
      <div className="App">
        <Stage width={this.canvDim.X} height={this.canvDim.Y} ref='stage'>

          <Fields />

          <Tails />

          <Players />

          {this.renderEndGame()}
          
      </Stage>
      </div>
    );
  }

  renderEndGame(){
    if(this.props.gameState === 'endGame'){
      return <EndGame />; 
    }
    return null;
  }
}

export default GameBoard;