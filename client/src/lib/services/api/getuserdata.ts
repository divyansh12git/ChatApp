import axios from "axios"
import {User} from "../../types/entities"


const getUserData=async(username:string)=>{
    const response=await axios.get("/api/getuserdata",{params:{
        username:username
    }});
    console.log(response.data.success);
    // const data={...response.data.data};
    // console.log(data);
    if(!response.data.success){
        console.log("Hi there")
        return response.data.NextRequest
    };
    const data:User={
        name:response.data.data.name ,
        profilePictureURL:response.data.data.profilePictureURL ,
        username:response.data.data.username ,
        Bio:response.data.data.Bio ,
        friends:response.data.data.friends ,
        id:response.data.data.id ,
        number_of_posts:response.data.data.number_of_posts ,
        requested:response.data.data.requested 
    }
    // console.log(data);
    return data;
}
export default getUserData;