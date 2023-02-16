import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MockContacts } from "../../data/mockContacts";

export function delay(data, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, time);
  });
}

export const fetchContacts = createAsyncThunk(
  "post/fetchContacts",
  async () => {
    return await delay(MockContacts, 100);
  }
);

export const removeContact = createAsyncThunk(
  "delete/removeContact",
  async (id) => {
    const newUsersArray = MockContacts.filter((item) => item.id !== id);
    return await delay(newUsersArray, 100);
  }
);

const initialState = {
  contacts: [],
};

const usersSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.contacts = action.payload;
    });

    builder.addCase(removeContact.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.contacts = action.payload;
    });
  },
});

export default usersSlice.reducer;

export const selectStateContacts = (state) => state.contacts.contacts;
export const selectStateDetail = (state) => state.contacts.contact;
