import { getUserStrategy, userDBManager } from "../../controllers";
import { verifyToken } from "../../helpers";
import { User, UserToRoom } from "../../interfaces/types";
import {getUserHandler} from "../../services/user"
import { getAllFriendsData } from "../../services/friendlogic";
import {getAllUsersHandler} from "../../services/user";
import {getRequestRequestingList} from "../../services/friendlogic";
import {getRequestData} from "../../services/user";
import { sendRequest,actionOnRequest } from "../../services/friendlogic";
import { ResUser } from "../../interfaces/types";

type upinp={
    user:User,
    finduser:string
}
interface dummyUser{
    id:Number,
    name:string,
    username:string,
    
}
const u:User[]=[{
        id:9999,
        name: "Divyansh Gupta",
        username: "_divyansh_8",
        password: "13245789",
        friends: 0,
        requested: 0,
        number_of_posts: 0,
        profilePictureURL:"_",
        Bio: "This is me Divyanh gupta"
    },
    {
        id:9999,
        name: "Kashish Verma",
        username: "kash4.ish",
        password: "13245789",
        friends: 0,
        requested:0,
        number_of_posts: 0,
        profilePictureURL:"_",
        Bio: "This is me Kashish Verma"
    },
]

const queries={
    getAllUsers:async(_:any,{input}:{input:string})=>{
        // console.log(input);
        const data=await getAllUsersHandler(input);
        return data;
    },
    getUser:async(_:any,{input}:{input:String})=>{
        // console.log(input);
        
        const user:User|null=await getUserHandler(input);
        return user;
    },

    getCurrentUser:async(_:any,__:any,context:any)=>{
        // console.log(context);
        if(context && context.currentuser){
            const tokendata=context.currentuser;
            const username=verifyToken(tokendata);
            // console.log(username);
            if(username){
                const user:User|null=await getUserHandler(username);
                // console.log(user);
                if(user){
                    return user;
                }
            }
        }

        const dummyUser:dummyUser={
            name:"invalid",
            id:0,
            username: 'invalid',

          }
        return dummyUser;
    },
    getFriendsData:async(_:any,{userId}:{userId:number})=>{
        // const myid=Number(input)
        const handler=new getAllFriendsData(userId);
        const data:User[]=await handler.getData();
        if(data){
            return data;
        }
    },
    getUserToRoomData:async(_:any,{userId}:{userId:number})=>{
        const handler=new getAllFriendsData(userId);
        const data:UserToRoom[]=await handler.getUserToRoomData();
        if(data)return data;
    },

    getRequestRequestingList:async(_:any,{userId}:{userId:number})=>{
        let res:any=[];
        const data=await getRequestRequestingList(userId);
        if(data)res= data;
        return data;
    },

    getRequestUserData:async(_:any,{userId}:{userId:number})=>{
        let res:any=[];
        const data=await getRequestData(userId);
        console.log(data);
        if(data) res= data;
        return res;
    }

};

const mutation={
    deleteUser:async(_:any,{input}:{input:String}):Promise<Boolean>=>{   
        

        return true;
    },


    updateUser:async(_:any,{input}:{input:any})=>{
        try{
            const {name,username,password,Bio,followers,
                following,number_of_posts,profilePictureURL,findUser}=input;
                console.log(findUser); 
                console.log(input); 
            for(let i=0;i<u.length;i++){
                if(u[i].username===findUser){
                    u[i].name=name || u[i].name;
                    u[i].username=username || u[i].username;
                    u[i].password=password || u[i].password;
                    u[i].Bio= Bio || u[i].Bio;
                    u[i].friends=followers || u[i].friends;
                    u[i].requested=following || u[i].requested;
                    u[i].number_of_posts=number_of_posts || u[i].number_of_posts;
                    u[i].profilePictureURL=profilePictureURL || u[i].profilePictureURL;
                    console.log(u[i]);
                    return true;
                }
            }
        }
        catch(e){
            console.log(e);
            return false;
        }
    },

    sendRequest:async(_:any,{myId,userId}:{myId:number,userId:number})=>{
        const status=await sendRequest({myId,userId});
        return status;
    },
    actionOnRequest:async(_:any,{myId,userId,accept}:{myId:number,userId:number,accept:boolean})=>{
        return await actionOnRequest({myId,userId,action:accept});
    
    },


};

export const resolvers={queries,mutation};