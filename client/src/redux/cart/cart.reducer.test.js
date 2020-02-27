import cartReducer, { INITIAL_STATE } from './cart.reducer';
import cartActionTypes from './cart.types';

describe('cart reducer cases', () => {
    it('TOGGLE_CART_HIDDEN when cart is hidden', () => {
        const prevState = {
            hidden: true,
            cartItems: []
        }

        const action = {
            type: cartActionTypes.TOGGLE_CART_HIDDEN
        }

        expect(cartReducer(prevState, action)).toEqual({
            ...prevState,
            hidden: false
        })
    })

    it('TOGGLE_CART_HIDDEN when cart isnt hidden', () => {
        const prevState = {
            hidden: false,
            cartItems: []
        }

        const action = {
            type: cartActionTypes.TOGGLE_CART_HIDDEN
        }

        expect(cartReducer(prevState, action)).toEqual({
            ...prevState,
            hidden: true
        })
    })

    it('ADD_ITEM adds NEW item to cart', () => {
        const prevState = {
            hidden: false,
            cartItems: [
                {
                    id: 'jacket',
                    price: 25,
                    quantity: 2
                }
            ]
        }

        const action = {
            type: cartActionTypes.ADD_ITEM,
            payload: {
                id: 'hat',
                price: 13
            }
        }

        expect(cartReducer(prevState, action)).toEqual({
            ...prevState,
            cartItems: [
                {
                    id: 'jacket',
                    price: 25,
                    quantity: 2
                },
                {
                    id: 'hat',
                    price: 13,
                    quantity: 1
                }
            ]
        })
    })

    it('ADD_ITEM increases quantity on existing cart item', () => {
        const prevState = {
            hidden: false,
            cartItems: [
                {
                    id: 'jacket',
                    price: 25,
                    quantity: 2
                },
                {
                    id: 'hat',
                    price: 13,
                    quantity: 1
                }
            ]
        }

        const action = {
            type: cartActionTypes.ADD_ITEM,
            payload: {
                id: 'jacket',
                price: 25
            }
        }

        expect(cartReducer(prevState, action)).toEqual({
            ...prevState,
            cartItems: [
                {
                    id: 'jacket',
                    price: 25,
                    quantity: 3
                },
                {
                    id: 'hat',
                    price: 13,
                    quantity: 1
                }
            ]
        })
    })
})

// const INITIAL_STATE = {
//     hidden: true,
//     cartItems: []
// }