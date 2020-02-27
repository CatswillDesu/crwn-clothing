import React from 'react';
import { connect } from 'react-redux';

import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.actions';
import { selectCartItems } from '../../redux/cart/cart.selectors';

import './checkout-item.styles.scss';

function CheckoutItem({ cartItem, cartItem:{ name, imageUrl, quantity, price }, clearItem, addItem, removeItem }) {
    return (
        <div className="checkout-item">
            <div className="image-container">
                <img src={imageUrl} alt='cart item'/>
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick={() => removeItem(cartItem)}>&#10094;</div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={() => addItem(cartItem)}>&#10095;</div>
            </span>
            <span className="price">${price}</span>
            <div className="remove-button" onClick={() => clearItem(cartItem)} >&#10005;</div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        cartItems: selectCartItems(state)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clearItem: item => dispatch(clearItemFromCart(item)),
        addItem: item => dispatch(addItem(item)),
        removeItem: item => dispatch(removeItem(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutItem);