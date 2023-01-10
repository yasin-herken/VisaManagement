import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: null,
    },
    reducers: {
        addPosts: (state, action) => {
            state.posts = action.payload;
        }
    }
})
export const { addPosts } = postsSlice.actions;
export const selectPost = (state) => state.posts.posts;

export default postsSlice.reducer;