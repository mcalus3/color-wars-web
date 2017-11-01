import * as React from 'react';
import * as ReactKonva from 'react-konva';

class Timer extends React.Component<{secondsLeft: number}, object>{

  canvas: HTMLCanvasElement;

  componentDidMount() {
    let text = this.refs.text as any;
    this.canvas = text.getCanvas() as any;
  }

  render(){
    let fontWidth = this.canvas ? this.canvas.width/3 : 0;
    return (
      <ReactKonva.Text
      ref='text'
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

  getTimerText(secs: number): string{
    if(secs < 0){
      return '00 : 00';
    }
    
    var minutes: number = Math.floor(secs / 60);
    if (minutes === 0){
      var firstStr: string = '00';
    } else if (minutes < 10) {
      var firstStr: string = '0'+minutes.toString();
    } else {
      var firstStr: string = minutes.toString();
    }

    var seconds: number = (secs % 60);
    if (seconds === 0){
      var secStr: string = '00';
    } else if (secs < 10) {
      var secStr: string = '0'+seconds.toString();
    } else {
      var secStr: string = seconds.toString();
    }
    return  firstStr +' : '+ secStr; 
  }
}

export default Timer;