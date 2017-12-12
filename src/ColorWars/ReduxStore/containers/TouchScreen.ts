import TouchScreen from '../../ReactView/components/TouchScreen';
import * as actions from '../actionTypes';
import { connect, Dispatch } from 'react-redux';
import { GameState } from '../../utils/objectTypes';

export function mapStateToProps(state: GameState) {
  return {
    tick: state.currentTick,
    mode: state.touchscreenMode,
    playerCoords: state.playersById[0].coords,
    nextDirection: state.playersById[0].nextDirection,
    dim: state.dimension,
    phase: state.gamePhase
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.Action>) {
  return {
    onPlayerModify: (value: string) =>
    dispatch(actions.changeDirection(0, value)),
    onRestart: () =>
    dispatch(actions.createGame()),
    onResume: () =>
    dispatch(actions.resume())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TouchScreen);
