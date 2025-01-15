import { getUserStrategy, userDBManager } from "../../controllers";
import { DecryptData } from "../../helpers";
import {User} from "../../interfaces/types"

const getUserHandler=async(username:String):Promise<User|null>=>{

    const dbhandler=new userDBManager(new getUserStrategy());
    
    try{
        // @ts-ignore
        const user:User=await dbhandler.doAction(username.toString());
        
        // decrypting the data;
        const {name,profilePictureURL,Bio}=user;
        const decryptedData=DecryptData({name});
        const decUser:User={
            ...user,
            name:decryptedData.name.toString(),
            // profilePictureURL:decryptedData.profilePictureURL.toString()
        }
        return decUser;
    }catch(e){
        console.log(e);
    }

    return null;
}
export default getUserHandler;