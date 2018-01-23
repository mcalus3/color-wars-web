import Tails from '../../ReactView/components/Tails';
import { AppState } from '../../utils/objectTypes';
import { connect } from 'react-redux';

export function mapStateToProps(state: AppState) {
  return {
    tails: state.gameState.tailsById,
    players: state.gameState.playersById,
    dimension: state.gameState.dimension
  };
}

export default connect(mapStateToProps)(Tails);
