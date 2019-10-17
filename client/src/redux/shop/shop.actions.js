import shopActionTypes from './shop.types';

export function fetchCollectionsStart() {
    return {
        type: shopActionTypes.FETCH_COLLECTIONS_START
    }
}

export function fetchCollectionsSuccess(collections) {
    return {
        type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
        payload: collections
    }
}

export function fetchCollectionsFailure(errorMessage) {
    return {
        type: shopActionTypes.FETCH_COLLECTIONS_FAILURE,
        payload: errorMessage
    }
}