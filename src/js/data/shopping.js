import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  items: [
    { id: nanoid(), name: "Red Bull", qty: 12 },
    { id: nanoid(), name: "Boerinneke", qty: 2 },
    { id: nanoid(), name: "Kaas", qty: 10 },
  ],
};

const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    addItem: (state, { payload }) => {
      state.items.push(payload);
    },
    deleteItem: (state, { payload }) => {
      state.items = state.items.filter((item) => item.id !== payload);
    },
    updateItem: (state, { payload }) => {
      state.items = state.items.map((item) => {
        if (item.id === payload.id) {
          return { ...item, name: payload.name, qty: payload.qty };
        } else {
          return item;
        }
      });
    },
  },
});

export const { addItem, deleteItem, updateItem } = shoppingSlice.actions;
export default shoppingSlice.reducer;
