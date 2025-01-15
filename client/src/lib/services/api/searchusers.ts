import axios from "axios";
import {searchUser} from "../../types/entities"
const searchUsers=async(searchQuery:string)=>{
    const response=await axios.get("/api/searchuser",{params:{
        searchquery:searchQuery
    }});
    const data:searchUser[]=[];
    if(!response.data.success){
        return data;
    }
    // console.log(response);
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
    return data
}
export default searchUsers