import TouchScreen from '../../ReactView/components/TouchScreen';
import * as actions from '../actionTypes';
import { connect, Dispatch } from 'react-redux';
import { GameState } from '../../utils/objectTypes';

export function mapStateToProps(state: GameState) {
  return {
    tick: state.currentTick,
    enabled: state.touchscreenDetected,
    playerCoords: state.playersById[0].coords,
    nextDirection: state.playersById[0].nextDirection,
    dim: state.dimension
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.Action>) {
  return {
    onPlayerModify: (value: string) =>
    dispatch(actions.changeDirection(0, value))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TouchScreen);
