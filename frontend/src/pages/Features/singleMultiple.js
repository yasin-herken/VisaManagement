import { createSlice } from "@reduxjs/toolkit";

export const pricesSlice = createSlice({
    name: "price",
    initialState: {
        price: null
    },
    reducers: {
        addPrices: (state, action) => {
            state.price = action.payload;
        }
    }
});

export const { addPrices } = pricesSlice.actions;
export const selectPrice = (state) => state.price.price;

export default pricesSlice.reducer;