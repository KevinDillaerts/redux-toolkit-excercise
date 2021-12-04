import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "./client.js";

const initialState = { items: [] };

export const fetchDataDB = createAsyncThunk("items/getItems", async () => {
  const { data } = await supabase.from("items").select("*");
  return data;
});

export const addItemDB = createAsyncThunk("items/addItem", async ({ name, qty }) => {
  const { data, error } = await supabase.from("items").insert([{ name: name, qty: qty }]);
  return data[0];
});

export const deleteItemDB = createAsyncThunk("items/deleteItem", async (id) => {
  const { data, error } = await supabase.from("items").delete().eq("id", id);
  return data[0];
});

export const editItemDB = createAsyncThunk("items/editItem", async ({ id, name, qty }) => {
  const { data, error } = await supabase
    .from("items")
    .update({ name: name, qty: qty })
    .eq("id", id);
  return data[0];
});

const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchDataDB.fulfilled]: (state, action) => {
      state.items = action.payload;
    },
    [addItemDB.fulfilled]: (state, action) => {
      state.items.push(action.payload);
    },
    [deleteItemDB.fulfilled]: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    [editItemDB.fulfilled]: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
    },
  },
});

export default shoppingSlice.reducer;
