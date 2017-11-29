import { Layer } from 'react-konva';
import { Rect, Node } from 'konva';
import * as React from 'react';

import { Point, Player } from '../../utils/objectTypes';
import { colorNumToName, layouter } from '../../utils/functions';

export interface Props {
  tails: Point[][];
  players: Player[];
  activePlayers: number;
  dimension: Point;
}

class Tails extends React.Component<Props, object> {
  redraw: boolean;
  tails: Point[][];
  dimension: Point;
  canvasDimension: Point = { X: 0, Y: 0 };
  layer: any;
  tailPrototypes: Rect[] = [];

  constructor(props: Props) {
    super(props);
    this.dimension = props.dimension;
    this.tails = this.props.tails;
  }

  componentDidMount() {
    this.createPrototypes(this.props.dimension);
  }

  componentWillUpdate(nextProps: Props) {
    if (nextProps.dimension !== this.dimension) {
      this.createPrototypes(nextProps.dimension);
    }
    for (let i = 0; i < this.props.activePlayers; i++) {
      var oldTail = this.tails[i];
      var newTail = this.props.tails[i];
      if (newTail.length > oldTail.length) {
        newTail.slice(oldTail.length, newTail.length).forEach((p: Point) => {
          let X, Y, Width, Height;
          ({ X, Y, Width, Height } = layouter(
            nextProps.dimension,
            this.canvasDimension,
            p
          ));

          let clone = this.tailPrototypes[i].clone({
            x: X,
            y: Y
          });
          this.layer.add(clone);
          this.tails[i].push({ ...p });
          clone.draw();
        });
      } else if (newTail.length === 0) {
        this.layer.getChildren().forEach((node: Node) => {
          if (node.name() === i.toString()) {
            node.destroy();
            this.redraw = true;
          }
        });
        this.tails[i] = [];
      }
      if (this.redraw) {
        this.layer.draw();
        this.redraw = false;
      }
    };
  }

  render() {
    return <Layer ref={(c) => { this.layer = c; }} />;
  }

  createPrototypes(dim: Point) {
    let canvas = this.layer.canvas._canvas as HTMLCanvasElement;
    this.canvasDimension = { X: canvas.width, Y: canvas.height };

    let X, Y, Width, Height;
    ({ X, Y, Width, Height } = layouter(dim, this.canvasDimension, {
      X: 0,
      Y: 0
    }));
    for (let i = 0; i < this.props.players.length; i++) {
      let color = colorNumToName[this.props.players[i].color];
      this.tailPrototypes[i] = new Rect({
        width: Width,
        height: Height,
        shadowBlur: 3,
        opacity: 0.25,
        fill: color,
        name: i.toString()
      });
      this.tailPrototypes[i].cache();
    }
  }
}

export default Tails;
