import axios from "axios"


interface parameters{
    username:string,
    name:string,
    bio:string
    updateId:number
}
const updateProfile=async({username,name,bio,updateId}:parameters)=>{
    let status=true;
    console.log(updateId);
    if(updateId>=3){
        const response =await axios.post("/api/updateprofile",{
            username,value:name,updateId:3
        })
        console.log(response);
        //@ts-ignore
        status=status && response.data.success
        updateId-=3;
    }
    console.log(status);
    if(updateId==1){
        const response= await axios.post("/api/updateprofile",{
            username,value:bio,updateId:1
        })
        //@ts-ignore
        status=status && response.data.success
    }
    console.log(status);
    return status;
}
export default updateProfile;