import React, { useEffect, Fragment, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors'

import Header from './components/header/header.component'
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import './App.scss';

const Homepage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const SignInAndSignUp = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));

function App({ checkUserSession, currentUser }) {
  useEffect(() => {
    checkUserSession()
  }, [checkUserSession])

  return (
    <Fragment>
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner/>} >
            <Route exact path="/" component={Homepage} />
            <Route path="/shop" component={ShopPage}/>
            <Route exact path="/checkout" component={CheckoutPage}/>
            <Route exact path="/sign-in"  render={() => currentUser ? (<Redirect to="/" />) : (<SignInAndSignUp />) } />
          </Suspense>
        </ErrorBoundary>
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
