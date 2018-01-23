import GameBoard from '../../ReactView/components/GameBoard';
import { AppState } from '../../utils/objectTypes';
import { connect } from 'react-redux';

export function mapStateToProps(state: AppState) {
  return {
    dim: state.gameState.dimension,
    gameState: state.gameState.gamePhase,
    touchscreen: state.gameState.touchscreenMode,
    tick: state.gameState.currentTick
  };
}

export default connect(mapStateToProps)(GameBoard);
