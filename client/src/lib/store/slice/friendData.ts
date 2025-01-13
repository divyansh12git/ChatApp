import { createSlice } from '@reduxjs/toolkit'

export const friendDataSlice = createSlice({
    name: 'friendData',
    initialState: [],
    reducers: {
        updateFriendData: (state, action) => {
            //@ts-ignore
            if (!state.some((item) => item.id === action.payload.id)) {
                //@ts-ignore
                state.push(action.payload);
            }
        }
    },
});

export const { updateFriendData } = friendDataSlice.actions;
export default friendDataSlice.reducer;