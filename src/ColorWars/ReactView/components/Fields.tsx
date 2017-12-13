import { FastLayer } from 'react-konva';
import * as React from 'react';

import { Point } from '../../utils/objectTypes';
import {
  COLORS,
  layouter,
  PointsAreEqual
} from '../../utils/functions';
import { Component } from 'react';
import { getAllCoords } from '../../ReduxStore/reducers/GameLogic/CreateWorld';
import { Stage } from 'konva';

export interface Props {
  fields: number[][];
  lastUpdatedCoords: Point[];
  dimension: Point;
}

class Fields extends Component<Props, object> {
  layer: any;
  ctx: CanvasRenderingContext2D;
  canvasDim: Point;
  coords: Point[] = [];
  redraw: boolean; // workaround for bug, konva overwrites my fields during canvas resize

  componentDidMount() {
    var canvas = this.layer.canvas._canvas as any;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    let stage = this.layer.getStage() as Stage;
    this.canvasDim = { X: stage.width(), Y: stage.height() };
  }

  componentWillUpdate(nextProps: Props) {
    let stage = this.layer.getStage() as Stage;
    
    if (!PointsAreEqual(this.props.dimension, nextProps.dimension) ||
        !PointsAreEqual(this.canvasDim, {X: stage.width(), Y: stage.height()})) {
      
          this.coords = getAllCoords(nextProps.dimension);
          this.redraw = true;
    
    } else if (this.props.lastUpdatedCoords !== nextProps.lastUpdatedCoords){
      if (!this.redraw){
        this.coords = nextProps.lastUpdatedCoords;              
      } else {
        this.redraw = false;        
      }
    }

    this.canvasDim = { X: stage.width(), Y: stage.height() };
  }

  render() {
    return <FastLayer ref={(c) => { this.layer = c; }} />;
  }

  componentDidUpdate(){
    let fields = this.props.fields;

    if (this.coords.length === 0) {
      return;
    }

    let color: number = fields[this.coords[0].X][this.coords[0].Y];
    this.ctx.fillStyle = COLORS[color];
    this.ctx.shadowColor = 'Grey';
    this.ctx.shadowBlur = COLORS[color] === 'White' ? 0 : 2;
    this.ctx.globalAlpha = COLORS[color] === 'White' ? 1 : 0.7;
    this.ctx.beginPath();

    this.coords.forEach(coord => {

      if (fields[coord.X][coord.Y] !== color) {
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.beginPath();

        color = fields[coord.X][coord.Y];
        this.ctx.shadowBlur = COLORS[color] === 'White' ? 0 : 2;
        this.ctx.globalAlpha = COLORS[color] === 'White' ? 1 : 0.7;
        this.ctx.fillStyle = COLORS[color];
      }

      this.drawRectangle(coord, this.props.dimension);
    });

    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.globalAlpha = 1;
  }

  drawRectangle(
    fieldLocation: Point,
    dim: Point
  ) {
    var X, Y, Width, Height;
    ({ X, Y, Width, Height } = layouter(
      dim,
      this.canvasDim,
      fieldLocation
    ));

    this.ctx.rect(X, Y, Width, Height);
  }
}

export default Fields;
