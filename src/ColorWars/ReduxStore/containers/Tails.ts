import Tails from '../../ReactView/components/Tails';
import { GameState } from '../../utils/objectTypes';
import { connect } from 'react-redux';

export function mapStateToProps(state: GameState) {
  return {
    tails: state.tailsById,
    players: state.playersById,
    activePlayers: state.activePlayers,
    dimension: state.dimension
  };
}

export default connect(mapStateToProps)(Tails);
