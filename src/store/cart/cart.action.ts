import { ActionWithPayload, createAction, withMatcher } from "../../utiles/reducer/reducer.utils";
import { CategoryItem } from "../categories/category.types";
import { CART_ACTION_TYPES, TCartItem } from './cart.types';

const addCartItem = (cartItems: TCartItem[], productToAdd: CategoryItem): TCartItem[] => {
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

const subCartItem = (cartItems: TCartItem[], productToSub: TCartItem): TCartItem[] => {
    const findItem = cartItems.find((cartItem) => (cartItem.id === productToSub.id));

    if (findItem && findItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== productToSub.id)
    }
    
    return cartItems.map((cartItem) => 
        (cartItem.id === productToSub.id) ? {...productToSub, quantity: cartItem.quantity - 1} : cartItem
    )
};

export const RemoveCartItem = (cartItems: TCartItem[], productToRemove: TCartItem): TCartItem[] => {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
};

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, TCartItem[]>;

export const setIsCartOpen = withMatcher((bool: boolean): SetIsCartOpen => {
    return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
});

export const setCartItems = withMatcher((cartItems: TCartItem[]): SetCartItems => {
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems);
});

export const addItemToCart = (cartItems: TCartItem[], productToAdd: CategoryItem) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return setCartItems(newCartItems);
};

export const subItemToCart = (cartItems: TCartItem[], productToSub: TCartItem) => {
    const newCartItems = subCartItem(cartItems, productToSub);
    return setCartItems(newCartItems);
};

export const RemoveItemFromCart = (cartItems: TCartItem[], productToRemove: TCartItem) => {
    const newCartItems = RemoveCartItem(cartItems, productToRemove);
    return setCartItems(newCartItems);
};