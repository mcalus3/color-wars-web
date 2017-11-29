import * as React from 'react';
import * as ReactKonva from 'react-konva';
import * as Konva from 'konva';
import { colorNumToName, layouter } from '../../../utils/functions';
import { Player, Point } from '../../../utils/objectTypes';

export interface Props {
  player: Player;
  dim: Point;
  optimized: boolean;
}

class PlayerComponent extends React.Component<Props, object> {
  rect: any;
  canvas: any;
  rectangle: any;

  componentDidMount() {
    this.rect = this.refs.rect as any;
    this.canvas = this.rect.getCanvas() as any;
  }

  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: object) {
    if (
      nextProps.player.coords.X === this.props.player.coords.X &&
      nextProps.player.coords.Y === this.props.player.coords.Y
    ) {
      return false;
    }
    return true;
  }

  render() {
    var canvasDimension: Point = { X: 0, Y: 0 };
    if (!(this.canvas === undefined)) {
      canvasDimension = {
        X: this.canvas.width,
        Y: this.canvas.height
      };
    }

    let color: string = colorNumToName[this.props.player.color];
    this.rectangle = layouter(
      this.props.dim,
      canvasDimension,
      this.props.player.coords
    );

    let props: any = {
      ref: 'rect',
      width: this.rectangle.Width,
      height: this.rectangle.Height,
      fill: color,
      shadowBlur: 7,
      opacity: 1
    };
    if (this.props.optimized) {
      props.x = this.rectangle.X;
      props.y = this.rectangle.Y;
    }
    return <ReactKonva.Rect {...props} />;
  }

  componentDidUpdate() {
    if (!this.props.optimized) {
      this.rect.to({
        x: this.rectangle.X,
        y: this.rectangle.Y,
        duration: this.props.player.speed / 40,
        easing: Konva.Easings.Linear
      });
    }
  }
}
export default PlayerComponent;
