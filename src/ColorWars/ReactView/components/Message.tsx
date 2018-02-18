import { Text, Rect, Label, Layer, Tag } from 'react-konva';
import { Stage } from 'konva';
import * as React from 'react';

import {
  COLORS,
  createHistogram,
  getFontSize
} from '../../utils/functions';
import { Component } from 'react';
import { Point, Player } from '../../utils/objectTypes';

export interface Props {
  state: string;
  fields: number[][];
  players: Player[];
  mobile: number;
}

class EndGame extends Component<Props, object> {
  canvasDim: Point = { X: 0, Y: 0 };
  winner: string | undefined = 'no one';
  color: string = 'black';
  layer: any;
  text: string = '0';
  subText: string = '0';

  componentDidMount() {
    var Stage = this.layer.getStage() as Stage;
    this.canvasDim = { X: Stage.width(), Y: Stage.height() };

    var colorsArr: number[];
    var valuesArr: number[];
    ({ colorsArr, valuesArr } = createHistogram(this.props.fields));
    this.color = COLORS[colorsArr[0]];

    let winner = this.props.players.filter(p => p.color === colorsArr[0])[0];
    this.winner = winner.name;

    this.subText = this.props.mobile === 0 ? 'Press space to' : 'Tap screen to'
    
    if (this.props.state === 'initializing'){
      this.text = this.props.mobile === 0 ? 'Press space\nto start' : 'Tap screen\nto start';
      this.subText = ' ';

    } else if (this.props.state === 'endGame'){
      this.text = this.winner + ' wins!';
      this.subText += ' restart';

    } else if (this.props.state === 'paused'){
      this.text = ' '
      this.subText += ' continue';      
    }

    this.forceUpdate();
  }

  render() {
    return (
      <Layer ref={(c) => { this.layer = c; }}>
        <Rect
          width={this.canvasDim.X}
          height={this.canvasDim.Y}
          x={0}
          y={0}
          fill={'white'}
          opacity={0.3}
        />
        {this.drawTitle()}
        <Label y={this.canvasDim.Y /2} x={this.canvasDim.X / 2}>
          <Tag
          pointerDirection='down'
          cornerRadius={getFontSize(this.canvasDim.X)/3}
          />
          <Text
          align={'center'}
          text={this.text}
          fontSize={getFontSize(this.canvasDim.X)}
          fill={this.color}
          shadowColor={'white'}
          stroke='black'
          shadowOffsetX={2}
          shadowOffsetY={2}
          />
        </Label>
        <Label y={this.canvasDim.Y /2} x={this.canvasDim.X / 2}>
          <Tag
          pointerDirection='up'
          cornerRadius={getFontSize(this.canvasDim.X)/2}
          />
          <Text
          align={'center'}
          text={this.subText}
          fontSize={getFontSize(this.canvasDim.X/2)}
          fill={this.color}
          shadowColor={'white'}
          stroke='black'
          shadowOffsetX={2}
          shadowOffsetY={2}
          />
        </Label>
      </Layer>
    );
  }

  drawTitle(){
    if (this.props.state === 'initializing'){
      return <Label y={this.canvasDim.Y / 5} x={this.canvasDim.X / 2}>
      <Tag
      fill='grey'
      opacity={0.75}
      pointerDirection='down'
      cornerRadius={getFontSize(this.canvasDim.X)/2}
      />
      <Text
      align={'center'}
      text={' Color wars '}
      fontSize={getFontSize(this.canvasDim.X)}
      fill={this.color}
      shadowColor={'white'}
      stroke='black'
      shadowOffsetX={2}
      shadowOffsetY={2}
      padding={getFontSize(this.canvasDim.X)/4}
      />
    </Label>
    } else {
      return null
    }
  }
}

export default EndGame;
