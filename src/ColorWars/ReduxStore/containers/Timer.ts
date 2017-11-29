import Timer from '../../ReactView/components/GameElements/Timer';
import { GameState } from '../../utils/objectTypes';
import { connect } from 'react-redux';

export function mapStateToProps(state: GameState) {
  return {
    secondsLeft: Math.floor((state.endTime - state.currentTick) / 40)
  };
}

export default connect(mapStateToProps)(Timer);
