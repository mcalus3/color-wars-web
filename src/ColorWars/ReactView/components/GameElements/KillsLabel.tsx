import * as React from 'react';
import * as ReactKonva from 'react-konva';
import { COLORS, layouter, swap } from '../../../utils/functions';
import { Player, Point } from '../../../utils/objectTypes';

export interface Props {
  player: Player;
  dim: Point;
  mapping: { [key: string]: string };
}

class KillsLabel extends React.Component<Props, object> {
  ref: any;
  playerRectangle: any= {X: 0, Y: 0, Width: 0, Height: 0};

  componentDidMount(){
    this.forceUpdate();
  }

  componentWillUpdate(nextProps: Props){

    const stage = this.ref.getStage();

    let canvasDimension = {
      X: stage.width(),
      Y: stage.height()
    };

    this.playerRectangle = layouter(
      nextProps.dim,
      canvasDimension,
      nextProps.player.coords
    );

  }

  render() {
    const invertedMapping = swap(this.props.mapping);

    const kdText = 'Kills: ' + this.props.player.kills + '\nDeaths: ' + this.props.player.deaths;
    const dirText = 'Directions: \nup: ' + invertedMapping['up'] + '\ndown: ' + invertedMapping['down'] + '\nleft: ' + invertedMapping['left'] + '\nright: ' + invertedMapping['right'];
    return this.renderLabels(kdText, dirText);
  }

  renderLabels(kdText: string, dirText: string){
    let color: string = COLORS[this.props.player.color];

    let coords: any = {};
    coords.x = Math.floor(this.playerRectangle.X + this.playerRectangle.Width/2);
    coords.y = Math.floor(this.playerRectangle.Y);
    coords.lowerY = Math.floor(this.playerRectangle.Y + this.playerRectangle.Height);
    
    return  <ReactKonva.Group>
    <ReactKonva.Label
    x={coords.x}
    y={coords.y}
    ref={(c) => { this.ref = c; }}>

      <ReactKonva.Tag
          fill={color}
          pointerDirection= 'down'
          pointerWidth={10}
          pointerHeight={10}
          lineJoin= 'round'
          shadowColor= 'white'
      />
      <ReactKonva.Text
      text={kdText}
      fontFamily='Calibri'
      fontSize={this.playerRectangle.Width*2}
      padding={5}
      fill='white'
      stroke='black'
      strokeWidth={0.5}
      />
    </ReactKonva.Label>

    <ReactKonva.Label
    x={coords.x}
    y={coords.lowerY}
    ref={(c) => { this.ref = c; }}>

      <ReactKonva.Tag
          fill={color}
          pointerDirection= 'up'
          pointerWidth={10}
          pointerHeight={10}
          lineJoin= 'round'
          shadowColor= 'white'
      />
      <ReactKonva.Text
      text={dirText}
      fontFamily='Calibri'
      fontSize={this.playerRectangle.Width*2}
      padding={5}
      fill='white'
      stroke='black'
      strokeWidth={0.5}
      />
    </ReactKonva.Label>
    
    </ReactKonva.Group>
  }
}

export default KillsLabel;