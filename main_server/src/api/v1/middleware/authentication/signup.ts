import {SignUpRequest, User} from "../../interfaces/types"
import { EncrptData,DecryptData,compareHash,generateHash,createToken,verifyToken } from "../../helpers";
import { userDBManager,mutateUserStrategy } from "../../controllers";
const SignUp=async(data:SignUpRequest):Promise<String>=>{

    let {username,password,name}=data;
    let encData=EncrptData({username,name});
    const hashedPassword=await generateHash(password);

    const userToUpload:User={
        name:encData.name.toString(),
        username:encData.username.toString(),
        password:hashedPassword,
        profilePictureURL:"_",
        Bio:"",
        followers:0,
        following:0,
        number_of_posts:0
    }
    try{
        const createUser=new mutateUserStrategy();
        const dbManager=new userDBManager(createUser);
        dbManager.doAction(userToUpload);
        return username
    }catch(e){
        console.log(e);
        return "";
    }

    
}
export {SignUp}