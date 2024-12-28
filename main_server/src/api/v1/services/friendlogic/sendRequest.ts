import UserToRoomController from "../../controllers/dbcontroller/userToRoomController"

//requirements:myID,userID
interface ISendRequest{
    myId:number,
    userId:number
}
const sendRequest=async ({myId,userId}:ISendRequest):Promise<Boolean>=>{
    //myID sending friend Request to userID
    let status=false;
    try{

        const dbcontroller=new UserToRoomController();
        const operation1=await dbcontroller.addRequesting({myId,userId});
        if(operation1==true ){
            status=true;
            console.log("succesfully requested");
        }else{
            console.log("Cannot request");
        }
    }catch(e){
        console.log("Error from requesting module");
        console.log(e);
    }

    return  status;
}


export {sendRequest};