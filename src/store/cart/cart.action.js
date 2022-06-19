import { createAction } from "../../utiles/reducer/reducer.utils";
import { CART_ACTION_TYPES } from './cart.types';

const addCartItem = (cartItems, productToAdd) => {
    const findItem = cartItems.find((cartItem) => (cartItem.id === productToAdd.id));
    if (findItem) {
        return cartItems.map((cartItem) =>
            (cartItem.id === productToAdd.id) ?
                { ...cartItem, quantity: cartItem.quantity + 1 } :
                cartItem
        );
    };
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const subCartItem = (cartItems, productToSub) => {
    const findItem = cartItems.find((cartItem) => (cartItem.id === productToSub.id));
    if (findItem) {
        return cartItems.map((cartItem) =>
            (cartItem.id === productToSub.id) ?
                (cartItem.quantity > 1) ?
                    { ...productToSub, quantity: cartItem.quantity - 1 } :
                    delete cartItems[cartItem.index] :
                    cartItem
        ).filter((cartItem) =>  cartItem.quantity > 0 );
    };
};

export const RemoveCartItem = (cartItems, productToRemove) => {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
};

export const setIsCartOpen = (bool) => {
    return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
};

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const subItemToCart = (cartItems, productToSub) => {
    const newCartItems = subCartItem(cartItems, productToSub);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const RemoveItemFromCart = (cartItems, productToRemove) => {
    const newCartItems = RemoveCartItem(cartItems, productToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};