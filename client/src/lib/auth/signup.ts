import axios from "axios";

interface para{
    name:string,
    username:string,
    password:string
}
export default async function makeSignUp(data:para){
    const response=await axios.post("/api/auth/signup",{
        ...data
    },{
        headers: {
          'Content-Type': 'application/json'
        }
    });
    
    console.log(response);
   
    return response.data;
}