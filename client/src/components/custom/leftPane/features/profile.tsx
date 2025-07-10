"use client"; // if using Next.js App Router
import {User} from "../../../../lib/types/entities"
import { useState } from "react";
import profile2 from "../../../../../public/images/profile/2.png"
import { getUserData, updateProfile } from "@/lib/services/api";
import { useSelector,useDispatch } from "react-redux";
import { RootState  } from "@/lib/store/store";
import { updatePersonalInformation } from "@/lib/store/slice/personalInformation";
import getProfilePic from "@/lib/utils/getprofielpic";
import toast, { Toaster } from 'react-hot-toast';
function Profile() {

    const myData=useSelector((state:RootState)=>state.personalInformation);
    const [name, setName] = useState(myData.name);
    const [bio, setBio] = useState(myData.Bio);
    // console.log(myData.Bio);
	const profilePicgen=getProfilePic(myData.username);
    const [isBioUpdated, setIsBioUpdated] = useState(false);
    const [isNameUpdated, setIsNameUpdated] = useState(false);

    const dispatch=useDispatch();
    const handleUpdate = async() => {
        if(!isBioUpdated && !isNameUpdated)return;
        // Here you would usually send the updated name and bio to an API
        let updateId=0;
        if(isNameUpdated){
            updateId+=3;
        } 
        if(isBioUpdated){
            updateId+=1;
        }
        console.log(updateId);
        try {
        const success = await updateProfile({ username: myData.username, name, bio, updateId });

        if (success) {
            const updatedUser = await getUserData(myData.username);
            console.log(updatedUser);
            dispatch(updatePersonalInformation(updatedUser));
			toast.success("Profile updated!",{duration:2000});
            // alert();
        } else {
			toast.error("Failed to update profile.",{duration:2000});
        }
        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Failed to update profile.",{duration:2000});
        }
        setIsNameUpdated(false);
        setIsBioUpdated(false);
    };

return (
	<>
	<Toaster />
    <div className="bg-[#1c1c24] w-full max-w-xl  col-span-7 flex flex-col items-center pt-20 px-[12%]">
      <div className="flex items-center justify-center space-x-4 mb-6 w-full">
        <img
          src={`/images/profile/${profilePicgen}.jpg`}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-200">{myData.username}</h2>
          <p className="text-sm text-gray-300">username</p>
        </div>
      </div>


      <div className="space-y-4 w-full">
        <div className="w-full">
          <label className="block text-gray-500 font-medium mb-1">{myData.name}</label>
          <input
            type="text"
            className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => {setName(e.target.value); setIsNameUpdated(true);}}
          />
        </div>

        <div className="w-full">
          <label className="block text-gray-500 font-medium mb-1">Bio</label>
          <textarea
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={bio}
            onChange={(e) => {setBio(e.target.value); setIsBioUpdated(true);}}
          ></textarea>
        </div>

        <button
            onClick={handleUpdate}
            className={`${
                isNameUpdated || isBioUpdated ? "bg-slate-500" : "bg-slate-800"
            } text-white font-semibold px-6 py-2 rounded-lg transition`}
            >
            Update
        </button>
      </div>
    </div>
	</>
  );
}

export default Profile;
