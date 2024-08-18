//db sigleton class;
import { Prisma, PrismaClient } from "@prisma/client";

class Database{
    private static instance:Database|null;
    public static Client:PrismaClient|null;
    private connected:Boolean;
    public checkstr:String="This is Divyansh Gupta";

    private constructor(){
        Database.Client=new PrismaClient();
        this.connected=false;
    }
    public static getDbInstance():Database{
        if(this.instance==null){
            this.instance=new Database();
        }
        return this.instance;
    }
    
    public disconnect=async()=>{
        try{
            if(Database.Client && this.connected){
                await Database.Client.$disconnect().then(()=>this.connected=false);
            }
        }catch(e){
            console.log("Erroe in disconnecting db:"+e);
        }
    }
    public connect=async()=>{
        try{
            if(Database.Client && !this.connected){
                await Database.Client.$connect().then(()=>this.connected=true);
            }
        }catch(e){
            console.log("Erroe in connecting db:"+e);
        }
    }
    public isConnected=():Boolean=>{return this.connected;}
    
}
export default Database;