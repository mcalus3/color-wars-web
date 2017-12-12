import Game from '../../Game';
import { GameState } from '../../utils/objectTypes';
import { connect } from 'react-redux';

export function mapStateToProps(state: GameState) {
  return {
    touch: state.touchscreenMode,
  };
}

export default connect(mapStateToProps)(Game);
