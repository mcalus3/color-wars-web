import * as React from 'react';
import * as Konva from 'konva';
import * as ReactKonva from 'react-konva';

class Timer extends React.Component<{ secondsLeft: number }, object> {
  stage: Konva.Stage;
  text: any;

  componentDidMount() {
    this.stage = this.text.getStage() as any;
  }

  render() {
    let fontWidth = this.stage ? this.stage.width() / 3 : 0;
    return (
      <ReactKonva.Text
        ref={(c) => { this.text = c; }}
        x={0}
        y={0}
        text={this.getTimerText(this.props.secondsLeft)}
        fontSize={fontWidth}
        fontFamily={'Calibri'}
        fill={this.props.secondsLeft > 5 ? 'white' : 'red'}
        stroke={'black'}
      />
    );
  }

  getTimerText(secs: number): string {
    return new Date(secs * 1000).toISOString().substr(14, 5);
  }

}

export default Timer;
