import { User } from "../../../interfaces/types";
import { Database } from "../../../models";
import { IUpdateValues } from "../../../interfaces/databaseController";
class updateValues implements IUpdateValues {
  private Client: Database;
  constructor() {
    this.Client = Database.getDbInstance();
    if (!this.Client.isConnected()) this.Client.connect();
  }

  async execute(username: string, value: string,updateId:number): Promise<string> {
    const handler = Database.Client;
    let update=`name`;
    if(updateId==1){
        update=`Bio`;
    }else if(updateId==2){
        update=`profilePictureURL`;
    }else{
        update=`name`;
    }
    let data = null;
    try {
      data = await handler?.user.update({
        where: {
          username: username,
        },
        data: { 
            [update]:value,
         }
        });
    } catch (e: any) {
      console.log(e);
    }
    let val="";
    if(data){
      if(updateId==1){
        val=data.Bio || "";
      }else if(updateId==2){
        val=data.profilePictureURL || "";
      }else{
        val=data.name || "";
      }
    }
    return val;
  }
}
export default updateValues;
