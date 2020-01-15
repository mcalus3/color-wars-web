import { FastLayer } from "react-konva";
import { Rect, Node, Stage } from "konva";
import * as React from "react";

import { Point, Player } from "../../utils/objectTypes";
import {
  COLORS,
  layouter,
  COLOR_NUMS,
  PointsAreEqual
} from "../../utils/functions";

export interface Props {
  tails: Point[][];
  players: Player[];
  dimension: Point;
}

class Tails extends React.Component<Props, object> {
  layer: any;
  tailPrototypes: Rect[] = [];
  canvasDimension: Point = { X: 0, Y: 0 };

  shouldComponentUpdate(nextProps: Props) {
    if (
      nextProps.tails === this.props.tails &&
      nextProps.dimension === this.props.dimension
    ) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <FastLayer
        ref={c => {
          this.layer = c;
        }}
      />
    );
  }

  componentWillUpdate(nextProps: Props) {
    let stage = this.layer.getStage() as Stage;
    let newCanvDim = { X: stage.width(), Y: stage.height() };
    this.createPrototypesIfNecessary(nextProps, newCanvDim);
    this.canvasDimension = newCanvDim;

    let tailsToDestroy: number[] = this.calculateTailsToDestroy(
      nextProps.tails
    );
    let nodesToDraw: Point[][] = this.calculateNodesToDraw(nextProps.tails);

    tailsToDestroy.forEach(num => {
      let tail = this.layer.getChildren(
        (node: Node) => parseInt(node.name(), 10) === num
      );
      tail.forEach((node: Node) => {
        node.destroy();
      });
    });

    for (let i = 0; i < nodesToDraw.length; i++) {
      if (nodesToDraw[i] === undefined) {
        continue;
      }

      for (let j = 0; j < nodesToDraw[i].length; j++) {
        let p = nodesToDraw[i][j];

        let X, Y;
        ({ X, Y } = layouter(this.props.dimension, this.canvasDimension, p));

        let clone = this.tailPrototypes[i].clone({
          x: X,
          y: Y
        });
        this.layer.add(clone);
      }
    }

    this.layer.draw();
  }

  createPrototypesIfNecessary(nextProps: Props, canvDim: Point) {
    if (
      !PointsAreEqual(nextProps.dimension, this.props.dimension) ||
      !PointsAreEqual(canvDim, this.canvasDimension) ||
      this.colorsHasChanged(nextProps.players)
    ) {
      this.createPrototypes(nextProps, canvDim);
    }
  }

  colorsHasChanged(players: Player[]): boolean {
    for (let i = 0; i < players.length; i++) {
      if (this.tailPrototypes[i] === undefined) {
        return true;
      }

      let color = this.tailPrototypes[i].fill();
      if (players[i].color !== COLOR_NUMS[color]) {
        return true;
      }
    }
    return false;
  }

  createPrototypes(nextProps: Props, canvDim: Point) {
    let Width, Height;
    ({ Width, Height } = layouter(nextProps.dimension, canvDim, {
      X: 0,
      Y: 0
    }));
    for (let i = 0; i < nextProps.players.length; i++) {
      if (this.tailPrototypes[i] !== undefined) {
        this.tailPrototypes[i].clearCache();
      }

      let color = COLORS[nextProps.players[i].color];

      let sh = new Rect({
        width: Width,
        height: Height,
        shadowBlur: 3,
        opacity: 0.25,
        fill: color,
        name: i.toString()
      }) as any;
      sh.perfectDrawEnabled(false);
      sh.cache();

      this.tailPrototypes[i] = sh;
    }
  }

  calculateTailsToDestroy(tails: Point[][]) {
    let ret = [];
    for (let i = 0; i < this.props.tails.length; i++) {
      if (this.props.tails[i].length > tails[i].length) {
        ret.push(i);
      }
    }
    return ret;
  }

  calculateNodesToDraw(tails: Point[][]) {
    let ret = [];
    for (let i = 0; i < this.props.tails.length; i++) {
      if (this.props.tails[i].length < tails[i].length) {
        ret[i] = tails[i].slice(this.props.tails[i].length);
      }
    }
    return ret;
  }
}

export default Tails;
