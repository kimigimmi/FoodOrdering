import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getJSON, postJSON } from "./api"; // <-- store içindeyse ./api olmalı

export type User = { id: number; email: string; name: string | null };

type AuthState = { user: User | null; loading: boolean; error?: string | null };
const initialState: AuthState = { user: null, loading: false, error: null };

export const fetchMe = createAsyncThunk<User | null>("auth/me", async (_, { rejectWithValue }) => {
  try { return await getJSON<User | null>("/api/auth/me"); }
  catch (e: any) { return rejectWithValue(e?.message || "Failed") as any; }
});

export const login = createAsyncThunk<User, { email: string; password: string }>(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try { return await postJSON<User>("/api/auth/login", payload); }
    catch (e: any) { return rejectWithValue(e?.message || "Login failed") as any; }
  }
);

export const register = createAsyncThunk<User, { name?: string; email: string; password: string }>(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try { return await postJSON<User>("/api/auth/register", payload); }
    catch (e: any) { return rejectWithValue(e?.message || "Register failed") as any; }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await postJSON("/api/auth/logout", {});
});

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchMe.pending, (s) => { s.loading = true; s.error = null; });
    b.addCase(fetchMe.fulfilled, (s, a) => { s.loading = false; s.user = a.payload || null; });
    b.addCase(fetchMe.rejected, (s, a) => { s.loading = false; s.error = (a.payload as any) || "Failed"; });

    b.addCase(login.fulfilled, (s, a) => { s.user = a.payload; });
    b.addCase(register.fulfilled, (s, a) => { s.user = a.payload; });
    b.addCase(logout.fulfilled, (s) => { s.user = null; });
  },
});

export default slice.reducer;
