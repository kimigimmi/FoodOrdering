import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Item } from '../types';

type CartItem = Item & { quantity: number; totalPriceOfItem: number };
type State = { items: CartItem[] };

const load = (): State => {
  try {
    const raw = localStorage.getItem('cart:v1');
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw) as State;
    if (!Array.isArray(parsed.items)) return { items: [] };
    return parsed;
  } catch { return { items: [] }; }
};

const initial: State = load();

const slice = createSlice({
  name: 'cart',
  initialState: initial,
  reducers: {
    addToCart: (s, a: PayloadAction<Item>) => {
      const ex = s.items.find(i => i.id === a.payload.id);
      if (ex) return;
      s.items.push({
        ...a.payload,
        quantity: 1,
        totalPriceOfItem: Number((a.payload.price * 1).toFixed(2))
      });
    },
    removeFromCart: (s, a: PayloadAction<number>) => {
      s.items = s.items.filter(i => i.id !== a.payload);
    },
    updateQuantity: (s, a: PayloadAction<{ id: number; qty: number }>) => {
      const it = s.items.find(i => i.id === a.payload.id);
      if (!it) return;
      it.quantity = a.payload.qty;
      it.totalPriceOfItem = Number((it.price * a.payload.qty).toFixed(2));
    },
    clearCart: (s) => { s.items = []; }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = slice.actions;
export default slice.reducer;
