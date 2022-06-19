import { useSelector, useDispatch } from 'react-redux';

import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectIsCartOpen, selectCartNumber } from '../../store/cart/cart.selector'

import {
    ItemCount,
    CartIconContainer,
    ShoppingIcon
} from './cart-icon.styles.jsx'

const CartIcon = () => {
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartNumber = useSelector(selectCartNumber);

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));   

    return (
        <CartIconContainer onClick={ toggleIsCartOpen }>
            <ShoppingIcon className='shopping-icon' />
            <ItemCount>{ cartNumber }</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;