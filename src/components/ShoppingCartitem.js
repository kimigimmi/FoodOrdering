import { useState } from "react";
import { useContext } from "react";
import hungryContext from "../Context/hungryContext";

export const ShoppingCartitem = ({ menuItem }) => {
    const { updateItemQuantity, removeItem } = useContext(hungryContext);
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        updateItemQuantity(menuItem.id, newQuantity);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            updateItemQuantity(menuItem.id, newQuantity);
        }
    };

    return (
        <div className="cartContainer">
            <div className="cartItem">
                <div className="menu-item">
                    <img src={`${menuItem.image}`} alt={menuItem.name} />
                    <h3>{menuItem.name}</h3>
                    <p>{menuItem.description}</p>
                    <p className="price">${menuItem.price.toFixed(2)}</p>
                </div>

                <div className="quantity">
                    <button className="quantity-btn" onClick={decreaseQuantity}>
                        -
                    </button>
                    <span>{quantity}</span>
                    <button className="quantity-btn" onClick={increaseQuantity}>
                        +
                    </button>
                </div>

                <div className="total-price-same-item">
                    <p>Total: ${menuItem.totalPriceOfItem || (menuItem.price * quantity).toFixed(2)}</p>
                </div>

                <div className="remove-item">
                    <button className="remove-btn" onClick={() => removeItem(menuItem.id)}>
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};
