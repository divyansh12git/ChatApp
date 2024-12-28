import {SignInHandler, SignUpHandler} from "./api/v1/middleware/authentication/";
import { SignUpCredentials } from "./api/v1/interfaces/requests";
import { createToken } from "./api/v1/helpers";
import UserToRoomController from "./api/v1/controllers/dbcontroller/userToRoomController";
import { room } from "./api/v1/interfaces/userToRoom";
import { mutateUserStrategy,userDBManager } from "./api/v1/controllers";
import { User } from "./api/v1/interfaces/types";
import { signupHandler } from "./api/v1/helpers/authroute/handlers/signup";
import { actionOnRequest, getAllFriendsData, sendRequest } from "./api/v1/services/friendlogic";


(async()=>{
    const obj:User={
        id:444,
        name:"Saksham Singhal",
        username:"sack-11l",
        password:"789456123",
        profilePictureURL:"_",
    };
    const room:room={
        requested:[55,66,77],
        requesting:[10,88,11],
        rooms:[{roomID:"55",friendID:2}],
        userId:2
    }
    // await sendRequest({myId:4,userId:2});
    // await actionOnRequest({myId:2,userId:1,action:false});
    // await actionOnRequest({myId:4,userId:3,action:true});
    // await sendRequest({myId:1,userId:3});
    // await sendRequest({myId:3,userId:4});
    const friends=new getAllFriendsData(3);
    const data=await friends.getData();
    console.log(data);
    




    // const token=await SignUpHandler(obj);
    // console.log(token);
    // console.log(await SignInHandler({username:"kash04.ish",
    //     password:"789456123"}));
    // const t= createToken("Icecream");
    // console.log(t);
    // const manager=new UserToRoomController();
    // const d=await manager.createUserToRoom(room);
    // console.log(d);
    // const a=await manager.getUserToRoomData(1);
    // console.log(a);
    // await manager.addRequesting({myId:1,userId:2});
    // await manager.addRequesting({myId:1,userId:4});

    // const x=await manager.removeRoom({myId:1,userId:550});
    // console.log(await manager.getUserToRoomData(1));
})()
