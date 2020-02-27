import React, { useEffect, lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import Spinner from '../../components/spinner/spinner.component';

const CollectionPage = lazy(() => import('../collection/collection.container'));
const CollectionOvereview = lazy(() => import('../../components/collection-overview/collection-overview.container'));

function ShopPage({ fetchCollectionsStart, match }) {
    useEffect(() => {
        fetchCollectionsStart()
    }, [fetchCollectionsStart])

    return (     
        <div className="shop-page">
            <Suspense fallback={Spinner}>
                <Route exact path={`${match.path}`} component={CollectionOvereview} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
            </Suspense>
        </div>
    )
}

function mapDispacthToProps(dispatch) {
    return {
        fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
    }
}

export default connect(null, mapDispacthToProps)(ShopPage); 