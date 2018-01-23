import SettingsComponent from '../../ReactView/components/SettingsComponent';
import * as actions from '../actionTypes';
import { connect, Dispatch } from 'react-redux';

import { AppState, Point } from '../../utils/objectTypes';

export function mapStateToProps(state: AppState) {
  return {
    visible: state.settingsVisible,
    dimension: state.gameState.dimension,
    startingTerritory: state.gameState.startingTerritorySize,
    endTime: state.gameState.endTime,
    optimized: state.gameState.optimized,
    phase: state.gameState.gamePhase,
    touch: state.gameState.touchscreenMode
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.Action>) {
  return {
    onShow: (value: boolean) =>
    dispatch(actions.ShowSettings(value)),
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
