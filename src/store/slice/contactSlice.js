import { createSlice } from "@reduxjs/toolkit";
import { deleteContact } from "../actions/contactActions";

const initialState = {
  contacts: [],
  pending: false,
};

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
      state.pending = false;
    },
    setPending: (state, action) => {
      state.pending = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(deleteContact.pending, (state) => {})
      .addCase(deleteContact.fulfilled, (state) => {})
      .addCase(deleteContact.rejected, (state) => {});
  },
});

export const { setContacts, setPending } = contactSlice.actions;
export default contactSlice.reducer;
