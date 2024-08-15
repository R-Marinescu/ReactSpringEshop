import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentConfirmation = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const paymentStatus = query.get('status');

    return (
        <div>
            <h1>Payment Confirmation</h1>
            {paymentStatus === 'success' ? (
                <div>
                    <h2>Thank you for your purchase!</h2>
                    <p>Your payment was successful. We are processing your order and will send you an update soon.</p>
                </div>
            ) : (
                <div>
                    <h2>Payment Failed</h2>
                    <p>There was an issue with your payment. Please try again or contact support.</p>
                </div>
            )}
        </div>
    );
};

export default PaymentConfirmation;
