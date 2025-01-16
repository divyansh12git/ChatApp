import { createSlice,PayloadAction } from "@reduxjs/toolkit";

const RequestingSlice=createSlice({
        name:"requestingList",
        initialState:[],
        reducers:{
            updateRequestingList:(state,action:PayloadAction<{list:number[]}>)=>{
                //@ts-ignore
                action.payload.list.map((e:any)=>{
                    if(!state.some((id)=>id===e)){
                        //@ts-ignore
                        state.push(e)
                    }
                }
                )
            }
        }
    }
);
export const {updateRequestingList}=RequestingSlice.actions;
export default RequestingSlice.reducer