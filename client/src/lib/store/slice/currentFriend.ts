import { createSlice } from "@reduxjs/toolkit";

const currentFriendSlice=createSlice({
        name:"currentFriend",
        initialState:{
            id:-1,
            username:"",
            profilePictureURL:"",
            roomId:"0",
        },
        reducers:{
            updateCurrentFriend:(state,action)=>{
                state.id=action.payload.id,
                state.username=action.payload.username,
                state.profilePictureURL=action.payload.profilePictureURL
                state.roomId=action.payload.roomId
            }
        }
    }

);
export const {updateCurrentFriend}=currentFriendSlice.actions;
export default currentFriendSlice.reducer