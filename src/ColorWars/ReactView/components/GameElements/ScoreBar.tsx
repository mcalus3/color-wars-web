import * as React from 'react';
import * as ReactKonva from 'react-konva';
import * as Konva from 'konva';

export interface Props {
  color: string;
  rect: {
    X: number;
    Y: number;
    Width: number;
    Height: number;
  };
  key: string;
}

class ScoreBar extends React.Component<Props, { oldProps: Props }> {

  componentDidMount() {
    this.animateBar();
  }

  render() {
    return (
      <ReactKonva.Rect
        ref={this.props.color}
        fill={this.props.color}
        shadowBlur={2}
        opacity={0.8}
      />
    );
  }

  componentDidUpdate() {
    this.animateBar();
  }

  animateBar() {
    const bar = this.refs[this.props.color] as any;
    if (bar === undefined) {
      return;
    }

    bar.to({
      x: this.props.rect.X,
      y: this.props.rect.Y,
      width: this.props.rect.Width,
      height: this.props.rect.Height,
      duration: 0.5,
      easing: Konva.Easings.EaseInOut
    });
  }
}

export default ScoreBar;
