import { createSlice,PayloadAction } from "@reduxjs/toolkit";

const RequestListSlice=createSlice({
        name:"requestList",
        initialState:[],
        reducers:{
            updateRequestList:(state,action:PayloadAction<{list:number[]}>)=>{
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
export const {updateRequestList}=RequestListSlice.actions;
export default RequestListSlice.reducer