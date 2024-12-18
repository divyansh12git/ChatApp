import jwt from "jsonwebtoken";
import {DecryptData} from "@/lib/services";

const privateKey="Thisis_Divyansh_Private_key";

const verifyToken=(token:String):any=>{
    let username:String|null=null;
    console.log(privateKey);
    try{
        const tokendata = token.split(' ')[1];
        console.log(tokendata);
        const decodeToken=DecryptData({data:tokendata});
        const t=decodeToken.data.toString();
        jwt.verify(t, privateKey.toString(), (err, user) => {
        if (err) {
            console.log("Invalid Jwt unable to authenticate");
        } 
        // console.log(user);
        if(typeof user ==="object")username=user.username ;
    });
    }catch(e){
        console.log("Invalid Jwt unable to authenticate");
        console.log(e);
    }
    return username;
}
export default verifyToken;
