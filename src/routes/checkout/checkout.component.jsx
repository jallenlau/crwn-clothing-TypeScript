import { useSelector } from 'react-redux';

import { selectCartItems, selectTotalPrice } from '../../store/cart/cart.selector'
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import PaymentForm from '../../components/payment-form/payment-form.component'

import {
    CheckoutContainer,
    CheckoutHead,
    HeaderBlock,
    Total,
} from './checkout.styles.jsx'

const Checkout = () => {
    const cartItems = useSelector(selectCartItems);
    const totalPrice = useSelector(selectTotalPrice);

    return (
        <CheckoutContainer>
            <CheckoutHead>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHead>
                {cartItems.map((cartItem) =>
                    <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                )}
            <Total>{`Total: $${totalPrice}`}</Total>
            <PaymentForm />
        </CheckoutContainer>
    );
};

export default Checkout;