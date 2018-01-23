import Message from '../../ReactView/components/Message';
import { AppState } from '../../utils/objectTypes';
import { connect } from 'react-redux';

export function mapStateToProps(state: AppState) {
  return {
    state: state.gameState.gamePhase,
    fields: state.gameState.fieldColors,
    players: state.gameState.playersById,
    mobile: state.gameState.touchscreenMode
  };
}

export default connect(mapStateToProps)(Message);
