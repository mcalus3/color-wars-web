import SettingsComponent from '../../ReactView/components/SettingsComponent';
import * as actions from '../actionTypes';
import { connect, Dispatch } from 'react-redux';

import { GameState, Point } from '../../utils/objectTypes';

export function mapStateToProps(state: GameState) {
  return {
    dimension: state.dimension,
    startingTerritory: state.startingTerritorySize,
    endTime: state.endTime,
    optimized: state.optimized,
    phase: state.gamePhase,
    touch: state.touchscreenMode
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.Action>) {
  return {
    onOptimization: (value: boolean) =>
      dispatch(actions.setOptimization(value)),
    onCreateGame: () => dispatch(actions.createGame()),
    onPauseGame: () => dispatch(actions.pause()),
    onResumeGame: () => dispatch(actions.resume()),
    onResizeBoard: (size: Point) => dispatch(actions.resizeBoard(size)),
    onChangeStartTerritory: (size: number) =>
      dispatch(actions.setStartingTerritory(size)),
    onChangeGameTime: (frames: number) => dispatch(actions.setGameTime(frames)),
    onTemplateChange: (no: number) => dispatch(actions.changeMapTemplate(no)),
    onTouchChange: (val: number) => dispatch(actions.setTouch(val))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsComponent);
