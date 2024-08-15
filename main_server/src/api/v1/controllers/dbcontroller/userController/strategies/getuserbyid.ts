import { IGetUserById } from "../../../../interfaces/databaseController";
import { User } from "../../../../interfaces/types";
import Database from "../../../../services/database";

class getUserById implements IGetUserById{
    public Client:Database;
    constructor(){
        this.Client=Database.getDbInstance();
        if(!this.Client.isConnected())this.Client.connect();
    }
    async execute(id: string): Promise<User> {
        const handler=Database.Client;

        let data=null;
        try{
            data=await handler?.user.findFirst({
                where:{
                    id:Number(id)
                }
            });
        }catch(e){
            console.log(e);
        }
        const user:User={
            name:data?.name || "",
            password:data?.password || "",
            profilePictureURL:data?.password || "",
            username:data?.username || "null",
            Bio:data?.Bio || "",
            followers:data?.followers || 0,
            following:data?.following || 0,
            number_of_posts:data?.number_of_posts || 0
        }
        return user;
    }
}