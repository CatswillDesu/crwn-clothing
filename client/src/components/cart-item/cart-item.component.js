import React, { memo } from 'react';

import './cart-item.styles.scss';

function CartItem({ item:{ name, imageUrl, price, quantity } }) {
    return (
        <div className="cart-item">
            <img src={imageUrl} alt="cart item"/>
            <div className="item-details">
                <span className="name">{name}</span>
                <span className="price">{quantity} x ${price}</span>
            </div>
        </div>
    )
}

export default memo(CartItem);