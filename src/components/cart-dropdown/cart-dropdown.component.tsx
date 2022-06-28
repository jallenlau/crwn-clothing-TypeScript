import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../store/cart/cart.selector'

import { CartItems, CartDropdownContainer, EmptyMessage } from './cart-dropdown.styles'

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    };

    return (
        <CartDropdownContainer>
            { cartItems.length ?
                <CartItems>
                    {cartItems.map((item) => <CartItem key={item.id} cartItem={item}/>)}
                </CartItems> :
                <EmptyMessage>Your cart is empty</EmptyMessage>
            }
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>

        </CartDropdownContainer>
    );
};

export default CartDropdown;