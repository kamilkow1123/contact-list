import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listOfContacts : [],
};

export const contactSlice = createSlice({
    name         : "contacts",
    initialState,
    reducers     : {
        setContacts   : (state, action) => {
            state.listOfContacts = action.payload;
        },
        addContact    : (state, action) => {
            state.listOfContacts.push(action.payload);
        },
        deleteContact : (state, action) => {
            state.listOfContacts = state.listOfContacts.filter(
                contact => contact.id !== action.payload
            );
        },
    },
});

// Action creators are generated for each case reducer function
export const { setContacts, deleteContact, addContact } = contactSlice.actions;

export default contactSlice.reducer;
