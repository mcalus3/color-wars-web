import * as React from 'react';
import * as ReactKonva from 'react-konva';
import * as Konva from 'konva';

export interface Props {
  color: string;
  rect: {
    X: number,
    Y: number,
    Width: number,
    Height: number
  };
  key: string;
}

class ScoreBar extends React.Component<Props, {oldProps: Props}>{
  
  private previousBar: {
    X: number,
    Y: number,
    Width: number,
    Height: number
  };
  
  constructor(props: Props){
    super(props);
    this.previousBar = this.props.rect;
  }

  componentDidMount(){
    this.animateBar();    
  }

  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: object){
    if (nextProps.rect.X === this.props.rect.X && nextProps.rect.Y === this.props.rect.Y && nextProps.rect.Width === this.props.rect.Width && nextProps.rect.Height === this.props.rect.Height){
       return false;
     }
     return true;
  }

  componentWillUpdate(nextProps: Props, nextState: object){
  this.previousBar = this.props.rect;
  }

  render(){
    return (
      <ReactKonva.Rect
        ref={this.props.color}
        fill={this.props.color}
        shadowBlur={2}
        opacity={0.8}
      />
    );
  }

  componentDidUpdate(){
    this.animateBar();
  }

  animateBar(){
    const bar = this.refs[this.props.color] as any;
    if (bar === undefined){
      return;
    }
    
        bar.x = this.previousBar.X;
        bar.y = this.previousBar.Y;    
        bar.width = this.previousBar.Width;
        bar.height = this.previousBar.Height;
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