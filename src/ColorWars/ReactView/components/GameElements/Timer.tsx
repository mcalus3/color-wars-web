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
    if (secs < 0) {
      return '00 : 00';
    }

    var minutes: number = Math.floor(secs / 60);
    var firstStr: string = minutes.toString();
    if (minutes === 0) {
      firstStr = '00';
    } else if (minutes < 10) {
      firstStr = '0' + minutes.toString();
    }

    var seconds: number = secs % 60;
    var secStr: string = seconds.toString();
    if (seconds === 0) {
      secStr = '00';
    } else if (secs < 10) {
      secStr = '0' + seconds.toString();
    }

    return firstStr + ' : ' + secStr;
  }
}

export default Timer;
