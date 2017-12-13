import { FastLayer, Text, Rect } from 'react-konva';
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

  componentDidMount() {
    var Stage = this.layer.getStage() as Stage;
    this.canvasDim = { X: Stage.width(), Y: Stage.height() };

    var colorsArr: number[];
    var valuesArr: number[];
    ({ colorsArr, valuesArr } = createHistogram(this.props.fields));
    this.color = COLORS[colorsArr[0]];

    let winner = this.props.players.filter(p => p.color === colorsArr[0])[0];
    this.winner = winner.name;

    this.forceUpdate();
  }

  render() {
    if (this.props.state !== 'endGame'){
      return null;
    }
    return (
      <FastLayer ref={(c) => { this.layer = c; }}>
        <Rect
          width={this.canvasDim.X}
          height={this.canvasDim.Y}
          x={0}
          y={0}
          fill={'white'}
          opacity={0.5}
        />
        <Text
          align={'center'}
          y={this.canvasDim.Y / 5 * 2}
          x={this.canvasDim.X / 4}
          text={this.winner + ' wins!'}
          fontSize={getFontSize(this.canvasDim.X)}
          fill={this.color}
          shadowColor={'black'}
          shadowOffsetX={2}
          shadowOffsetY={2}
        />
        <Text
          align={'center'}
          y={this.canvasDim.Y / 5 * 2 + getFontSize(this.canvasDim.X)}
          x={this.canvasDim.X / 4}
          text={this.props.mobile === 0 ? 'Press space to restart' : 'Tap screen to restart'}
          fontSize={getFontSize(this.canvasDim.X/2)}
          fill={this.color}
          shadowColor={'black'}
          shadowOffsetX={2}
          shadowOffsetY={2}
        />
      </FastLayer>
    );
  }
}

export default EndGame;
