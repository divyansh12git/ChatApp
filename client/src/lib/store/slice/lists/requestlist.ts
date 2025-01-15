import { createSlice,PayloadAction } from "@reduxjs/toolkit";

const RequestListSlice=createSlice({
        name:"requestList",
        initialState:[],
        reducers:{
            updateRequestList:(state,action:PayloadAction<{id:number}>)=>{
                if(!state.some((e)=>e===action.payload.id)){
                    //@ts-ignore
                    state.push(action.payload.id);
                }
            }
        }
    }

);
export const {updateRequestList}=RequestListSlice.actions;
export default RequestListSlice.reducer