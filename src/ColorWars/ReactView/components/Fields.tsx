import { FastLayer } from 'react-konva';
import * as React from 'react';

import { Point } from '../../utils/objectTypes';
import {
  colorNumToName,
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
  redraw: boolean;
  layer: any;
  ctx: CanvasRenderingContext2D;
  lastUpdatedCoords: Point[];
  canvasDim: Point = { X: 0, Y: 0 };

  componentDidMount() {
    var canvas = this.layer.canvas._canvas as any;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    this.lastUpdatedCoords = this.props.lastUpdatedCoords;
    this.drawFields();
  }

  componentWillUpdate(nextProps: Props) {
    if (!PointsAreEqual(nextProps.dimension, this.props.dimension)) {
      this.redraw = true;
    }

    nextProps.lastUpdatedCoords.forEach((p: Point) =>
      this.lastUpdatedCoords.push(p)
    );
  }

  render() {
    return <FastLayer ref={(c) => { this.layer = c; }} />;
  }

  componentDidUpdate() {
    this.drawFields();
  }

  drawFields() {
    if (this.redraw) {
      this.lastUpdatedCoords = getAllCoords(this.props.dimension);
      this.redraw = false;
    }

    if (this.lastUpdatedCoords.length === 0) {
      return;
    }

    let stage = this.layer.getStage() as Stage;
    if (
      stage.width() !== this.canvasDim.X ||
      stage.height() !== this.canvasDim.Y
    ) {
      this.redraw = true;
    }

    this.canvasDim = { X: stage.width(), Y: stage.height() };
    let fields = this.props.fields;

    let color: number =
      fields[this.lastUpdatedCoords[0].X][this.lastUpdatedCoords[0].Y];
    this.ctx.fillStyle = colorNumToName[color];
    this.ctx.shadowColor = 'grey';
    this.ctx.shadowBlur = colorNumToName[color] === 'white' ? 0 : 2;
    this.ctx.globalAlpha = colorNumToName[color] === 'white' ? 1 : 0.7;
    this.ctx.beginPath();

    this.lastUpdatedCoords.forEach(coord => {
      if (fields[coord.X][coord.Y] !== color) {
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.beginPath();

        color = fields[coord.X][coord.Y];
        this.ctx.shadowBlur = colorNumToName[color] === 'white' ? 0 : 2;
        this.ctx.globalAlpha = colorNumToName[color] === 'white' ? 1 : 0.7;
        this.ctx.fillStyle = colorNumToName[color];
      }

      this.drawRectangle(coord, this.ctx, this.canvasDim);
    });

    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.globalAlpha = 1;
    this.lastUpdatedCoords = [];
  }

  drawRectangle(
    fieldLocation: Point,
    ctx: CanvasRenderingContext2D,
    canvasDimension: Point
  ) {
    var X, Y, Width, Height;
    ({ X, Y, Width, Height } = layouter(
      this.props.dimension,
      canvasDimension,
      fieldLocation
    ));

    ctx.rect(X, Y, Width, Height);
  }
}

export default Fields;
