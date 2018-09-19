import * as React from 'react';
import * as ReactKonva from 'react-konva';
import * as Konva from 'konva';
import {
  COLORS,
  FRAMES_PER_SEC,
  layouter,
  getRotation
} from '../../../utils/functions';
import { Player, Point } from '../../../utils/objectTypes';

export interface Props {
  player: Player;
  dim: Point;
  optimized: boolean;
  state: string;
}

class PlayerComponent extends React.Component<
  Props,
  { images: { [key: string]: HTMLImageElement } }
> {
  playerRef: any;
  stage: Konva.Stage;
  playerRectangle: any = { X: 0, Y: 0, Width: 0, Height: 0 };

  constructor(props: Props) {
    super(props);
    this.state = { images: {} };
  }

  componentDidMount() {
    this.stage = this.playerRef.getStage() as any;

    this.loadImages();
  }

  componentWillUpdate(nextProps: Props) {
    let canvasDimension = {
      X: this.stage.width(),
      Y: this.stage.height()
    };

    this.playerRectangle = layouter(
      nextProps.dim,
      canvasDimension,
      nextProps.player.coords
    );
  }

  render() {
    return <ReactKonva.Group>{this.renderPlayerTexture()}</ReactKonva.Group>;
  }

  componentDidUpdate() {
    if (!this.props.optimized) {
      if (this.playerRef === null) {
        return;
      }

      this.playerRef.to({
        x: this.playerRectangle.X + this.playerRectangle.Width / 2,
        y: this.playerRectangle.Y + this.playerRectangle.Height / 2,
        duration: Math.max(this.props.player.speed, 1) / FRAMES_PER_SEC,
        easing: Konva.Easings.Linear,
        rotation: getRotation(this.props.player.direction)
      });
    }
  }

  renderPlayerTexture() {
    if (this.props.player.state === 'eliminated') {
      return null;
    }

    if (this.props.player.avatar === 1) {
      return this.renderRect();
    } else {
      return this.renderPoly();
    }
  }

  renderRect() {
    let color: string = COLORS[this.props.player.color];
    let props = this.getTextureProps('small', this.props.optimized);

    return (
      <ReactKonva.Rect
        {...props}
        ref={c => {
          this.playerRef = c;
        }}
        fill={color}
        offset={{
          x: props.width / 2,
          y: props.height / 2
        }}
      />
    );
  }

  renderPoly() {
    let color: string = COLORS[this.props.player.color];
    let props: any = {};
    if (this.props.optimized) {
      props.x = this.playerRectangle.X + this.playerRectangle.Width / 2;
      props.y = this.playerRectangle.Y + this.playerRectangle.Height / 2;
    }

    return (
      <ReactKonva.RegularPolygon
        {...props}
        shadowBlur={5}
        shadowColor={'white'}
        stroke={'black'}
        strokeWidth={0.5}
        opacity={1}
        sides={this.props.player.avatar + 3}
        radius={(this.playerRectangle.Width * 2) / 3}
        ref={c => {
          this.playerRef = c;
        }}
        fill={color}
      />
    );
  }

  renderSkull() {
    if (this.props.player.state === 'eliminated') {
      // Optimization problems
      // return this.renderImage('skull', 'big');
    }
    return null;
  }

  renderImage(imageName: string, size: string) {
    let props = this.getTextureProps(size, true);

    let img = (
      <ReactKonva.Image
        {...props}
        image={this.state.images[imageName]}
        offset={{
          x: props.width / 2,
          y: props.height / 2
        }}
      />
    );

    return img;
  }

  getTextureProps(size: string, optimized: boolean) {
    let props: any = {
      shadowBlur: 5,
      shadowColor: 'white',
      stroke: 'black',
      strokeWidth: 0.5,
      opacity: 1
    };

    if (size === 'big') {
      props.width = this.playerRectangle.Width * 2;
      props.height = this.playerRectangle.Height * 2;
    } else {
      props.width = this.playerRectangle.Width;
      props.height = this.playerRectangle.Height;
    }

    if (optimized) {
      props.x = this.playerRectangle.X + this.playerRectangle.Width / 2;
      props.y = this.playerRectangle.Y + this.playerRectangle.Height / 2;
    }

    return props;
  }

  loadImages() {
    for (let name of Object.keys(textureURIs)) {
      const image = new Image();
      image.src = textureURIs[name];
      image.onload = () => {
        let newImages = { ...this.state.images };
        newImages[name] = image;
        this.setState({
          images: newImages
        });
      };
    }
  }
}

