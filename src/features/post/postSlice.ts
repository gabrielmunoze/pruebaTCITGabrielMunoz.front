import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Post {
  id: number;
  nombre: string;
  descripcion: string;
}

interface RootState {
  ArrayPostsState: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: RootState = { 
  ArrayPostsState: [],
  loading: false,
  error: null
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      //state.ArrayPostsState.push(action.payload);
      console.log(state, action)
    },
    addPostSuccess: (state, action: PayloadAction<Post>) => {
      state.ArrayPostsState.push(action.payload);
    },
    removePost: (state, action: PayloadAction<number>) => {
      state.ArrayPostsState = state.ArrayPostsState.filter(post => post.id !== action.payload);
    },
    fetchPostsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess: (state, action: PayloadAction<Post[]>) => {
      state.loading = false;
      state.ArrayPostsState = action.payload;
    },
    fetchPostsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const { addPost, removePost, fetchPostsRequest, fetchPostsSuccess, fetchPostsFailure, addPostSuccess } = counterSlice.actions;
export default counterSlice.reducer;


