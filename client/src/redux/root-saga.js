import { all }  from 'redux-saga/effects'

import shopRootSaga from './shop/shop.sagas';
import userRootSaga from './user/user.sagas';

export default function* rootSaga() {
    yield all([
        shopRootSaga(),
        userRootSaga()
    ])
}