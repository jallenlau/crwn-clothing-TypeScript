import { createContext, useEffect, useState, useReducer } from "react";
import { createAction } from '../utiles/reducer/reducer.utils'

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

const RemoveCartItem = (cartItems, productToRemove) => {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
}

//若以此方式添加计数器会导致每次采用上次cartItem遍历计算
// const sumNumer = (cartItems) => {
//     const num = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
//     return num;
// };


export const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_CART_NUMBER: 'SET_CART_NUMBER',
    SET_TOTAL_PRICE: 'SET_TOTAL_PRICE',
};

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartNumber: 0,
    totalPrice: 0,
};

const cartReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'SET_CART_ITEMS':
            return {
                ...state,
                ...payload,
            };
        case 'SET_IS_CART_OPEN':
            return {
                ...state,
                isCartOpen: payload,
            };
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    };
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    addItemToCart: () => { },
    subItemToCart: () => { },
    RemoveItemFromCart: () => { },
    cartItems: [],
    cartNumber: 0,
    totalPrice: 0,
});

export const CartProvider = ({ children }) => {
    //const [isCartOpen, setIsCartOpen] = useState(false);
    const [{cartItems, isCartOpen, cartNumber, totalPrice }, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    
    const updateCartItemsReducer = (newCartItems) => {
        const newCartNumber = newCartItems.reduce((total, cartItem) =>
            total + cartItem.quantity, 0);
        const newTotalPrice = newCartItems.reduce((total, cartItem) =>
            total + cartItem.quantity * cartItem.price, 0);

        // const payload = {
        //     cartItems,
        //     cartNumber: newCartNumber,
        //     totalPrice: newTotalPrice,
        // };

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
            cartItems: newCartItems,
            cartNumber: newCartNumber,
            totalPrice: newTotalPrice,
        }));
    };

    const setIsCartOpen = (bool) => {
        dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool })
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const subItemToCart = (productToSub) => {
        const newCartItems = subCartItem(cartItems, productToSub);
        updateCartItemsReducer(newCartItems);
    }

    const RemoveItemFromCart = (productToRemove) => {
        const newCartItems = RemoveCartItem(cartItems, productToRemove);
        updateCartItemsReducer(newCartItems);
    }
   
    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        cartNumber,
        subItemToCart,
        totalPrice,
        RemoveItemFromCart
    };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};