import React from 'react';
import { connect } from 'react-redux';

import { selectShopCollection } from '../../redux/shop/shop.selectors';

import CollectionItem from '../../components/collection-item/collection-item.component';

import './collection.styles.scss';

function CollectionPage({ collection }) {
    const { title, items } = collection;

    const mappedCollectionItems = items.map(collectionItem => <CollectionItem key={collectionItem.id} item={collectionItem} />)

    return (
        <div className="collection-page">
            <h1 className="title">{title}</h1>
            <div className="items">
                {mappedCollectionItems}
            </div>
        </div>
    )
}

function mapStateToProps(state, ownProps) {
    return {
        collection: selectShopCollection(ownProps.match.params.collectionId)(state)
    }
}

export default connect(mapStateToProps)(CollectionPage);