import cartActionTypes from './cart.types';

export function toggleCartHidden() {
    return {
        type: cartActionTypes.TOGGLE_CART_HIDDEN
    }
}

export function addItem(item) {
    return {
        type: cartActionTypes.ADD_ITEM,
        payload: item
    }
}

export function removeItem(item) {
    return {
        type: cartActionTypes.REMOVE_ITEM,
        payload: item
    }
}

export function clearItemFromCart(item) {
    return {
        type: cartActionTypes.CLEAR_ITEM_FROM_CART,
        payload: item
    }
}

export function clearCartItems() {
    return {
        type: cartActionTypes.CLEAR_CART_ITEMS
    }
}
