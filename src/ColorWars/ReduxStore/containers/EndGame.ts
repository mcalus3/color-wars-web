import EndGame from '../../ReactView/components/EndGame';
import { GameState } from '../../utils/objectTypes';
import { connect } from 'react-redux';

export function mapStateToProps(state: GameState) {
  return {
    state: state.gamePhase,
    fields: state.fieldColors,
    players: state.playersById
  };
}

export default connect(mapStateToProps)(EndGame);
