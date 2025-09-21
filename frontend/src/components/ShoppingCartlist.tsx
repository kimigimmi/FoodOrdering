import { useAppSelector } from "../store/hooks";
import { ShoppingCartitem } from "./ShoppingCartitem";
import "../styles/ShoppingCart.css";

export const ShoppingCartlist = () => {
  const items = useAppSelector(s => s.cart.items);
  const total = items.reduce((a, i) => a + (i.totalPriceOfItem ?? 0), 0).toFixed(2);

  return (
    <div className="cartContainer">
      {items.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {items.map(m => <ShoppingCartitem key={m.id} menuItem={m} />)}
          <div className="cart-total"><h2>Total Price: ${total}</h2></div>
        </>
      )}
    </div>
  );
};
