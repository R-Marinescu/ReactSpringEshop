import { Button, Offcanvas, Stack } from "react-bootstrap";
import React from "react";
import useShoppingCart, { ShoppingCartProvider } from "../context/ShoppingCartContext";
import CartItem from './CartItem';
import formatCurrency from "../utilities/formatCurrency";
import { useProductContext } from '../context/ProductContext';
import { useUserContext } from "../context/UserContext";
import axios from "axios";

type ShoppingCartProps = {
    isOpen: boolean
}

const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
    const { closeCart, clearCart, cartItems } = useShoppingCart();
    const { products, error } = useProductContext();
    const { user, isAdmin } = useUserContext();

    const handleCheckout = async () => {
        const orderItems = cartItems.map(cartItem => {
            const product = products.find(p => p.productId === cartItem.id);
            return {
                productDTO: {  
                    productId: cartItem.id,
                },
                quantity: cartItem.quantity,
                price: product ? product.price : 0
            };
        });

        const totalPrice = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

        const orderPayload = {
            userId: user?.userId,
            totalPrice: totalPrice,
            orderItems: orderItems,
        };

        try {
            const response = await axios.post('http://localhost:8080/api/orders/create', orderPayload, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 201) {
                alert('Order placed successfully!');
                clearCart();
                closeCart();
            }
        } catch (error) {
            console.error('Error placing order', error);
            alert('Failed to place order')

        }
    }

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
                    <div className="ms-auto fw-bold fs-f">
                        Total {formatCurrency(cartItems.reduce((total, cartItem) => {
                            const item = products.find(i => i.productId === cartItem.id)
                            return total + (item?.price || 0) * cartItem.quantity
                        }, 0)
                        )}
                    </div>
                    <Button variant="success" onClick={handleCheckout}>
                        Checkout
                    </Button>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default ShoppingCart;