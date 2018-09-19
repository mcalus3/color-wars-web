import TouchScreen from '../../ReactView/components/TouchScreen';
import * as actions from '../actionTypes';
import { connect, Dispatch } from 'react-redux';
import { AppState } from '../../utils/objectTypes';

export function mapStateToProps(state: AppState) {
  return {
    tick: state.gameState.currentTick,
    mode: state.gameState.touchscreenMode,
    playerCoords: state.gameState.playersById[0].coords,
    nextDirection: state.gameState.playersById[0].nextDirection,
    dim: state.gameState.dimension,
    phase: state.gameState.gamePhase
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.Action>) {
  return {
    onPlayerModify: (value: string) =>
      dispatch(actions.changeDirection(0, value)),
    onRestart: () => dispatch(actions.createGame()),
    onResume: () => dispatch(actions.resume())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TouchScreen);
