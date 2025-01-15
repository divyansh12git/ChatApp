import axios from "axios";
import {searchUser} from "../../types/entities"
const getLists=async(myId:number)=>{
    const data={
        request:[],
        requesting:[]
    }
    try{
        const response=await axios.get("/api/getlists",{params:{
            myId:myId
        }});
        if(response.data.success){
            console.log(response.data.data);
        }


    }catch(e){
        console.log(e);
    }
    return data;
    
}
export default getLists;