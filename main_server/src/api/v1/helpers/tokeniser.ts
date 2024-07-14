import jwt from "jsonwebtoken"
import { JwtPayload } from "jsonwebtoken";
import { User } from "../interfaces/types";
const privateKey=process.env.JWT_TOKEN_KEY || "icecream";

const createToken=(username:String):String|null=>{
    let token:String | null =null
    try{
         token = jwt.sign({ username:username }, privateKey, { expiresIn: 2 });
    }catch(e){
        console.log(e);
    }
    return "Bearer: "+ token;
}

const verifyToken=(token:String):string|null=>{
    let username:String|null=null;
    try{
        const tokendata = token.split(' ')[1];
        jwt.verify(tokendata+"44", privateKey, (err, user) => {
        if (err) {
            console.log("YOYO");
            console.log(err);
            username=`${err.name}`
        } 
        console.log(user);
        if(typeof user ==="object")username=user.username ;
    });
    }catch(e){
        console.log(e);
    }
    return username;
}
export {verifyToken,createToken}
