import React, { useContext } from "react";
import hungryContext from "../Context/hungryContext";
import { ShoppingCartitem } from "./ShoppingCartitem.js";
import "../styles/ShoppingCart.css";

export const ShoppingCartlist = () => {
    const { items } = useContext(hungryContext);

    const calculateTotalPrice = () => {
        return items.reduce((acc, item) => acc + (item.totalPriceOfItem || 0), 0).toFixed(2);
    };

    return (
        <div className="cartContainer">
            {items.length === 0 ? (
                <p>No items in cart</p>
            ) : (
                <>
                    {items.map((menuItem) => (
                        <ShoppingCartitem key={menuItem.id} menuItem={menuItem} />
                    ))}
                    <div className="cart-total">
                        <h2>Total Price: ${calculateTotalPrice()}</h2>
                    </div>
                </>
            )}
        </div>
    );
};
