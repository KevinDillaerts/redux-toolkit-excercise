import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createClient } from "@supabase/supabase-js";

const initialState = { items: [] };

const supabase = createClient(
  "https://catvfsywppdmfdnyrkfc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjM4NDY4NDI3LCJleHAiOjE5NTQwNDQ0Mjd9.AF9BCwADUMJ1YH4WtzoXQ-9aeCFuQgs4ls8zN3SFS9Y"
);

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
  },
});

export default shoppingSlice.reducer;
