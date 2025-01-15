import { IGetUserById } from "../../../../interfaces/databaseController";
import { User } from "../../../../interfaces/types";
import {Database} from "../../../../models";
class getUserById implements IGetUserById{
    private Client:Database;
    constructor(){
        this.Client=Database.getDbInstance();
        if(!this.Client.isConnected())this.Client.connect();
    }
    async execute(id: string): Promise<User > {
        const handler=Database.Client;
        let user:User={
            id:0,
            name:"",
            password:"",
            profilePictureURL:"",
            username:"",
        }
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
        if(data){

            user={
                id:data.id ,
                name:data.name || "",
                password:data.password || "",
                profilePictureURL:data.password || "",
                username:data.username || "null",
                Bio:data.Bio || "",
                friends:data.friends || 0,
                requested:data.requested || 0,
                number_of_posts:data.number_of_posts || 0
            }

        }
        return user;
    }
}

export {getUserById};