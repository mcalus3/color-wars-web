import ScoreBoard from '../../ReactView/components/ScoreBoard';
import { GameState } from '../../utils/objectTypes';
import { connect } from 'react-redux';

export function mapStateToProps(state: GameState) {
    return {
        fieldColors: state.fieldColors,
        dimension: state.dimension
    };
};

export default connect(mapStateToProps)(ScoreBoard);