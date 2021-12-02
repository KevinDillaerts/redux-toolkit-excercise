import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { items: [] };

const fetchDataDB = async () => {
  const result = await fetch("https://catvfsywppdmfdnyrkfc.supabase.co/rest/v1/items?select=*", {
    headers: {
      apikey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODQ2ODQyNywiZXhwIjoxOTU0MDQ0NDI3fQ.wArhIcdTIfnJdvrvKQ4ufABcsJyOibJbXbnrUvDSwoc",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODQ2ODQyNywiZXhwIjoxOTU0MDQ0NDI3fQ.wArhIcdTIfnJdvrvKQ4ufABcsJyOibJbXbnrUvDSwoc`,
    },
  });
  const data = await result.json();
  return data;
};

export const updateDataDB = createAsyncThunk("items/getItems", async () => {
  const items = await fetchDataDB();
  return { items };
});

export const addItemDB = createAsyncThunk("items/addItem", async ({ name, qty }) => {
  try {
    await fetch("https://catvfsywppdmfdnyrkfc.supabase.co/rest/v1/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODQ2ODQyNywiZXhwIjoxOTU0MDQ0NDI3fQ.wArhIcdTIfnJdvrvKQ4ufABcsJyOibJbXbnrUvDSwoc",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODQ2ODQyNywiZXhwIjoxOTU0MDQ0NDI3fQ.wArhIcdTIfnJdvrvKQ4ufABcsJyOibJbXbnrUvDSwoc`,
      },
      body: JSON.stringify({ name: name, qty: qty }),
    });
    const items = await fetchDataDB();
    return { items };
  } catch (error) {
    console.log(error);
  }
});

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
  extraReducers: {
    [updateDataDB.fulfilled]: (state, action) => {
      state.items = action.payload.items;
    },
    [addItemDB.fulfilled]: (state, action) => {
      state.items = action.payload.items;
    },
  },
});

export const { addItem, deleteItem, updateItem } = shoppingSlice.actions;
export default shoppingSlice.reducer;
