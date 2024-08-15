import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import ShoppingCart from './ShoppingCart';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Pn2KwP8hiwFxYIvjsV1g3Neza1Ptv6uBGOpw5RtA1T0A86QB4WJvk58iZcaWilVEZNuQ8NM1MnhlMD2s88qvlwq00PxJzmjJJ');

const ShoppingCartWrapper = ({ isOpen }) => (
  <Elements stripe={stripePromise}>
    <ShoppingCart isOpen={isOpen} />
  </Elements>
);

export default ShoppingCartWrapper;
