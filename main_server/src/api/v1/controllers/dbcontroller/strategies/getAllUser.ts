import { IGetAllUsers } from "../../../interfaces/databaseController";
import { User } from "../../../interfaces/types";
import Database from "../../../services/database";

class getAllUserStrategy implements IGetAllUsers{
    public Client:Database;
    constructor(){
        this.Client=Database.getDbInstance();
        if(!this.Client.isConnected())this.Client.connect();
    }
    async execute(condition:string):Promise<Array<User>>{
        const handler=Database.Client;
        const data:User[]=[];
        await handler?.user.findMany({}).then((result)=>{
            
            result.forEach((r)=>{
                let user:User={
                    name:r?.name || "",
                    password:r?.password || "",
                    profilePictureURL:r?.profilePictureURL || "",
                    username:r?.username || "null",
                    followers:r?.followers || 0,
                    following:r?.following || 0,
                    Bio:r?.Bio || "",
                    number_of_posts:r?.number_of_posts || 0
                
                }
                data.push(user);
            })
        })

        return data;
    }
    
}
export default getAllUserStrategy;