import PlayersSettings from '../../ReactView/components/Settings/PlayersSettings';
import * as actions from '../actionTypes';
import { connect, Dispatch } from 'react-redux';

import { GameState } from '../../utils/objectTypes';

export function mapStateToProps(state: GameState) {
  return {
      playerNames: state.playerNames,
      playersAmount: state.activePlayers
    }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.action>) {
    return {
      onPlayersChange: (amount: number) => dispatch(actions.setPlayersAmount(amount))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(PlayersSettings);