import { IGetAllUsers } from "../../../../interfaces/databaseController";
import { User } from "../../../../interfaces/types";
import {Database} from "../../../../models";

class getAllUserStrategy implements IGetAllUsers{
    private Client:Database;
    constructor(){
        this.Client=Database.getDbInstance();
        if(!this.Client.isConnected())this.Client.connect();
    }
    async execute(condition:string):Promise<Array<User>>{
        const handler=Database.Client;
        const data:User[]=[];
        try{
            let result;
            if(condition==='*'){
                result=await handler?.user.findMany({})
            }else{
                result=await handler?.user.findMany({
                    where:{
                        username:{
                            startsWith:condition,
                        }
                    }
                })
            }
        if(result){

            result.forEach((r)=>{
                let user:User={
                    id:r?.id || 0,
                    name:r?.name || "",
                    password:r?.password || "",
                    profilePictureURL:r?.profilePictureURL || "",
                    username:r?.username || "null",
                    friends:r?.friends || 0,
                    requested:r?.requested || 0,
                    Bio:r?.Bio || "",
                    number_of_posts:r?.number_of_posts || 0
                    
                }
                data.push(user);
            });
        }
        }catch(e){
            console.log("error while fetching all users")
            console.log(e);
        }
        return data;
    }
    
}
export default getAllUserStrategy;