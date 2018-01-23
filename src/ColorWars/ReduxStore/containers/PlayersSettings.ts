import PlayersSettings from '../../ReactView/components/Settings/PlayersSettings';
import * as actions from '../actionTypes';
import { connect, Dispatch } from 'react-redux';

import { AppState } from '../../utils/objectTypes';

export function mapStateToProps(state: AppState) {
  return {
    playersAmount: state.gameState.activePlayers
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.Action>) {
  return {
    onPlayersChange: (amount: number) =>
      dispatch(actions.setPlayersAmount(amount))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayersSettings);
