'use client'
import ProfileCard from "../../profileCard";
import profile1 from "../../../../../public/images/profile/1.png"
import profile2 from "../../../../../public/images/profile/2.png"
import UserContext from "@/lib/context/leftpane"
import { useContext } from "react";


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
    const appContext = useContext(UserContext);
    if (!appContext) {
      throw new Error('useContext must be used within an AppProvider');
    }
    const { users, setUser } = appContext;
    
    return (
            <div style={{overflow: "auto", scrollbarWidth: "none"}} className="bg-[#1c1c24] w-full col-span-7 flex flex-col items-center overflow-y-scroll overflow-x-hidden">
            <div className=" flex items-center text-sm mt-5 w-5/6  bg-zinc-800 m-2 rounded-full">
              <input type="text" className="focus:outline-none p-3 ml-5 bg-transparent text-slate-300 font-extralight" placeholder="Enter the username..." />
              {/* <div className=""></div> */}
            </div>
            <p className="self-start text-2xl text-white ml-5 mt-2">Chats</p>
            {users?.map((user:User)=>{
              return(
                <ProfileCard key={user.id} username={user.name} count={user.newMessageCount} message={user.lastmessage} profilepic={profilepic2} />
              )
            })}
            
            <ProfileCard key={1} profilepic={profilepic} username="Selena" message="What's up, how's goin" count={10} />
          </div>
      
    );
}

export default Messages;