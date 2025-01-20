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
                state=state.filter((e)=>e!==action.payload.id);
            }
        }
    }

);
export const {updateOnlineList, removeOnlineList}=OnlineListSlice.actions;
export default OnlineListSlice.reducer