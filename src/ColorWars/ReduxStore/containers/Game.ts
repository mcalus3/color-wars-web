import Game from '../../Game';
import { AppState } from '../../utils/objectTypes';
import { connect } from 'react-redux';

export function mapStateToProps(state: AppState) {
  return {
    touch: state.gameState.touchscreenMode,
  };
}

export default connect(mapStateToProps)(Game);
