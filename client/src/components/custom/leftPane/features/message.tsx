import ProfileCard from "../../profileCard";
import profile1 from "../../../../../public/images/profile/1.png"
import profile2 from "../../../../../public/images/profile/2.png"
import Link from "next/link";

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


function Messages () {
    return (
            <div style={{overflow: "auto", scrollbarWidth: "none"}} className="bg-[#1c1c24] w-full col-span-7 flex flex-col items-center overflow-y-scroll overflow-x-hidden">
            
            <div className="flex items-center text-sm h-10 w-5/6 mt-5 bg-zinc-800 m-2 rounded-full">
              <div className="ml-5 text-slate-300 font-extralight">Enter the username...</div>
              <div className=""></div>
            </div>
            <p className="self-start text-2xl text-white ml-5 mt-2">Chats</p>
            <ProfileCard key={1} profilepic={profilepic} username="Selena" message="What's up, how's goin" count={10} />
            <ProfileCard key={1} profilepic={profilepic2} username="Isha" message="hi there" count={1} />
            
            {/* <ProfileCard key={1} profilepic={profilepic} username="Selena" message="What's up, how's goin" count={10} /> */}
          </div>

    );
}

export default Messages;