import { getUserStrategy, userDBManager } from "../../controllers";
import { verifyToken } from "../../helpers";
import { User } from "../../interfaces/types";
import {getUserHandler} from "../../middleware/user"
import { getAllFriendsData } from "../../services/friendlogic";
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
        if(input==="*"){
            return u;
        }
        else{
            for(let i=0;i<u.length;i++){
                if(u[i].username.startsWith(input)){
                    return [u[i]];
                }
            }
        }
        return null
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
    }
};

export const resolvers={queries,mutation};