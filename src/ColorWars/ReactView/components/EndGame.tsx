import { FastLayer, Text, Rect } from 'react-konva';
import * as React from 'react';

import { colorNumToName, createHistogram, getFontSize } from '../../utils/functions';
import { Component } from 'react';
import { PlayerByName, Point, Player } from '../../utils/objectTypes';

export interface Props{
  state: string,
  fields: number[][],
  players: PlayerByName
}

class EndGame extends Component<Props, object>{
  
  canvasDim: Point = {X: 0, Y: 0};
  winner: string | undefined = 'no one';
  color: string = 'black';
  
  componentDidMount() {
    let layer = this.refs.layer as any;    
    var canvas = layer.canvas._canvas as any;
    this.canvasDim = {X:canvas.width,Y:canvas.height};

    var colorsArr: number[]; var valuesArr: number[];
    ({colorsArr, valuesArr} = createHistogram(this.props.fields));
    this.color = colorNumToName[colorsArr[0]];

    var players = Object.keys(this.props.players).map(n => this.props.players[n]);
    let winner = players.find(p => p.color === colorsArr[0]) as Player;
    this.winner = winner.name;

    this.forceUpdate();
  }

  render(){
    return (
      <FastLayer ref='layer'>
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
        y={this.canvasDim.Y/5*2}
        x={this.canvasDim.X/4}
        text={this.winner + ' wins!'}
        fontSize={getFontSize(this.canvasDim.X)}
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
