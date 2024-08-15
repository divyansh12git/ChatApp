import { getUserStrategy, userDBManager } from "../../controllers";
import { compareHash,DecryptData } from "../../helpers";
import { User } from "../../interfaces/types";
import { SignInCredentials } from "../../interfaces/requests";



const SignInHandler=async(credentials:SignInCredentials):Promise<Boolean>=>{
    const {username,password}=credentials;

    try{
        const handlerStrategy=new getUserStrategy();
        const dbManager=new userDBManager(handlerStrategy);
        
        // @ts-ignore
        const user:User=await dbManager.doAction(username.toString());

        //those users that are not find are came up with blank data 
        if(user.name.length){
            return await compareHash(password,user.password);
        }
        
    }catch(e){
        console.log(e);
        return false;
    }

    return false;
}
export default SignInHandler;