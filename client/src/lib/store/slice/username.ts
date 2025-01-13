import { createSlice } from '@reduxjs/toolkit'

const usernameSlice=createSlice(
    {
        name: 'username',
        initialState: {
            username: "aaaa",
        },
    reducers: {
        update: (state, action) => {
            state.username = action.payload.username;
        }
    },
    }
);
export const {update}=usernameSlice.actions;

export default usernameSlice.reducer;
