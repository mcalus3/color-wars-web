import GameBoard from '../../ReactView/components/GameBoard';
import { GameState } from '../../utils/objectTypes';
import { connect } from 'react-redux';

export function mapStateToProps(state: GameState) {
  return {
    dim: state.dimension,
    gameState: state.gamePhase,
    touchscreen: state.touchscreenMode,
    tick: state.currentTick
  };
}

export default connect(mapStateToProps)(GameBoard);
