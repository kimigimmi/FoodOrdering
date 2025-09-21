import { useAppDispatch } from "../store/hooks";
import { addToCart } from "../store/cartSlice";
import type { Item } from "../types";

export const MenuItem = ({ menuItem }: { menuItem: Item }) => {
  const dispatch = useAppDispatch();
  return (
    <div className="menu-item">
      <img src={menuItem.image} alt={menuItem.name} />
      <h3>{menuItem.name}</h3>
      <p>{menuItem.description}</p>
      <p className="price">${menuItem.price.toFixed(2)} {menuItem.category && <span style={{fontSize:12,opacity:.7}}> · {menuItem.category}</span>}</p>
      <button onClick={() => dispatch(addToCart(menuItem))}>Add to cart</button>
    </div>
  );
};
