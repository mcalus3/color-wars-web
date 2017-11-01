import Tails from '../../ReactView/components/Tails';
import { GameState } from '../../utils/objectTypes';
import { connect } from 'react-redux';

export function mapStateToProps(state: GameState) {
    return {
        tails: state.tailsByName,
        players: state.playersByName,
        playerNames: state.playerNames,
        activePlayers: state.activePlayers,
        dimension: state.dimension
      
    }
}

export default connect(mapStateToProps)(Tails);