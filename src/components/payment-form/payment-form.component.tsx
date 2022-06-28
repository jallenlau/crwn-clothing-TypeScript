import { useState, FormEvent, ChangeEvent } from "react";
import { useSelector } from "react-redux";

import { selectTotalPrice } from '../../store/cart/cart.selector'
import { selectCurrentUser } from '../../store/user/user.selector'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { FormContainer, PaymentFormContainer, PaymentButton } from './payment-form.styles'

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectTotalPrice);
    const currentUser = useSelector(selectCurrentUser);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) { return; }
        
        setIsProcessingPayment(true);

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: amount * 100 }),
        }).then((res) => {
            return res.json();
        });

        const client_secret = response.paymentIntent.client_secret;

        const cardElement = elements.getElement(CardElement);

        if (cardElement === null) return;

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'Guest',
                },
            },
        });

        setIsProcessingPayment(false);

        if (paymentResult.error) {
            alert(paymentResult.error);
        } else {
            if (paymentResult.paymentIntent.status === 'succeeded') {
                alert('Payment Successful');
            };
        }
    };

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement />
                <PaymentButton
                    isLoading={isProcessingPayment}
                    buttonType={BUTTON_TYPE_CLASSES.inverted}
                >Pay now</PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    )
};

export default PaymentForm;