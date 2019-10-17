import React from 'react';
import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

function CartIcon({ toggleCartHidden, itemsCount}) {
    return (
        <div className="cart-icon" onClick={toggleCartHidden}>
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">{itemsCount}</span>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        toggleCartHidden: () => dispatch(toggleCartHidden())
    }
}

function mapStateToProps(state) {
    return {
        itemsCount: selectCartItemsCount(state)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);