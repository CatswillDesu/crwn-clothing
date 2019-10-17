import { connect } from 'react-redux';
import { compose } from 'redux';

import CollectionOverview from './collection-overview.component';
import WithSpinner from '../with-spinner/with-spinner.component';
import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

function mapStateToProps(state) {
    return {
        isLoading: !selectIsCollectionsLoaded(state)
    }
}

const CollectionOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionOverview)

export default CollectionOverviewContainer;
