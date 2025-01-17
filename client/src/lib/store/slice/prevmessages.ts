import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { Message } from "@/lib/types/entities";

type prevMessage={
    id:number,
    sender:number,
    msg:string,
    time:string
}
const initialState:{
    friendId:number,
    messages:prevMessage[]
}[]=[];

const prevMessagesSlice=createSlice({
        name:"prevMessageSlice",
        initialState,
        reducers:{
            updatePrevMessages:(state,action:PayloadAction<{id:number,message:prevMessage}>)=>{
            //   console.log("Hi from message slice");
            //   console.log("State: ", state);
            //   console.log("Action Payload: ", action.payload);
                const friend=state.find((friend)=>(friend.friendId)===(action.payload.id));
                // console.log("Found Friend: ",friend);
                // console.log(id);
                // console.log(action.payload.id);
                if(friend){
                    friend.messages.push(action.payload.message);
                }else{
                    state.push({
                        friendId:action.payload.id,
                        messages:[action.payload.message]
                    })
                }
            },
            clearPrevMessages:(state,action:PayloadAction<{id:number}>)=>{
                const friend=state.find((friend)=>(friend.friendId)===(action.payload.id));
                if(friend)friend.messages=[];
            }
        }
    }

);
export const {updatePrevMessages,clearPrevMessages}=prevMessagesSlice.actions;
export default prevMessagesSlice.reducer;