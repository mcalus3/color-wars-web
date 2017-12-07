import * as React from "react";
import * as actions from '../../ReduxStore/actionTypes';
import * as ReactKonva from 'react-konva';

export interface Props {
  enabled: boolean,
  onPlayerModify: (value: string) => actions.ChangeDirection
};
  
class TouchScreenButtons extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  componentDidMount(){
    let rect: any = this.refs.rect;
    let stage = rect.getStage();
    stage.on('contentClick', () => {
      this.props.onPlayerModify(calculateDirectionForTouch(stage.getPointerPosition(), stage.width(), stage.height()));
    });
  }

  render() {
    return <ReactKonva.Layer>
      <ReactKonva.Rect
        ref={'rect'}
      />
    </ReactKonva.Layer>;
  }
}

export default TouchScreenButtons;

function calculateDirectionForTouch(coords: {x: number, y: number}, mX: number, mY: number): string{
  let dir = 'none';
  let x = coords.x/mX;
  let y = coords.y/mY;
  
  if (x < y){
    if (x + y < 1){
      dir = 'left';
    } else {
      dir = 'down';      
    }
  } else {
    if (x + y < 1){
      dir = 'up';
    } else {
      dir = 'right';
    }
  }

  return dir;
}