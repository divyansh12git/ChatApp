import axios from "axios";
import { headers } from "next/headers";

interface para{
    username:string,
    password:string
}
const route="/auth/login"
const makeLogin=async(data:para)=>{
    // console.log(data);
    const response =await axios.post("/api/auth/login",{        
        ...data
    },{
        headers: {
          'Content-Type': 'application/json'
        }
    }
    );
    return response.data;
}
export default makeLogin;
