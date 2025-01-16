import { MessageDBManager, RoomDBManager } from "./api/v1/controller/database";
import { Message, Room } from "./api/v1/interfaces";
import time from "./api/v1/helper/time"
import { getMessages } from "./api/v1/services/cassandra";
import {insertMessage} from "./api/v1/services/cassandra/"
(
    
    async ()=>{
        const room:Room={
            users:[],
            roomName:"Chat-room-5",
            createdAt:time().toString(),
            createdBy:2,
            message:[],
        }
        const dummyMessage:Message={
            authorId:2,
            roomId:3,
            time:time().toString(),
            content :"What's up buddy"
        }
        getMessages({
            sender_id:5,
            receiver_id:6
        });
        // await insertMessage({
        //     sender_id:0,
        //     receiver_id:11,
        //     message:"Hi bro vallah habibi",
        //     time:"45ds4d5",

        // });
    }
)()