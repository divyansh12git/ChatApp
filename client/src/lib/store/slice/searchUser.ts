import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type searchUser={
    id:number,
    name:string,
    username:string,
    profilePictureURL:string,
    Bio:string,

}
const initialState:searchUser[]=[];
const searchUserSlice=createSlice(
    {
        'name':"searchUser",
        initialState,
        reducers:{
            updateSearchUser:(state,action:PayloadAction<searchUser>)=>{
                if (!state.some((item) => item.id === action.payload.id)) {
                    //@ts-ignore
                    state.push(action.payload);
                }
            }
        }
    }
);
export const {updateSearchUser}=searchUserSlice.actions;
export default searchUserSlice.reducer;