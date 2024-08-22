import { IDeleteUser } from "../../../../interfaces/databaseController";
import Database from "../../../../services/database";

class deleteUserStrategy implements IDeleteUser{
    private Client:Database;
    constructor(){
        this.Client=Database.getDbInstance();
        if(!this.Client.isConnected())this.Client.connect();
    }
    async execute(username: string): Promise<Boolean> {
        const handler=Database.Client;
        let result=false;
        
        await handler?.user.delete({
            where:{
                username:username
            }
        }).then(()=>{
            result=true;
            console.log("Data deleted successfuly");
        }).catch((e)=>{
            console.log(e);
        })
        
        return result;
    }
}
export default deleteUserStrategy;