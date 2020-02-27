import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { updateUserCartStart } from '../../redux/user/user.actions';
import { selectCartHidden, selectCartItems } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import './cart-dropdown.styles.scss';

function CartDropdown({ hidden, cartItems, history, currentUser, updateUserCartStart, toggleCartHidden }) {

    useEffect(() => {
        updateUserCartStart(currentUser, cartItems);
    }, [cartItems, currentUser])

    const cartDropdownStyles = {
        display: hidden ? 'none' : 'flex'
    }

    const mappedCartItems = cartItems.map((item => {
        return ( <CartItem key={item.id} item={item}  /> )
    }))

    return (
        <div className="cart-dropdown" style={cartDropdownStyles}>
            <div className="cart-items">{
                cartItems.length ? 
                mappedCartItems
                : 
                <span className="empty-message">Your cart is empty</span>
            }</div>
            <CustomButton onClick={() => {
                history.push('/checkout');
                toggleCartHidden();
            }}>Go to checkout</CustomButton>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        updateUserCartStart: (user, cartItems) => dispatch(updateUserCartStart(user, cartItems)) ,
        toggleCartHidden: () => dispatch(toggleCartHidden())
    }
}

function mapStateToProps() {
    return (
        createStructuredSelector({
            hidden: selectCartHidden,
            cartItems: selectCartItems,
            currentUser: selectCurrentUser
        })
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartDropdown));