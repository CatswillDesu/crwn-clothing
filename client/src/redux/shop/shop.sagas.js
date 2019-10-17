import { takeEvery, put, all } from 'redux-saga/effects';

import shopActionTypes from './shop.types';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';
import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';

function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection('collections');
        const collectionsSnapshot = yield collectionRef.get();
        const collections = yield convertCollectionSnapshotToMap(collectionsSnapshot);
        yield put(fetchCollectionsSuccess(collections))
    } catch(err) {
        yield put(fetchCollectionsFailure(err.message))
    }
}

function* fetchCollectionsWatch() {
    yield takeEvery(
        shopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    )
}

export default function* shopRootSaga() {
    yield all([
        fetchCollectionsWatch()
    ])
}