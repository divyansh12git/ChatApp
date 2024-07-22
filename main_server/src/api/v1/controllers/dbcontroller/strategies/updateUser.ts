import { IUpdateUser } from "../../../interfaces/databaseController";
import Database from "../../../services/database";


// class updateUserStrategy implements IUpdateUser{
//     public Client:Database;
//     constructor(){
//         this.Client=Database.getDbInstance();
//         if(!this.Client.isConnected())this.Client.connect();
//     }
    
//     // async execute(id:Number,): Promise<Boolean> {
        
//     //     const handler=Database.Client;
//     //     let result=false;
        
//     //     // await handler?.user.update({
//     //     //     where:{
//     //     //         username:username
//     //     //     },
//     //     //     data:{
                
//     //     //     }
//     //     // }).then(()=>{
//     //     //     result=true;
//     //     //     console.log("Data added successfuly");
//     //     // }).catch((e)=>{
//     //     //     console.log(e);
//     //     // })
        
//     //     return true;


//     //     return true;

//     }
// }
// export default updateUserStrategy;