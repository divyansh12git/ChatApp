import { createSlice } from '@reduxjs/toolkit'

export const roomDataSlice = createSlice({
    name: 'roomData',
    initialState: [],
    reducers: {
        updateRoomData: (state, action) => {
            //@ts-ignore
            if (!state.some((item) => item.friendID === action.payload.friendID)) {
                //@ts-ignore
                state.push(action.payload);
            }
        }
    },
});

export const { updateRoomData } = roomDataSlice.actions;
export default roomDataSlice.reducer;