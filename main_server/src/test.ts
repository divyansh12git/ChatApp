import {SignInHandler, SignUpHandler} from "./api/v1/middleware/authentication/";
import { SignUpCredentials } from "./api/v1/interfaces/requests";
import { createToken } from "./api/v1/helpers";
import UserToRoomController from "./api/v1/controllers/dbcontroller/userToRoomController";
import { room } from "./api/v1/interfaces/userToRoom";

(async()=>{
    const obj:SignUpCredentials={
        name:"Saksham Singhal",
        username:"sack-11l",
        password:"789456123"
    };
    const room:room={
        requested:[],
        requesting:[],
        rooms:[],
        userId:2
    }
    // const token=await SignUpHandler(obj);
    // console.log(token);
    // console.log(await SignInHandler({username:"kash04.ish",
    //     password:"789456123"}));
    // const t= createToken("Icecream");
    // console.log(t);
    const manager=new UserToRoomController();
    // const d=await manager.createUserToRoom(room);
    // console.log(d);
    // const a=await manager.getUserToRoomData(1);
    // console.log(a);
    // await manager.addRequesting({myId:1,userId:2});
    // await manager.addRequesting({myId:1,userId:4});
    await manager.removeRequested({myId:2,userId:1,status:true})
    await manager.removeRequested({myId:4,userId:1,status:false});
    console.log(await manager.getUserToRoomData(1))
    console.log(await manager.getUserToRoomData(2))
    console.log(await manager.getUserToRoomData(4))
    // const x=await manager.removeRoom({myId:1,userId:550});
    // console.log(await manager.getUserToRoomData(1));
})()
