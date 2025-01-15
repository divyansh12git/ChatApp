
import profile1 from "@/../public/images/profile/2.png";
import Accept from "@/../public/icons/accept.png"
import Decline from "@/../public/icons/decline.png"
import Image from "next/image";
const RequestUser=()=>{
    const profilepicStyle = {
        backgroundImage:`url(${profile1.src})` , 
         // .src gives the URL path of the image
        backgroundSize: 'cover', // adjust as needed
        backgroundPosition: 'center',
      }
      const username="Divyansh Gupta"

    return(
        <div className="hover:bg-[#54545427]  flex w-full flex-col" >
              <div  className="flex flex-row h-24 " >
                <div className=" w-28 flex justify-center items-center ">
                  <div style={profilepicStyle} className="bg-white w-[3.5rem] h-[3.5rem] rounded-full border border-white">.</div>
                </div>
                <div className=" w-full flex flex-row justify-start hover:cursor-default">
                    <div className="px-2 overflow-hidden truncate h-full flex flex-col justify-center w-[11.5rem]">
                      <p className="font-medium text-lg text-white -mb-1">Divyansh Gupta</p>
                      <p className=" font-extralight text-sm text-zinc-400 ">I am vengence</p>
                    </div>
                    <div className="flex justify-center h-24 items-center gap-3 w-[5rem] ">
                      <div className="hover:bg-[#4092503e]  h-auto w-1/2 rounded-full flex items center hover:cursor-pointer">
                        <Image style={{filter: "invert(30%) sepia(100%) saturate(1000%) hue-rotate(90deg) brightness(150%) contrast(100%)"}} src={Accept} alt='accept' />
                      </div>
                      <div  className="hover:bg-[#f7f7f73d] h-auto w-1/2 flex rounded-full items-center hover:cursor-pointer">
                        <Image src={Decline} alt='accept' style={{filter: "invert(100%) brightness(70%)"}} />
                      </div>

                    </div>

                </div>
                
              </div>
              <div className="h-[1px] w-[93%] bg-white self-center"></div>
        </div>
    );


}
export default RequestUser;