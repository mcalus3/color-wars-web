import Timer from '../../ReduxStore/containers/Timer';
import * as React from 'react';
import { Stage, FastLayer, Layer } from 'react-konva';

import { Point } from '../../utils/objectTypes';
import {
  COLORS,
  createHistogram,
  getDimensionForScoreBoard
} from '../../utils/functions';
import ScoreBar from './GameElements/ScoreBar';

export interface Props {
  fieldColors: number[][];
  dimension: Point;
  mobile: number;
}

class ScoreBoard extends React.Component<Props, object> {
  render() {
    let canvDim = getDimensionForScoreBoard(
      this.props.dimension,
      this.props.mobile !== 0
    );
    const scoreBars = createScoreBars(this.props.fieldColors, canvDim);
    return (
      <div className="ScoreBoard">
        <Stage width={canvDim.X} height={canvDim.Y}>
          <FastLayer>{scoreBars}</FastLayer>

          <Layer>
            <Timer />
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default ScoreBoard;

// helpers

function createScoreBars(fields: number[][], canvasDimension: Point) {
  var bars: JSX.Element[] = [];

  var colorsArr, valuesArr: number[];
  ({ colorsArr, valuesArr } = createHistogram(fields, false));

  colorsArr.forEach((value: number, index: number) => {
    bars.push(
      <ScoreBar
        color={COLORS[value]}
        rect={scoreBoardLayouter(valuesArr, index, canvasDimension)}
        key={COLORS[value]}
      />
    );
  });
  return bars;
}

function scoreBoardLayouter(
  values: number[],
  position: number,
  dim: Point
): { X: number; Y: number; Width: number; Height: number } {
  const total = values.reduce((a, b) => a + b, 0);
  const x =
    position === 0 ? 0 : values.slice(0, position).reduce((a, b) => a + b, 0);

  return {
    X: Math.floor((dim.X * x) / total),
    Y: 0,
    Width: Math.floor((dim.X * values[position]) / total),
    Height: dim.Y
  };
}
