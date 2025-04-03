import { createSlice } from '@reduxjs/toolkit'

const incomingCall=createSlice(
    {
        name: 'incomingCall',
        initialState: {
            status: false,
            friendId:"",
            friendName:"",
            friendProfilePic:"",

        },
        reducers: {
            incoming:(state,action)=>{
                state.status=true;
                state.friendId=action.payload.friendId;
                state.friendName=action.payload.friendName;
                // state.friendUserName=action.payload.friendUserName,
                state.friendProfilePic=action.payload.friendProfilePic;
                // console.log(state.sdp);
            },
            endIncoming:(state)=>{
                state.status=false;
                state.friendId="";
                state.friendName="";
                state.friendProfilePic="";

            }
            
        },
    }
);
export const {incoming,endIncoming}=incomingCall.actions;

export default incomingCall.reducer;
