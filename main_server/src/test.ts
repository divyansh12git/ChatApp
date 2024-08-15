import {SignInHandler, SignUpHandler} from "./api/v1/middleware/authentication/";
import { SignUpCredentials } from "./api/v1/interfaces/requests";
import { createToken } from "./api/v1/helpers";



(async()=>{
    const obj:SignUpCredentials={
        name:"Kashish Verma",
        username:"kash04.ish",
        password:"789456123"
    };
    // const token=await SignUp(obj);
    // console.log(token);
    // console.log(await SignInHandler({username:"kash04.ish",
    //     password:"789456123"}));
    const t= createToken("Icecream");
    console.log(t);
})()
