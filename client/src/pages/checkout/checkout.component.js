import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeButton from '../../components/stripe-button/stripe-button.component';

import './checkout.styles.scss';

function CheckoutPage({ cartItems, total }) {

    const mappedCartItems = cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem} />)

    return (
        <div className="checkout-page">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {mappedCartItems}
            <div className="total">
                TOTAL: ${total}
            </div>
            <div className="test-warning">
                *Please use the following test credit card to accept payments*
                <br />
                4242 4242 4242 4242, exp: 01/21, CVV: 123
            </div>
            <StripeButton price={total} />
        </div>
    )
}

function mapStateToProps() {
    return createStructuredSelector({
        cartItems: selectCartItems,
        total: selectCartTotal
    })
}

export default connect(mapStateToProps)(CheckoutPage);