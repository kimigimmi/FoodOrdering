import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { Item } from "../types";

type Sort = "newest" | "price_asc" | "price_desc" | "rating_desc";

export type ItemsParams = {
  q?: string;
  category?: string;
  sort?: Sort;
  page?: number;
  limit?: number;
};

type State = {
  data: Item[];
  total: number;
  loading: boolean;
  error?: string;
  params: ItemsParams;
};

const API = process.env.REACT_APP_API_URL || "http://localhost:8080";

export const fetchItems = createAsyncThunk<
  { items: Item[]; total: number },
  void,
  { state: { items: State } }
>("items/fetch", async (_, { getState, rejectWithValue }) => {
  const { params } = getState().items;
  const searchParams = new URLSearchParams();

  if (params.q) searchParams.set("q", params.q);
  if (params.category) searchParams.set("category", params.category);
  if (params.sort) searchParams.set("sort", params.sort);
  searchParams.set("page", String(params.page ?? 1));
  searchParams.set("limit", String(params.limit ?? 12));

  try {
    const { data } = await axios.get(`${API}/api/items?${searchParams.toString()}`);
    return { items: data.items as Item[], total: data.total as number };
  } catch (e: any) {
    const msg = e?.response?.data?.error || e.message || "Request failed";
    return rejectWithValue(msg);
  }
});

const initialState: State = {
  data: [],
  total: 0,
  loading: false,
  error: undefined,
  params: { sort: "newest", page: 1, limit: 12 },
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setParams: (s, a: PayloadAction<Partial<ItemsParams>>) => {
      s.params = { ...s.params, ...a.payload };
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchItems.pending, (s) => {
      s.loading = true;
      s.error = undefined;
    });
    b.addCase(fetchItems.fulfilled, (s, a) => {
      s.loading = false;
      s.data = a.payload.items;
      s.total = a.payload.total;
    });
    b.addCase(fetchItems.rejected, (s, a) => {
      s.loading = false;
      s.error = String(a.payload || a.error.message || "Request failed");
    });
  },
});

export const { setParams } = itemsSlice.actions;
export default itemsSlice.reducer;
