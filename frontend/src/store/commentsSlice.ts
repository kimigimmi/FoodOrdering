// frontend/src/store/commentsSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getJSON, postJSON } from "../lib/api";

/** Backend'in döndürdüğü comment modeli */
export type CommentModel = {
  id: number;
  name: string;
  text: string;
  createdAt?: string;
};

type AddCommentReq = {
  name: string;
  text: string;
};

type State = {
  data: CommentModel[];
  loading: boolean;
  error: string | null;
};

const initialState: State = {
  data: [],
  loading: false,
  error: null,
};

/** GET /api/comments */
export const fetchComments = createAsyncThunk<
  CommentModel[],
  void,
  { rejectValue: string }
>("comments/fetch", async (_: void, { rejectWithValue }) => {
  try {
    return await getJSON<CommentModel[]>("/api/comments");
  } catch (err: any) {
    return rejectWithValue(err?.message || "Failed to fetch comments");
  }
});

/** POST /api/comments  (body: { name, text }) */
export const addComment = createAsyncThunk<
  CommentModel,
  AddCommentReq,
  { rejectValue: string }
>("comments/add", async (payload, { rejectWithValue }) => {
  try {
    // DİKKAT: postJSON yalnızca tek tip argümanı (Response tipi) kabul eder.
    // Body için ikinci tip verilmez; payload'ı doğrudan geçiriyoruz.
    return await postJSON<CommentModel>("/api/comments", payload);
  } catch (err: any) {
    return rejectWithValue(err?.message || "Failed to add comment");
  }
});

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch
    builder.addCase(fetchComments.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchComments.fulfilled,
      (state, action: PayloadAction<CommentModel[]>) => {
        state.loading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch comments";
    });

    // add
    builder.addCase(addComment.pending, (state) => {
      state.error = null;
    });
    builder.addCase(
      addComment.fulfilled,
      (state, action: PayloadAction<CommentModel>) => {
        state.data.unshift(action.payload);
      }
    );
    builder.addCase(addComment.rejected, (state, action) => {
      state.error = action.payload || "Failed to add comment";
    });
  },
});

export default commentsSlice.reducer;
