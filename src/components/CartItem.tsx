import useShoppingCart from "../context/ShoppingCartContext"
import { useProductContext } from '../context/ProductContext';
import React from "react";
import { Button, Stack } from "react-bootstrap";
import formatCurrency from "../utilities/formatCurrency";

type CartItemProps = {
    id: number
    quantity: number
}

const CartItem = ({ id, quantity }: CartItemProps) => {
    const { removeFromCart } = useShoppingCart();
    const { products, error } = useProductContext();

    if (error) {
        return <div>Error: {error}</div>;
    }

    const item = products.find(i => i.productId === id)
    if (item == null) return null

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img
                src={item.image}
                style={{ width: "125px", height: "75px", objectFit: "cover" }}
            />
            <div className="me-auto">
                {item.productName}{" "}
                {quantity > 1 && (
                    <span className="text-muted" style={{ fontSize: ".65rem" }}>
                        x{quantity}
                    </span>
                )}
                <div className="text-muted" style={{ fontSize: ".75rem" }}>
                    {formatCurrency(item.price)}
                </div>
            </div>
            <div> {formatCurrency(item.price * quantity)}</div>
            <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.productId)}>
                &times;
            </Button>
        </Stack>
    )

}

export default CartItem;