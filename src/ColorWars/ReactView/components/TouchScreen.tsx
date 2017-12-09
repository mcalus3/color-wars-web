import * as React from "react";
import * as actions from '../../ReduxStore/actionTypes';
import * as ReactKonva from 'react-konva';
import { Point } from "../../utils/objectTypes";
import { Stage } from "konva";

export interface Props {
  tick: number,
  enabled: boolean,
  playerCoords: Point,
  nextDirection: string,
  dim: Point,
  onPlayerModify: (value: string) => actions.ChangeDirection
};
  
class TouchScreen extends React.Component<Props> {

  stage: Stage;
  directing: boolean;

  constructor(props: Props) {
    super(props);
  }

  componentDidMount(){
    let layer: any = this.refs.layer;
    let rect: any = this.refs.rect;
    this.stage = layer.getStage();

    rect.width(this.stage.width());
    rect.height(this.stage.height());    

    rect.on('touchstart', () => {this.directing = true});
    rect.on('touchend', () => {this.directing = false});
  }    

  render() {
    return <ReactKonva.Layer ref={'layer'}>
      <ReactKonva.Rect
        ref={'rect'}
      />
    </ReactKonva.Layer>
  }

  componentDidUpdate(){
    if (this.directing){
      this.directPlayer();      
    }
  }
  
  directPlayer(){
    let dir = this.calculateDirectionForTouch()
    if (dir !== this.props.nextDirection){
      this.props.onPlayerModify(dir);      
    }
  }
  
  calculateDirectionForTouch(): string{
    let pointerCoords = this.stage.getPointerPosition();

    if (pointerCoords === undefined) return this.props.nextDirection;
    
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