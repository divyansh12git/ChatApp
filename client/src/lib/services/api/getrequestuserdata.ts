import axios from "axios"
import {searchUser} from "../../types/entities"


const getRequestUserData=async(myId:string)=>{
    const data:searchUser[]=[];
    try{
        const response=await axios.get("/api/getrequestuserdata",{params:{
            myId:myId
        }});
        if(response.data.success && response.data.data){
            response.data.data.map((user:any)=>{
                const temp:searchUser={
                    id:user.id,
                    Bio:user.Bio,
                    name:user.name,
                    profilePictureURL:user.profilePictureURL,
                    username:user.username
                }
                data.push(temp);
            })
             
        };
        
    }catch(e){
        console.log(e);
    }
    // console.log(data);
    return data;
}
export default getRequestUserData;