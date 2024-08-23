import { IUpdateUser } from "../../../../interfaces/databaseController";
import { User } from "../../../../interfaces/types";
import Database from "../../../../services/database";


class updateUserStrategy implements IUpdateUser{
    private Client:Database;
    constructor(){
        this.Client=Database.getDbInstance();
        if(!this.Client.isConnected())this.Client.connect();
    }
    
    async execute(username:string,user:User): Promise<Boolean> {
        
        const handler=Database.Client;
        let result=false;
        
        await handler?.user.update({
            where:{
                username:username
            },
            data:user
        }).then(()=>{
            result=true;
            console.log("Data added successfuly");
        }).catch((e)=>{
            console.log(e);
        })
        
        return result;

    }
}
export default updateUserStrategy;