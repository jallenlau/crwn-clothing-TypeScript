import { FC, memo } from 'react';
import { TCartItem } from '../../store/cart/cart.types';
import {
    CartItemContainer,
    ItemDetails,
    Name
} from './cart-item.styles'

type CartItemProps = {
    cartItem: TCartItem;
}

const CartItem: FC<CartItemProps> = memo(({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`} />
            <ItemDetails>
            <Name>{ name }</Name>
            <span className='price'>{ quantity }×${ price }</span>
            </ItemDetails>
        </CartItemContainer>
    )
})

export default CartItem;