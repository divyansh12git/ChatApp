import Link from "next/link";
import profile1 from "@/../public/images/profile/2.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { Message, Room } from "@/lib/types/entities";
import { updateCurrentFriend } from "@/lib/store/slice/currentFriend";
import { updateMessage } from "@/lib/store/slice/messages";
import { useEffect } from "react";
import { useSocket } from "@/lib/provider/socket/socketProvider";
import getDateFormat from "@/lib/utils/date";
import {initOnlineUsers, removeOnlineList} from "@/lib/store/slice/lists/online"
import { endIncoming } from "@/lib/store/slice/function/incomingCall";
import { end } from "@/lib/store/slice/function/videoCall";
import getProfilePic from "@/lib/utils/getprofielpic";
interface props{
    id:number,
    profilepic:any,
    username:string,
    message:string,
    count:number,
	name:string

}
function ProfileCard({id,profilepic,username,message,count,name}:props) {
    
    const dispatch=useDispatch();
    const myId=useSelector((state:RootState)=>state.personalInformation).id;
    const roomData:Room[]=useSelector((state:RootState)=>state.roomData);
    const friendData=useSelector((state:RootState)=>state.friendData);
    const socket=useSocket();
    const profilePic=getProfilePic(username);
    const profilepicStyle = {
		backgroundImage:`url(/images/profile/${profilePic}.jpg)` || `url(${profilepic.src})`, 
		// .src gives the URL path of the image
		backgroundSize: 'cover', // adjust as needed
		backgroundPosition: 'center',
    }
    let videoCallController=useSelector((state:RootState)=>state.videoCall);

    const room=roomData.find((e)=>(e.friendID)===Number(id));
    // console.log(room?.roomID)
    function changeCurrentFriend(){

      if(videoCallController.ongoing)return;
      
      dispatch(updateCurrentFriend(
        {
          id:id,
          username:username,
          roomId:room?.roomID,
          profilePictureURL:profilepic
        }
      ));
    }
	const incomingId=useSelector((state:RootState)=>state.incomingCall.friendId);
	const ongoingId=useSelector((state:RootState)=>state.videoCall.friendId);
    //joining the room:
    useEffect(()=>{
      // console.log(room);
      if(room && socket ){

        socket.emit("joinRoom",{roomId:room.roomID,userId:myId});
        if(socket){
          // console.log("yup from hids")
          
          socket.on("online-users",(data:{online:[]})=>{
              // console.log(data);
              if(data && data.online){
                  dispatch(initOnlineUsers({users:data.online}));
              }
          });
          
          socket.on("user-disconnected",(data:{id:string,msg:string})=>{
            // console.log("yoyoyoyoyo");
              if(data && data.id){
                // console.log(data);
                dispatch(removeOnlineList({id:Number(data.id)}));
                
                if(Number(incomingId)===Number(data.id)){
                  dispatch(endIncoming())
                }
                
                if(Number(ongoingId)===Number(data.id)){
                  dispatch(end());
                }
              }
          });
      }
        
        }else console.log("sominthg went wrong");

        return()=>{
          socket.off("joinRoom");
          socket.off("user-disconnected");
        }
    },[]);

    return (
        <div className="hover:bg-[#54545427] flex w-full flex-col" onClick={()=>{changeCurrentFriend()}}>
              <div  className="flex flex-row h-24 " >
                <div className=" w-28 flex justify-center items-center ">
                  <div style={profilepicStyle} className="bg-white w-[3.5rem] h-[3.5rem] rounded-full border border-white">.</div>
                </div>
                <div className=" w-full flex flex-row justify-start ">
                    <div className=" overflow-hidden h-full flex flex-col justify-center truncate w-[15rem]">
                      <p className="font-medium text-lg text-white -mb-1">{name} </p>
                      <p className=" font-extralight text-sm text-zinc-400 ">{message}</p>
                    </div>
                    {/* <div className="flex justify-center items-center w-10  ">
                      <div className="w-6 h-6 text-sm mr-2 bg-red-500 rounded-full text-white flex justify-center items-center">{count}</div>
                    </div> */}

                </div>
                
              </div>
              <div className="h-[1px] w-[93%] bg-white self-center"></div>
        </div>
    )
}
export default ProfileCard;