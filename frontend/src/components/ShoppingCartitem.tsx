import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { removeFromCart, updateQuantity } from "../store/cartSlice";
import type { Item } from "../types";

export const ShoppingCartitem = ({
  menuItem
}: {
  menuItem: Item & { quantity?: number; totalPriceOfItem?: number };
}) => {
  const dispatch = useAppDispatch();
  const [q, setQ] = useState(menuItem.quantity ?? 1);

  const inc = () => { const nq = q + 1; setQ(nq); dispatch(updateQuantity({ id: menuItem.id, qty: nq })); };
  const dec = () => { if (q > 1) { const nq = q - 1; setQ(nq); dispatch(updateQuantity({ id: menuItem.id, qty: nq })); } };

  return (
    <div className="cartContainer">
      <div className="cartItem">
        <div className="menu-item">
          <img src={menuItem.image} alt={menuItem.name} />
          <h3>{menuItem.name}</h3>
          <p>{menuItem.description}</p>
          <p className="price">${menuItem.price.toFixed(2)}</p>
        </div>

        <div className="quantity">
          <button className="quantity-btn" onClick={dec}>-</button>
          <span>{q}</span>
          <button className="quantity-btn" onClick={inc}>+</button>
        </div>

        <div className="total-price-same-item">
          <p>Total: {(menuItem.totalPriceOfItem ?? (menuItem.price * q)).toFixed(2)}</p>
        </div>

        <div className="remove-item">
          <button className="remove-btn" onClick={() => dispatch(removeFromCart(menuItem.id))}>Remove</button>
        </div>
      </div>
    </div>
  );
};
