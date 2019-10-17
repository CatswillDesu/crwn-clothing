import React from 'react';
import { connect } from 'react-redux';

import { selectShopCollectionsForPreview } from '../../redux/shop/shop.selectors'

import CollectionPreview from '../collection-preview/collection-preview.component';

import './collection-overview.styles.scss';

function CollectionOverview({ collections }) {
    const mappedCollectionPreviews = collections.map(({id, ...otherCollectionProps}) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
    ))

    return (
        <div className="collection-overview">
            {mappedCollectionPreviews}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        collections: selectShopCollectionsForPreview(state)
    }
}

export default connect(mapStateToProps)(CollectionOverview);