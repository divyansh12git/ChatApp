import { createSlice } from '@reduxjs/toolkit'

const VideoCall=createSlice(
    {
        name: 'videoCall',
        initialState: {
            ongoing: false,
            friendId:"",
        },
        reducers: {
            start:(state,action)=>{
                console.log(state.ongoing," ",state.friendId);
                state.ongoing=true;
                state.friendId=action.payload.friendId
            },
            end:(state)=>{
                state.ongoing=false;
                console.log(state.ongoing);
                state.friendId=""
            }
            
        },
    }
);
export const {start,end}=VideoCall.actions;

export default VideoCall.reducer;
