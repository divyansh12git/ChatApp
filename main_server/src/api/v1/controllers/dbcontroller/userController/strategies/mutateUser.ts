import { IMutateUser } from "../../../../interfaces/databaseController";
import { User } from "../../../../interfaces/types";
import {Database} from "../../../../models";
import UserToRoomController from "../../userToRoomController";
class mutateUserStrategy implements IMutateUser{
    private Client:Database;
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
        }).then(async(e)=>{
             //adding room data in another table:
            const id=e.id
            const roomManager=new UserToRoomController();
            try{
                await roomManager.createUserToRoom({
                    userId:id,requested:[],requesting:[],rooms:[]
                }).then(()=>{
                    result=true;
                    console.log("Data added successfuly");
                });
            }catch(e){
                console.log(e);
            };
            
        }).catch((e)=>{
            console.log(e);
        });
        
        return result;
    }
}

export default mutateUserStrategy;