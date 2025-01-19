import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItemState {
  id: string;
  key: string;
  imgURL: string;
  labelName: string;
  labelPrice: number;
  stock: number;
}

const initialState: CartItemState[] = [];

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCart: (state, action: PayloadAction<CartItemState[]>) => {
      return action.payload; 
    },
  },
});


export const { updateCart } = cart.actions;
export default cart.reducer;
