import { useSelector, useDispatch } from 'react-redux';
import { FC, memo } from 'react';
import { TCartItem } from '../../store/cart/cart.types';

import { selectCartItems } from '../../store/cart/cart.selector';
import { subItemToCart, addItemToCart, RemoveItemFromCart } from '../../store/cart/cart.action'

import {
    CheckoutItemContainer,
    ImageContainer,
    BaseSpan,
    Quantity,
    Arrow,
    Value,
    RemoveButton,
} from './checkout-item.styles'

type CartItemProps = {
    cartItem: TCartItem;
}

const CheckoutItem: FC<CartItemProps> = memo(({ cartItem }) => {
    const dispatch = useDispatch();
    const { name, imageUrl, quantity, price } = cartItem;
    const cartItems = useSelector(selectCartItems);

    const addItem = () => dispatch(addItemToCart(cartItems, cartItem));
    const subItem = () => dispatch(subItemToCart(cartItems, cartItem));
    const removeItem = () => dispatch(RemoveItemFromCart(cartItems, cartItem));

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={ imageUrl } alt={ name } />
            </ImageContainer>
            <BaseSpan>{ name }</BaseSpan>
            <Quantity>
                <Arrow onClick={ subItem }>&#10094;</Arrow>
                <Value>{ quantity }</Value>
                <Arrow onClick={ addItem }>&#10095;</Arrow>
            </Quantity>
            <BaseSpan>{ price }</BaseSpan>
            <RemoveButton onClick={ removeItem }>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    );
});

export default CheckoutItem;