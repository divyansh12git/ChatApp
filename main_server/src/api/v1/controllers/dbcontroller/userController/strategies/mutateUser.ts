import { IMutateUser } from "../../../../interfaces/databaseController";
import { User } from "../../../../interfaces/types";
import Database from "../../../../services/database";

class mutateUserStrategy implements IMutateUser{
    public Client:Database;
    constructor(){
        this.Client=Database.getDbInstance();
        if(!this.Client.isConnected())this.Client.connect();
    }
    async execute(user: User): Promise<Boolean> {
        const handler=Database.Client;
        let result=false;
        
        await handler?.user.create({
            data:{
                ...user,
            }
        }).then(()=>{
            result=true;
            console.log("Data added successfuly");
        }).catch((e)=>{
            console.log(e);
        })
        
        return result;
    }
}

export default mutateUserStrategy;