import Game from '../../Game';
import { AppState } from '../../utils/objectTypes';
import { connect } from 'react-redux';

export function mapStateToProps(state: AppState) {
  return {
    mobile: state.gameState.touchscreenMode !== 0,
  };
}

export default connect(mapStateToProps)(Game);
