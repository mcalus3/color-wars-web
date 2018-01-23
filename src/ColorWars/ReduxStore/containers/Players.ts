import Players from '../../ReactView/components/Players';
import { AppState } from '../../utils/objectTypes';
import { connect } from 'react-redux';

export function mapStateToProps(state: AppState) {
  return {
    activePlayers: state.gameState.activePlayers,
    phase: state.gameState.gamePhase,
    players: state.gameState.playersById
  };
}

export default connect(mapStateToProps)(Players);
