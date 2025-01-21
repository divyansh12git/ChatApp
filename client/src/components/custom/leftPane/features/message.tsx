'use client'

import { useDispatch } from "react-redux";
import ProfileCard from "../../../ui/customComponents/profileCard";
import profile1 from "../../../../../public/images/profile/1.png"
import profile2 from "../../../../../public/images/profile/2.png"
import UserContext from "@/lib/context/leftpane"
import { useState,useEffect, useContext } from "react";
import {RootState} from "@/lib/store/store"
import { useSelector } from "react-redux";
import { getFriendsData } from "@/lib/services/api";
import {User as Friend,Message,Room} from "@/lib/types/entities"
import {updateFriendData} from "@/lib/store/slice/friendData"
import { updateRoomData } from "@/lib/store/slice/roomData";
import { updateFriendList } from "@/lib/store/slice/lists/friendlist";
import { useSocket } from "@/lib/socket/socketProvider";
import { updateMessage } from "@/lib/store/slice/messages";
import { Loader } from "@/components/ui";
import { updateOnlineList,removeOnlineList } from "@/lib/store/slice/lists/online";

const profilepic = {
    backgroundImage: `url(${profile1.src})`, // .src gives the URL path of the image
    backgroundSize: 'cover', // adjust as needed
    backgroundPosition: 'center',
}
const profilepic2 = {
    backgroundImage: `url(${profile2.src})`, // .src gives the URL path of the image
    backgroundSize: 'cover', // adjust as needed
    backgroundPosition: 'center',
}
interface User {
  id: number;
  name: string;
  newMessageCount:number;
  lastmessage:string;
  profilePictureURL: string;
}
function Messages () {
    const [loading,setLoading]=useState(false);
    const [error,seterror]=useState(false);
    const dispatch=useDispatch();
    const [friendData,setFriendData]=useState<Friend[]>([]);
    const [roomData,setRoomData]=useState<Room[]>([]);
    const myId=useSelector((state:RootState)=>state.personalInformation).id
    
    const socket=useSocket();
    // const appContext = useContext(UserContext);
    
    // if (!appContext) {
    //   throw new Error('useContext must be used within an AppProvider');
    // }
    // const { users, setUser } = appContext;
    useEffect(() => {
      setLoading(true);
      // console.log("yupppp")
      if(friendData.length==0){
          getFriendsData(Number(myId)).then((data:any)=>{
              // console.log(data)
              if(data.status){
                if(data.friends){
                  data.friends.map((friend:Friend)=>{
                    dispatch(updateFriendList({id:friend.id}));
                    dispatch(updateFriendData(friend));
                  });
                  setFriendData((e)=>[...data.friends]);
                  // console.log(friendData);
                }
                if(data.rooms){
                  data.rooms.map((room:Room)=>{
                    // console.log(room)
                    dispatch(updateRoomData(room));
                  });
                  setRoomData((e)=>[...data.rooms]);
                }
              }
            }
          )
          .finally(()=>setLoading(false))
      }
    },[]);

    //message listening logic:
    useEffect(()=>{
      if(socket){
        if(!socket.hasListeners("user-joined")){
          socket.on("user-joined",(data:{id:string,message:string})=>{
            console.log(data);
            if(data.id && data.id!=myId)dispatch(updateOnlineList({id:Number(data.id)}));
          })
        }

        if (!socket.hasListeners("receive-message")) {

          socket.on("receive-message", (data:{id:number,sender:number,msg:string,time:string}) => {
            // console.log("New message received:", data);

            // Update your state or dispatch Redux actions
            const receivedMessage:Message={
              id:data.id,
              data:data.msg,
              sendByMe:false,
              time:data.time
            };
            // console.log(data.sender+" from receiver");
            dispatch(updateMessage({id:(Number(data.sender)),message:receivedMessage}));
          });
      }
      if(!socket.hasListeners("user-disconnected")){
        socket.on("user-disconnected",(data:{id:string,message:string})=>{
          console.log(data);
          if(data && data.id){
            dispatch(removeOnlineList({id:Number(data.id)}))
          }  
        })
      }
    }

      return () => {
        socket.off("message"); // Cleanup event listener on unmount
      };
    },[])


    return (
            <div style={{overflow: "auto", scrollbarWidth: "none"}} className="bg-[#1c1c24] w-full col-span-7 flex flex-col items-center overflow-y-scroll overflow-x-hidden">
            <div className=" flex items-center text-sm mt-5 w-5/6  bg-zinc-800 m-2 rounded-full">
              <input type="text" className="focus:outline-none p-3 ml-5 bg-transparent text-slate-300 font-extralight" placeholder="Enter the username..." />
              {/* <div className=""></div> */}
            </div>
            <p className="self-start text-2xl text-white ml-5 mt-2">Chats</p>
            {loading?<div className="h-10 w-10 mt-10">
                      <Loader />
              </div>:
              friendData?.map((user:Friend)=>{
                return(
                  <ProfileCard key={user.id} id={user.id} username={user.username} count={0} message={"hi"} profilepic={profilepic2} />
                )
            })}
            
            {/* <ProfileCard key={1} id={100} profilepic={profilepic} username="Selena" message="What's up, how's goin" count={10} />
            <ProfileCard key={2} id={101} profilepic={profilepic} username={data.username} message="..." count={10}  /> */}
            {/* <ProfileCard key={2} profilepic={profilepic} username={x} message="..." count={10}  /> */}
          </div>
      
    );
}

export default Messages;


