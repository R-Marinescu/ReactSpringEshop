import { Offcanvas, Stack } from "react-bootstrap";
import React from "react";
import useShoppingCart, { ShoppingCartProvider } from "../context/ShoppingCartContext";
import CartItem from './CartItem';
import { ProductProvider } from "../context/ProductContext";
import formatCurrency from "../utilities/formatCurrency";
import { useProductContext } from '../context/ProductContext';

type ShoppingCartProps = {
    isOpen: boolean
}

const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
    const { closeCart, cartItems } = useShoppingCart();
    const { products, error } = useProductContext();
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
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default ShoppingCart;