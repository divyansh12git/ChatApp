import Database from "../../services/database";
import { User } from "../../interfaces/types";

const mutateUser=async(user:User)=>{
    let Client:Database=Database.getDbInstance();
    Client.connect();
    // console.log({...user})
    const handler=Database.Client;
        await handler?.user.create({
            data:{
                ...user,
            }
        }).then(()=>{
            console.log("Data added successfuly");
        }).catch((e)=>{
            console.log(e);
        })
   
    Client.disconnect();
}
export default mutateUser;