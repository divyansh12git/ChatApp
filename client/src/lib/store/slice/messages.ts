import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { Message } from "@/lib/types/entities";

const initialState:{
    friendId:number,
    messages:Message[]
}[]=[ 
    {
    friendId: 1,
    messages: [
      {
        id: 101,
        sendByMe: true,
        data: "Hello, how are you?",
        time: "2025-01-13 10:00 AM",
      },
      {
        id: 102,
        sendByMe: false,
        data: "I'm good, thanks! How about you?",
        time: "2025-01-13 10:01 AM",
      },
    ],
  },
  {
    friendId: 2,
    messages: [
      {
        id: 201,
        sendByMe: true,
        data: "Hey, are you free this weekend?",
        time: "2025-01-12 3:00 PM",
      },
    ],
  },
  {
    friendId: 3,
    messages: [],
  },
];

const messageSlice=createSlice({
        name:"messageSlice",
        initialState,
        reducers:{
            updateMessage:(state,action:PayloadAction<{id:number,message:Message}>)=>{
                console.log("Hi from message slice");
                const friend=state.find((friend)=>friend.friendId===action.payload.id);
                if(friend){
                    friend.messages.push(action.payload.message);
                }else{
                    state.push({
                        friendId:action.payload.id,
                        messages:[action.payload.message]
                    })
                }
            }
        }
    }

);
export const {updateMessage}=messageSlice.actions;
export default messageSlice.reducer;