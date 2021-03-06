import * as React from "react";
import * as Konva from "konva";
import * as ReactKonva from "react-konva";

class Timer extends React.Component<{ secondsLeft: number }, object> {
  stage?: Konva.Stage;
  text: any;

  componentDidMount() {
    this.stage = this.text.getStage() as any;
  }

  render() {
    if (this.stage === undefined) {
      return (
        <ReactKonva.Label
          ref={c => {
            this.text = c;
          }}
        />
      );
    }

    let fontWidth = this.stage.height();

    return (
      <ReactKonva.Label y={0} x={fontWidth * 1.25}>
        <ReactKonva.Tag pointerDirection="up" />
        <ReactKonva.Text
          ref={c => {
            this.text = c;
          }}
          text={this.getTimerText(this.props.secondsLeft)}
          fontSize={fontWidth}
          fontFamily={"Calibri"}
          fill={this.props.secondsLeft > 5 ? "white" : "red"}
          stroke={"black"}
          strokeWidth={0.5}
        />
      </ReactKonva.Label>
    );
  }

  getTimerText(secs: number): string {
    return new Date(secs * 1000).toISOString().substr(14, 5);
  }
}

export default Timer;
