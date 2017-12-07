import { FRAMES_PER_SEC } from '../../utils/functions';
import Timer from '../../ReactView/components/GameElements/Timer';
import { GameState } from '../../utils/objectTypes';
import { connect } from 'react-redux';

export function mapStateToProps(state: GameState) {
  return {
    secondsLeft: Math.floor((state.endTime - state.currentTick) / FRAMES_PER_SEC)
  };
}

export default connect(mapStateToProps)(Timer);
