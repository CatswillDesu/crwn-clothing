import React, { useEffect, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors'

import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component'

import './App.css';

function App({ checkUserSession, currentUser }) {
  useEffect(() => {
    checkUserSession()
  }, [checkUserSession])

  return (
    <Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/shop" component={ShopPage}/>
        <Route exact path="/checkout" component={CheckoutPage}/>
        <Route exact path="/sign-in"  render={() => currentUser ? (<Redirect to="/" />) : (<SignInAndSignUp />) } />
      </Switch>
    </Fragment>
  )
}

function mapStateToProps(state) {
  return {
    currentUser: selectCurrentUser(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    checkUserSession: () => dispatch(checkUserSession())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
