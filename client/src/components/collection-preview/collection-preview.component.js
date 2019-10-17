import React from 'react';

import './collection-preview.styles.scss';
import CollectionItem from '../collection-item/collection-item.component';

function CollectionPrivew({ title, items }) {
    const collectionItems = items.filter((item, index) => index < 4).map((item) => (
        <CollectionItem key={item.id} item={item} />
    ))

    return(
        <div className="collection-preview">
            <h1 className="title">{title.toUpperCase()}</h1>
            <div className="preview">
                {collectionItems}
            </div>
        </div>
    )
}

export default CollectionPrivew;