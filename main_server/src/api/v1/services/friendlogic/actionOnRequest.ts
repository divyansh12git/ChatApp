import UserToRoomController from "../../controllers/dbcontroller/userToRoomController"

//requirements:myID,userID
interface sendRequest{
    myId:number,
    userId:number,
    action:Boolean
}
const actionOnRequest=async ({myId,userId,action}:sendRequest):Promise<Boolean>=>{
    //performing action on a request in myId requsted list
    //action==true-->accept request
    //action==false-->decline request

    
    let status=false;
    try{

        const dbcontroller=new UserToRoomController();
        const operation1=await dbcontroller.removeRequested({myId,userId,status:action});
        
        if(operation1 ){
            status=true;
            console.log("succesfully requested");
        }else{
            console.log("Cannot request");
        }
    }catch(e){
        console.log("Error from actionOnRequest module");
        console.log(e);
    }

    return  status;
}


export {actionOnRequest};