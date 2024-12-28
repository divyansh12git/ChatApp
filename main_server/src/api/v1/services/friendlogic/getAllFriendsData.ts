import { getUserById, userDBManager } from "../../controllers";
import {UserToRoomController} from "../../controllers/"

import { User } from "../../interfaces/types";

class getAllFriendsData{
    private  myId:number;
    public friendList:number[];

    public   constructor(myId:number){
        this.myId=myId;
        this.friendList=[];
    }

    private initfriendList=async()=>{
        if(this.friendList.length!=0)return ;
        try{
            const userToRoomHandler=new UserToRoomController();
            const data=await userToRoomHandler.getUserToRoomData(this.myId);
            if(data){
                data.rooms.forEach((pair)=>{
                    this.friendList.push(pair.friendID);
                })
            }
            // console.log(this.friendList);
        }catch(e){
            console.log(e);
        }
    };


     getData=async():Promise<User[]>=>{
        let friendData:User[]=[];
        try{
            await this.initfriendList();
            const userStrategy=new getUserById();
            const userhandler=new userDBManager(userStrategy);
            
            for (const el of this.friendList) {
                const res = await userhandler.doAction(el.toString());
                // console.log(res);
                if (res) {
                  //@ts-ignore
                  friendData.push(res);
                }
              }
            if(friendData.length == 0){
                console.log("cannot find friend data");
            }
    
        }catch(e){
            console.log("Error form get all friend bussiness logic");
            console.log(e);
        }
        // console.log("HI1");
        return friendData;
    }



}

export {getAllFriendsData};