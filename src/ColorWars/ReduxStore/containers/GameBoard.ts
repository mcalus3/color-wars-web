import GameBoard from '../../ReactView/components/GameBoard';
import { GameState } from '../../utils/objectTypes';
import { connect } from 'react-redux';

export function mapStateToProps(state: GameState) {
  return {
    dim: state.dimension,
    gameState: state.gamePhase,
    touchscreen: state.touchscreenDetected,
  };
}

export default connect(mapStateToProps)(GameBoard);
