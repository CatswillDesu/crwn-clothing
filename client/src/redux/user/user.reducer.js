import userActionTypes from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    error: null
}

function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case userActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null
            }
        case userActionTypes.SIGN_IN_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case userActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null
            }
        case userActionTypes.SIGN_OUT_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case userActionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case userActionTypes.UPDATE_USER_CART_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case userActionTypes.REMOVE_ERROR:
            return {
                ...state,
                error: null
            }
        default: 
            return state;
    }
}

export default userReducer;