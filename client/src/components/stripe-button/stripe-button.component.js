import React from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

import { clearCartItems } from '../../redux/cart/cart.actions';

function StripeButton({ price, clearCartItems }) {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_P9xgasT8k9xISN4ksC0P2ZKV00mHDwTHT1';

    async function onToken(token) {
        try {
            await axios({
                url: 'payment',
                method: 'post',
                data: {
                    amount: priceForStripe,
                    token
                }
            })

            clearCartItems();
            alert('Payment was successful');
        } catch (error) {
            console.log('Payment failed', error);
            alert('Payment couldn\'t success. Please make sure you using provided credit card');
        }
    }

    return (
        <StripeCheckout
            label="Pay Now"
            name="JMIH Airlines"
            billingAddress
            shippingAddress
            iamge='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total price is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

function mapDispatchToProps(dispatch) {
    return {
        clearCartItems: () => dispatch(clearCartItems())
    }
}

export default connect(null, mapDispatchToProps)(StripeButton);