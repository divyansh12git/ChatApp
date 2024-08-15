import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../interfaces/types";
import { EncrptData, DecryptData } from "./encrtption";
const privateKey=process.env.JWT_TOKEN_KEY || "icecream";

const createToken=(username:String):String=>{
    let token:String  ="invalid"
    try{
         token = jwt.sign({ username:username }, privateKey, { expiresIn: "2days" });
         const encToken=EncrptData({t:token});
         return encToken.t;
    }catch(e){
        console.log(e);
    }
    
    // console.log(token);
    return token;
}

const verifyToken=(token:String):string|null=>{
    let username:String|null=null;
    try{
        const tokendata = token.split(' ')[1];
        const decodeToken=DecryptData({data:tokendata});
        jwt.verify(decodeToken.data.toString(), privateKey, (err, user) => {
        if (err) {
            // console.log("YOYO");
            console.log("Invalid Jwt unable to authenticate");
        } 
        // console.log(user);
        if(typeof user ==="object")username=user.username ;
    });
    }catch(e){
        console.log("Invalid Jwt unable to authenticate");
    }
    return username;
}
export {verifyToken,createToken}
