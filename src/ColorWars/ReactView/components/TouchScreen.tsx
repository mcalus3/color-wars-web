import * as React from "react";
import * as actions from '../../ReduxStore/actionTypes';
import * as ReactKonva from 'react-konva';
import { Point } from "../../utils/objectTypes";
import { Stage } from "konva";
import { shiftDirectionLeft, shiftDirectionRight } from "../../AI/AiFunctions";

export interface Props {
  tick: number,
  mode: number,
  playerCoords: Point,
  nextDirection: string,
  dim: Point,
  phase: string,
  onPlayerModify: (value: string) => actions.ChangeDirection,
  onRestart: () => actions.CreateBoard,
  onResume: () => actions.Resume
};
  
class TouchScreen extends React.Component<Props> {

  stage: Stage;
  directing: boolean;
  tapped: boolean;

  componentDidMount(){
    let rect: any = this.refs.rect;
    this.stage = rect.getStage();

    rect.width(this.stage.width());
    rect.height(this.stage.height());    

    rect.on('touchstart', () => {
      this.directing = true;
      this.playAgain();
    });
    rect.on('touchend', () => {this.directing = false});

    this.forceUpdate();
  }

  playAgain(){
    if (this.props.phase === 'endGame'){
      this.props.onRestart();
    }
      
    if (this.props.phase === 'paused'){
      this.props.onResume();
    }

    if (this.props.phase === 'initializing'){
      this.props.onResume();
    }
  }

  componentWillReceiveProps(){
    
    if (this.directing){
      this.directPlayer();  
          
    } else {
      this.tapped = false;
    }
  }

  shouldComponentUpdate(nextProps: Props){
    if (this.props.mode == nextProps.mode){
      return false
    }
    return true;    
  }

  render() {
    return <ReactKonva.Layer>
      {this.renderTouchHelpers()}
      <ReactKonva.Rect ref={'rect'}/>
    </ReactKonva.Layer>
  }

  renderTouchHelpers(){
    
    if (this.stage === undefined){
      return null;
    }

    if (this.props.mode === 1){
      return this.renderLineHelper();

    } else if (this.props.mode === 2){
      return this.renderArrowHelpers();
    }

    return null;
  }

  renderLineHelper(){
    return <ReactKonva.Line
      stroke={'black'}
      opacity={0.2}
      points={[this.stage.width()/2, this.stage.height()/4, this.stage.width()/2, this.stage.height()/4*3]}
    />
  }

  renderArrowHelpers(){
    return <ReactKonva.Group> 
    <ReactKonva.Circle
      radius={1}
      stroke={'black'}
      opacity={0.2}
      x={this.stage.width()/2}
      y={this.stage.height()/2}

    />
    <ReactKonva.Arrow
      points={[0,0,20,0]}
      stroke={'black'}
      opacity={0.2}
      x={this.stage.width()/2}
      y={this.stage.height()/2}
      fill={'black'}
    />
    <ReactKonva.Arrow
      points={[0,0,0,20]}
      stroke={'black'}
      opacity={0.2}
      x={this.stage.width()/2}
      y={this.stage.height()/2}
      fill={'black'}
    />
    <ReactKonva.Arrow
      points={[0,0,-20,0]}
      stroke={'black'}
      opacity={0.2}
      x={this.stage.width()/2}
      y={this.stage.height()/2}
      fill={'black'}
    />
    <ReactKonva.Arrow
      points={[0,0,0,-20]}
      stroke={'black'}
      opacity={0.2}
      x={this.stage.width()/2}
      y={this.stage.height()/2}
      fill={'black'}
    />
    </ReactKonva.Group>;
  }

  directPlayer(){
    let dir = this.calculateDirectionForTouch(this.props.mode)
    
    if (dir !== this.props.nextDirection){
      this.props.onPlayerModify(dir);      
    }
  }
  
  calculateDirectionForTouch(mode: number): string{

    let pointerCoords = this.stage.getPointerPosition();
    if (pointerCoords === undefined) return this.props.nextDirection;
    
    switch (mode){
      case 1:
      return this.calculateDirectionRelativeMode(pointerCoords);
      case 2:
      return this.calculateDirectionAbsoluteMode(pointerCoords);
      case 3:
      return this.calculateDirectionFollowingMode(pointerCoords);
    }
    return this.props.nextDirection;
  }

  calculateDirectionRelativeMode(pointerCoords: {x: number, y: number}){
    
    if (!this.tapped){
      
      this.tapped = true;

      let dir = this.props.nextDirection;
      if (dir === 'none'){
        dir = 'up';
      }

      if (pointerCoords.x < this.stage.width()/2){
        return shiftDirectionLeft(dir);

      } else {
        return shiftDirectionRight(dir);
      }

    } else {
      return this.props.nextDirection;      
    }
  }

  calculateDirectionAbsoluteMode(pointerCoords: {x: number, y: number}){

    let dir = 'none';
    let x = this.stage.width()/2 - pointerCoords.x;
    let y = this.stage.height()/2 - pointerCoords.y;
    
    if (x < y){
      if (y > -x){
        dir = 'up';
      } else {
        dir = 'right';      
      }
    } else {
      if (y > -x){
        dir = 'left';
      } else {
        dir = 'down';
      }
    }
  
    return dir;
  }

  calculateDirectionFollowingMode(pointerCoords: {x: number, y: number}){
    
    let pX = this.props.playerCoords.X / this.props.dim.X * this.stage.width();
    let pY = this.props.playerCoords.Y / this.props.dim.Y * this.stage.height();

    let dir = 'none';
    let x = pX - pointerCoords.x;
    let y = pY - pointerCoords.y;
    
    if (x < y){
      if (y > -x){
        dir = 'up';
      } else {
        dir = 'right';      
      }
    } else {
      if (y > -x){
        dir = 'left';
      } else {
        dir = 'down';
      }
    }
  
    return dir;
  }
}

export default TouchScreen;