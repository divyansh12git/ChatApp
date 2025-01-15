import { createSlice,PayloadAction } from "@reduxjs/toolkit";

const RequestingSlice=createSlice({
        name:"requestingList",
        initialState:[],
        reducers:{
            updateRequestingList:(state,action:PayloadAction<{id:number}>)=>{
                if(!state.some((e)=>e===action.payload.id)){
                    //@ts-ignore
                    state.push(action.payload.id);
                }
            }
        }
    }

);
export const {updateRequestingList}=RequestingSlice.actions;
export default RequestingSlice.reducer