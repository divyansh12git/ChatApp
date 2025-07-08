import { getUserStrategy, userDBManager } from "../../controllers";
import { DecryptData } from "../../helpers";
import {User} from "../../interfaces/types"

const getUserHandler=async(username:String):Promise<User|null>=>{

    const dbhandler=new userDBManager(new getUserStrategy());
    
    try{
        // @ts-ignore
        const user:User=await dbhandler.doAction(username.toString());
        console.log(user);
        // decrypting the data;
        const {name,profilePictureURL,Bio}=user;
        const decryptedData=DecryptData({name,bio:Bio?Bio:""});
        // console.log(decryptedData);
        const decUser:User={
            ...user,
            name:decryptedData.name.toString(),
            Bio:decryptedData.bio?decryptedData.bio.toString():"",
            // profilePictureURL:decryptedData.profilePictureURL.toString()
        }
        // console.log("final: ",decUser);
        return decUser;
    }catch(e){
        console.log(e);
    }

    return null;
}
export default getUserHandler;