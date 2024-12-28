import { IGetUser } from "../../../../interfaces/databaseController";
import { User } from "../../../../interfaces/types";
import {Database} from "../../../../models";


class getUserStrategy implements IGetUser {

    private Client:Database;
    constructor(){
        this.Client=Database.getDbInstance();
        if(!this.Client.isConnected())this.Client.connect();
    }

    async execute(username: string): Promise<User> {
        const handler=Database.Client;

        let data=null
        try{
            data=await handler?.user.findFirst({
                where:{
                    username:username
                }
            });
        }catch(e){
            console.log(e);
        }
        const user:User={
            id:data?.id || 0,
            name:data?.name || "",
            password:data?.password || "",
            profilePictureURL:data?.password || "",
            username:data?.username || "null",
            Bio:data?.Bio || "",
            friends:data?.friends || 0,
            requested:data?.requested || 0,
            number_of_posts:data?.number_of_posts || 0
        }

        return user
    }

}
export default getUserStrategy;