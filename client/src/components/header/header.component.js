import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { signOutStart } from '../../redux/user/user.actions';
import { clearCartItems } from '../../redux/cart/cart.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import './header.styles.scss';
 
function Header({ currentUser, signOutStart, clearCartItems }) {
    return(
        <header className="header">
            <Link className="logo-container" to="/">
                <Logo className="logo" />
            </Link>
            <div className="options">
                <Link className="option" to="/shop">SHOP</Link>
                <Link className="option" to="/contact">CONTACT</Link>
                {
                    currentUser ? 
                    <div className="option" onClick={() => {signOutStart(); clearCartItems()}}>SIGN OUT</div>
                    :
                    <Link className="option" to="/sign-in">SIGN IN</Link>
                }
                <CartIcon/>
            </div>
            <CartDropdown/>
        </header>
    )
}

function mapStateToProps(state) {
    return {
        currentUser: selectCurrentUser(state)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        signOutStart: () => dispatch(signOutStart()),
        clearCartItems: () => dispatch(clearCartItems())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
