import { ActionWithPayload, createAction, withMatcher } from "../../utiles/reducer/reducer.utils";
import { CategoryItem } from "../categories/category.types";
import { CART_ACTION_TYPES, CartItem } from './cart.types';

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
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

const subCartItem = (cartItems: CartItem[], productToSub: CartItem): CartItem[] => {
    const findItem = cartItems.find((cartItem) => (cartItem.id === productToSub.id));

    if (findItem && findItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== productToSub.id)
    }
    
    return cartItems.map((cartItem) => 
        (cartItem.id === productToSub.id) ? {...productToSub, quantity: cartItem.quantity - 1} : cartItem
    )
};

export const RemoveCartItem = (cartItems: CartItem[], productToRemove: CartItem): CartItem[] => {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
};

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export const setIsCartOpen = withMatcher((bool: boolean): SetIsCartOpen => {
    return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
});

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => {
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems);
});

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return setCartItems(newCartItems);
};

export const subItemToCart = (cartItems: CartItem[], productToSub: CartItem) => {
    const newCartItems = subCartItem(cartItems, productToSub);
    return setCartItems(newCartItems);
};

export const RemoveItemFromCart = (cartItems: CartItem[], productToRemove: CartItem) => {
    const newCartItems = RemoveCartItem(cartItems, productToRemove);
    return setCartItems(newCartItems);
};