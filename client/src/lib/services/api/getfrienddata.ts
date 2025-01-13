import axios from "axios"
import {User,Room} from "../../types/entities"
const getFriendsData=async(userId:number)=>{
    const data:{
        status:boolean,
        friends:User[],
        rooms:Room[]
    }={
        status:false,
        friends:[],
        rooms:[]
    }
    try{
        const response=await axios.get("/api/getfrienddata",{params:{
            userId:userId
        }});
        // console.log(response.data.data.friends);
        if(!response.data.success)return false;
        const friends:User[]=[];
        const rooms:Room[]= [];
         response.data.data.friends.map((user:User)=>{
            // console.log(user)
            if(user){
                const temp:User={
                    id:user.id,
                    name:user.name,
                    username:user.username,
                    profilePictureURL:user.profilePictureURL,
                    friends:user.friends,
                    requested:user.requested,
                    number_of_posts:user.number_of_posts,
                    Bio:user.Bio
                }
                friends.push(temp);
            }
        });
         response.data.data.rooms.map((room:Room)=>{
             const temp:Room={
                 friendID:room.friendID,
                 roomID:room.roomID
            }
            rooms.push(temp);
            
        })
        if(friends.length && rooms.length){
            data.status=true,
            data.friends=friends,
            data.rooms=rooms
        }
    }catch(e:any){
        console.log("error from adaptor function")
        console.log(e);
    }
    return data;

}
export default getFriendsData;