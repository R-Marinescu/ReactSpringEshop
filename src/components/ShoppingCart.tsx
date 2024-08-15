import React from 'react';
import { Button, Offcanvas, Stack } from 'react-bootstrap';
import useShoppingCart from '../context/ShoppingCartContext';
import CartItem from './CartItem';
import formatCurrency from '../utilities/formatCurrency';
import { useProductContext } from '../context/ProductContext';
import { useUserContext } from '../context/UserContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51Pn2KwP8hiwFxYIvjsV1g3Neza1Ptv6uBGOpw5RtA1T0A86QB4WJvk58iZcaWilVEZNuQ8NM1MnhlMD2s88qvlwq00PxJzmjJJ');

type ShoppingCartProps = {
    isOpen: boolean;
};

const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
    const { closeCart, clearCart, cartItems } = useShoppingCart();
    const { products } = useProductContext();
    const { user } = useUserContext();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    

    const handleCheckout = async () => {
        const orderItems = cartItems.map(cartItem => {
            const product = products.find(p => p.productId === cartItem.id);
            return {
                productDTO: { productId: cartItem.id },
                quantity: cartItem.quantity,
                price: product ? product.price : 0,
            };
        });

        const totalPrice = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

        try {
            const { data } = await axios.post('http://localhost:8080/api/payments/create-payment-intent', { amount: totalPrice });
            console.log("Payment Intent Response:", data);

            const clientSecret = data.clientSecret;

            if (!stripe || !elements) {
                console.error('Stripe.js has not yet loaded.');
                return;
            }

            const cardElement = elements.getElement(CardElement);
            if (!cardElement) {
                console.error('CardElement not found.');
                return;
            }

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement!,
                    billing_details: {
                        name: user?.username || 'Anonymous',
                    },
                },
            });

            if (error) {
                console.error('Payment error:', error);
                alert('Payment failed');
            } else if (paymentIntent && paymentIntent.status === 'succeeded') {
                clearCart();
                closeCart();
                navigate(`/payment-confirmation?status=success`);
                
            }
        } catch (error) {
            console.error('Checkout error', error);
            alert('Failed to process payment');
        }
    };

    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map(item => (
                        <CartItem key={item.id} {...item} />
                    ))}
                    <div className="ms-auto fw-bold fs-5">
                        Total {formatCurrency(cartItems.reduce((total, cartItem) => {
                            const item = products.find(i => i.productId === cartItem.id);
                            return total + (item?.price || 0) * cartItem.quantity;
                        }, 0))}
                    </div>
                    <CardElement />
                    <Button variant="success" onClick={handleCheckout}>
                        Checkout
                    </Button>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default function ShoppingCartWrapper({ isOpen }: ShoppingCartProps) {
    return (
        <Elements stripe={stripePromise}>
            <ShoppingCart isOpen={isOpen} />
        </Elements>
    );
}
