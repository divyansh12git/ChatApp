import { createSlice,PayloadAction } from "@reduxjs/toolkit";

const FriendListSlice=createSlice({
        name:"friendList",
        initialState:[],
        reducers:{
            updateFriendList:(state,action:PayloadAction<{id:number}>)=>{
                if(!state.some((e)=>e===action.payload.id)){
                    //@ts-ignore
                    state.push(action.payload.id);
                }
            }
        }
    }

);
export const {updateFriendList}=FriendListSlice.actions;
export default FriendListSlice.reducer