export default PlayerComponent;

var textureURIs = {
  skull:
    'data:image/svg+xml;utf8,<svg version="1" xmlns="http://www.w3.org/2000/svg" width="510" height="490"><path fill-opacity="0.25" fill="#FFF" stroke="#000" stroke-width="12.5" d="M335.4 412.27l63.28 32.9c14.98 13.03 11.24 21.9 21.65 29.96 10.26 9.43 16.8 10.96 22.9 2.08 4.85-10.1 3.88-20.2 5.4-31.2 7.08-6.8 12.9-10.2 18.74-17 6.38-7.1 6.1-14.1-3.75-19.1-8.2-3.3-15.96-5-25.8-2.1-6.26 2-12.92 3.1-21.24-.4l-68.28-31.7-194-67.3c-26.1-12.7-47.78-22.2-73.6-36.5-14.02-11.1-9.5-23.8-26.48-34.1-7.47-3.7-12.87-5.4-18.85 4.8-3.82 9-3.52 18.6-4.1 27.9-6.68 7.2-14.24 11.4-19.73 20.3-7.95 12.8 4.1 17 10.6 18.6 18.44 4.6 25.1-3.7 42.1-.3 33.05 15.4 66.4 31.4 98.3 47.1z" stroke-linejoin="round"/><path fill-opacity="0.25" fill="#FFF" stroke="#000" stroke-width="12.5" d="M349.56 354.82l94.5-44.54c17.9-7.08 20.4 2.9 36.2 0 12.08-.14 22.07-4.86 21.24-16.23-6.1-9.03-11.8-14.7-22.48-24.57.56-10.54-1.4-20.67-5.4-30.8-4.17-5.97-11.67-8.6-22.9 2.08-11.38 8.6-7.78 20.12-22.07 32.05-23.3 11.6-44.54 21.8-70.35 34.6l-196.5 67.9c-22.75 12.1-43.42 23.3-69.5 33.3-21.24 5.3-20.4-7.7-46.2.9-7.37 5.8-7.23 14.2-1.26 20.4 6.93 6.8 11.8 11.1 17.9 17.1 1.94 8.6 2.22 16 3.33 26.3 4.16 12.6 13.33 11.9 21.23 5.8 3.47-4.3 7.77-8.2 10.4-12.9 3.6-6.2 7.64-13.3 12.5-19.1l62.85-33.3z" stroke-linejoin="round"/><path fill-opacity="0.25" fill="#FFF" stroke="#000" stroke-width="12.5" d="M128.5 221.56c-19.14-18.6-32.5-50.9-34.37-85.75-2-38.4 18.22-76.5 48.54-98.3C176.64 13.6 233.43 7 268.75 8.8c23.92.02 77.2 12.42 96.02 26.43 33 24 50.68 58.04 51.9 96.85 1.82 38.98-14.6 68.68-34.7 87.2"/><path fill-opacity="0.25" fill="#FFF" d="M130.4 215s-23.13 70.03 21.44 81.97l16.25 93.66c17.1 73.72 154.4 73.77 174.6 0l16.2-93.66c45.7-12.2 22.5-82 22.5-82z"/><path fill-opacity="0.25" fill="none" stroke="#000" stroke-width="12.5" d="M129.66 112.27c-7.75 6.78-6.77 16.97-5.38 32.2 1.1 11.55 8.48 22.93 8.87 33.5 2.7 22.27-3.88 44.56-6.98 62.78-2.13 20.92 3.88 38.95 11.63 45.92 7.75 6.88 17.76 9.73 28.27 12.94 9.55 2.5 14.5 6.9 21.73 12.3 8.6 9.2 10.66 16.7 10.46 26m183.8-226.1c7.75 6.8 6.77 17 5.38 32.2-1.1 11.6-8.48 23-8.87 33.5-2.7 22.3 3.88 44.6 6.98 62.8 2.13 21-3.88 39-11.63 46-7.75 6.9-21.94 10.6-28.27 12.9-7.37 2.6-14.92 7.3-21.72 12.7-8.2 7.9-10.66 16.3-10.47 25.6"/><path fill-opacity="0.25" fill="none" stroke="#000" stroke-width="12.5" d="M151.82 296.96c6.94 16.8 14.3 33.16 15 50.37-3.2 13.88-2.23 30.25 1.24 43.3 4.44 17.9 21.78 39.12 39.13 46.2 17.7 6.45 28.8 8.12 48.7 8.12"/><path fill-opacity="0.25" fill="none" stroke="#000" stroke-width="12.5" d="M358.92 296.96c-6.94 16.8-14.3 33.16-14.98 50.37 3.2 13.87 2.22 30.25-1.25 43.3-4.5 17.9-22 38.5-39.4 45.58-17.4 7.1-28.5 8.8-48.3 8.8"/><path stroke="#000" stroke-width="1pt" d="M251.9 245.7c-9.7 7.38-11.86 9.86-17.22 18.02-1.94 3.15-5.56 10.5-6.55 15.44-1 4.94-1.73 12.1-1.72 15.9.1 12.85 4.1 20.9 8.6 20.63 4-.5 9.1-4.7 16.8-14.1m7.1-55.7c9.7 7.3 11.9 9.8 17.2 18 2 3.1 5.6 10.5 6.6 15.4s1.8 12.1 1.7 15.9c0 12.8-4.1 20.9-8.5 20.6-4-.5-9.1-4.7-16.8-14.1m-89.5-112.3c13.5-2.4 26.5-3.9 40-5.4 17.6-4.5 26.5 15.6 21.7 30.8-6.1 13.4-14.7 25.2-24.5 36.6-7.6 8.6-16.7 9.9-25.4 7-7-2-13.4-6.3-20.4-16.3-3-8.6-5.6-13.1-9.5-23.7-3.02-9.9 1.7-24.6 18.3-29.2zm172.1 0c-13.4-2.4-26.5-3.9-39.9-5.4-17.6-4.5-26.5 15.6-21.6 30.8 6.1 13.4 14.7 25.2 24.6 36.6 7.7 8.6 16.8 9.9 25.4 7 7-2 13.5-6.3 20.4-16.3 3.1-8.6 5.7-13.1 9.6-23.7 3.1-9.9-1.7-24.6-18.3-29.2z"/><path fill-opacity="0.25" fill="none" stroke="#000" stroke-width="6.25" d="M169.23 304.53c5.7 13.34 7.45 18.4 11.55 31.72 3.5 12.3 4.8 19.8 6.95 37.26m153.37-69.7c-5.7 13.4-7.46 18.4-11.57 31.7-3.5 12.3-4.78 19.8-6.94 37.3"/><path fill-opacity="0.25" fill="none" stroke="#000" stroke-width="5" d="M193.52 335.73c14.7 9.03 40.16 10.42 62.95 10 25.4-.12 47.13-1.95 61.4-10.6m-119.2 24.15c16.23 10.2 35.33 13.7 57.32 12.88 22.8-.56 40.3-2.48 56-13.17"/><path fill-opacity="0.25" fill="none" stroke="#000" stroke-width="6.25" d="M186.9 371.64c17.36 20.95 41.6 24.6 69.17 25.32 29.5 1.08 59.16-10.65 66.8-25.3"/><path stroke="#000" stroke-width="5" d="M198.44 340.26l-.4 41.2m13.93-36.83l-.2 44.12m15.2-42.25l-.43 46.2m13.96-45.16l-.22 46.83m15.4-46.4v46.82m14.57-47.1l.2 46.8m12.92-48.1l.4 46m14.8-48.5l.2 44.1m13.53-49.6l.4 41.6"/></svg>',
  dog:
    'data:image/svg+xml;utf8,<svg version="1" xmlns="http://www.w3.org/2000/svg" width="958px" height="958px"><path d="M166.175,414.818c8-108.2,15.6-202.601,102-213.2c10.5-17.6,23.2-33.8,37.8-48.4c14.9-14.9,31.4-27.6,49.4-38.1			c-18.5-20.9-44.9-42.6-79.101-51c-74.3-18.4-202.6-5.4-264.7,245C-50.425,559.418,156.375,547.818,166.175,414.818z"/>		<path d="M681.475,64.018c-34.5,8.5-61,30.4-79.4,51.4c17.7,10.4,34,23,48.7,37.7c14.601,14.6,27.101,30.8,37.501,48.3			c87.699,9.8,95.299,104.6,103.299,213.3c9.801,133,216.602,144.7,154.602-105.8C884.176,58.618,755.775,45.618,681.475,64.018z"/>		<path d="M646.774,202.518c-17.5-23.9-40-44-66-58.7c-30.399-17.2-65.399-27-102.799-27c-36.8,0-71.4,9.5-101.4,26.2			c-26.5,14.7-49.399,35-67.199,59.2c-25.4,34.6-40.4,77.2-40.4,123.3v124.3c-53,47.699-84.7,113.399-84.7,186			c0,140.6,122.5,255.5,276.7,263.6v-269.2c-36.6-5.1-64-25.899-64-50.8c0-28.7,36.5-52,81.5-52c45,0,81.5,23.3,81.5,52			c0,24.9-27.4,45.7-64,50.8v269.2c154.2-8.1,276.4-123,276.4-263.6c0-72.5-33.4-138.2-85.4-186v-124.3			C686.975,279.518,672.074,237.018,646.774,202.518z M297.075,768.518c-11.399,0-20.7-9.3-20.7-20.699c0-11.4,9.3-20.7,20.7-20.7			c11.4,0,20.7,9.3,20.7,20.7C317.775,759.218,308.475,768.518,297.075,768.518z M300.475,694.518c-11.4,0-20.7-9.3-20.7-20.699			c0-11.4,9.3-20.7,20.7-20.7s20.7,9.3,20.7,20.7C321.075,685.218,311.875,694.518,300.475,694.518z M322.975,397.418			c0-16.6,13.4-30,30-30s30,13.4,30,30c0,16.6-13.4,30-30,30S322.975,414.018,322.975,397.418z M362.675,735.718			c-11.4,0-20.7-9.3-20.7-20.7c0-11.399,9.3-20.699,20.7-20.699c11.399,0,20.7,9.3,20.7,20.699			C383.275,726.418,374.075,735.718,362.675,735.718z M595.074,735.718c-11.399,0-20.699-9.3-20.699-20.7			c0-11.399,9.3-20.699,20.699-20.699c11.4,0,20.7,9.3,20.7,20.699C615.774,726.418,606.475,735.718,595.074,735.718z			 M603.975,427.418c-16.6,0-30-13.4-30-30c0-16.6,13.4-30,30-30s30,13.4,30,30C633.975,414.018,620.574,427.418,603.975,427.418z			 M657.274,653.218c11.4,0,20.7,9.3,20.7,20.7s-9.3,20.7-20.7,20.7c-11.399,0-20.7-9.3-20.7-20.7			C636.574,662.418,645.875,653.218,657.274,653.218z M660.675,768.518c-11.4,0-20.7-9.3-20.7-20.699c0-11.4,9.3-20.7,20.7-20.7			c11.399,0,20.7,9.3,20.7,20.7C681.274,759.218,672.074,768.518,660.675,768.518z"/></svg>'
};
