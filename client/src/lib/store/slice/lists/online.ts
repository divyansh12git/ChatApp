import { createSlice,PayloadAction } from "@reduxjs/toolkit";

const OnlineListSlice=createSlice({
        name:"onlineList",
        initialState:[],
        reducers:{
            updateOnlineList:(state,action:PayloadAction<{id:number}>)=>{
                if(!state.some((e)=>e===action.payload.id)){
                    //@ts-ignore
                    state.push(action.payload.id);
                }
            },
            removeOnlineList:(state,action:PayloadAction<{id:number}>)=>{
                // console.log(action.payload.id);
                return state.filter((e) => e !== action.payload.id);
            },

            initOnlineUsers:(state,action:PayloadAction<{users:[]}>)=>{
                if(action.payload.users.length>0){
                    action.payload.users.map((id)=>{
                        if(!state.some((e)=>e===Number(id))){
                            //@ts-ignore
                            state.push(Number(id));
                        }
                    })
                }
            }
        }
    }

);
export const {updateOnlineList, removeOnlineList, initOnlineUsers}=OnlineListSlice.actions;
export default OnlineListSlice.reducer