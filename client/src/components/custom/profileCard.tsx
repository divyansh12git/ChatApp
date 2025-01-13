import Link from "next/link";
import profile1 from "../../../public/images/profile/2.png"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { Room } from "@/lib/types/entities";
import { updateCurrentFriend } from "@/lib/store/slice/currentFriend";
interface props{
    id:number,
    profilepic:any,
    username:string,
    message:string,
    count:number
}
function ProfileCard({id,profilepic,username,message,count}:props) {
    const profilepicStyle = {
      backgroundImage:`url(${profile1.src})` || `url(${profilepic.src})`, 
       // .src gives the URL path of the image
      backgroundSize: 'cover', // adjust as needed
      backgroundPosition: 'center',
    }

    const dispatch=useDispatch();
    const roomData:Room[]=useSelector((state:RootState)=>state.roomData);
    const roomId=roomData.filter((e)=>e.friendID===id);
    function changeCurrentFriend(){
      // console.log(data);
      // console.log("HIIIIII")
      dispatch(updateCurrentFriend(
        {
          id:id,
          username:username,
          roomId:roomId,
          profilePictureURL:profilepic
        }
      ))
    }

    return (
        <div className="hover:bg-[#54545427] flex w-full flex-col" onClick={()=>{changeCurrentFriend()}}>
              <div  className="flex flex-row h-24 " >
                <div className=" w-28 flex justify-center items-center ">
                  <div style={profilepicStyle} className="bg-white w-[3.5rem] h-[3.5rem] rounded-full border border-white">.</div>
                </div>
                <div className=" w-full flex flex-row justify-start ">
                    <div className=" overflow-hidden h-full flex flex-col justify-center w-full">
                      <p className="font-medium text-lg text-white -mb-1">{username} </p>
                      <p className=" font-extralight text-sm text-zinc-400 ">{message}</p>
                    </div>
                    <div className="flex justify-center items-center w-10  ">
                      <div className="w-6 h-6 text-sm mr-2 bg-red-500 rounded-full text-white flex justify-center items-center">{count}</div>
                    </div>

                </div>
                
              </div>
              <div className="h-[1px] w-[93%] bg-white self-center"></div>
              </div>
    )
}
export default ProfileCard;