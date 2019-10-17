import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import CollectionOvereviewContainer from '../../components/collection-overview/collection.overview.container';
import CollectionPageContainer from '../collection/collection.container';

function ShopPage({ fetchCollectionsStart, match }) {
    useEffect(() => {
        fetchCollectionsStart()
    }, [fetchCollectionsStart])

    return (     
        <div className="shop-page">
            <Route exact path={`${match.path}`} component={CollectionOvereviewContainer} />
            <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
        </div>
    )
}

function mapDispacthToProps(dispatch) {
    return {
        fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
    }
}

export default connect(null, mapDispacthToProps)(ShopPage); 