import { getAllUserStrategy, userDBManager } from "../../controllers";
import { DecryptData } from "../../helpers";
import {User} from "../../interfaces/types"
type ResUser={
    id:number,
    name:string,
    username:string,
    profilePictureURL:string,
    Bio:string,
}
const getAllUsersHandler=async(condition:string):Promise<ResUser[]>=>{

    const dbhandler=new userDBManager(new getAllUserStrategy());
    
    const decryptedData:ResUser[]=[];
    if(condition.length==0)return decryptedData;
    try{
        // @ts-ignore
        const users:User[]=await dbhandler.doAction(condition);
        // console.log(users);
        // decrypting the data;
        users.map((user:User)=>{
            const {name}=user
            const d=DecryptData({name});
            const temp:ResUser={
                id:user.id || -1,
                name:d.name.toString(),
                username:user.username,
                profilePictureURL:user.profilePictureURL,
                Bio:user.Bio || ""
            }
            decryptedData.push(temp)
        })
        

    }catch(e){
        console.log(e);
    }

    return decryptedData;
}
export default getAllUsersHandler;