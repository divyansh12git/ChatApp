import { User} from "../../interfaces/types"
import { SignUpCredentials } from "../../interfaces/requests";
import { EncrptData,DecryptData,compareHash,generateHash,createToken,verifyToken } from "../../helpers";
import { userDBManager,mutateUserStrategy, getUserStrategy } from "../../controllers";
import { getUserHandler } from "../user";

const SignupHandler=async(data:SignUpCredentials):Promise<Boolean>=>{

    let {username,password,name}=data;
    let encData=EncrptData({name});
    const hashedPassword=await generateHash(password);

    const userToUpload:User={
        name:encData.name.toString(),
        username:username.toString(),
        password:hashedPassword,
        profilePictureURL:"_",
        Bio:"",
        friends:0,
        requested:0,
        number_of_posts:0
    }
    try{
        const createUser=new mutateUserStrategy();
        const findUser=new userDBManager(new getUserStrategy());
        const find=await findUser.doAction(username.toString());
        //@ts-ignore
        if(find.username!=="null"){
            return false;
        }
        const dbManager=new userDBManager(createUser);
        const result=await dbManager.doAction(userToUpload);
        if(result){
            return true;
        }
        return false;
        // const user=verifyToken(sessionToken! );
        
    }catch(e){
        console.log(e);
        return false;
    }

    
}
export default SignupHandler;