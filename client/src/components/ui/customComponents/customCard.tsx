import SearchUserCard from "./searchUserCard";
import RequestUserCard from "./requestUserCard"
interface props{
    userName:string;
    Bio:string;
    profilePic:string;
    userId:number;
    status:string;
  }
const CustomCard=({userName,Bio,profilePic,userId,status}:props)=>{
    // console.log(userName+ " "+status);
    if(status==="request"){
        return <RequestUserCard  key={userId} userId={userId}  Bio={Bio} profilePic={profilePic} username={userName} />
    }else{
        return <SearchUserCard key={userId} status={status} userId={userId} Bio={Bio} userName={userName} profilePic={profilePic} />
    }
    
}
export default CustomCard;