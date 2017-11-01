import Fields from '../../ReactView/components/Fields';
import { GameState } from '../../utils/objectTypes';
import { connect } from 'react-redux';

export function mapStateToProps(state: GameState) {
    return {
        fields: state.fieldColors,
        lastUpdatedCoords: state.lastUpdatedCoords,
        dimension: state.dimension
    };
};

export default connect(mapStateToProps)(Fields);