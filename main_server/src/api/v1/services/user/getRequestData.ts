import { userDBManager } from "../../controllers"
import { getUserById } from "../../controllers"
import { getRequestRequestingList } from "../friendlogic"
import { ResUser, User } from "../../interfaces/types"
import { DecryptData } from "../../helpers"

const getRequestData=async(myId:number)=>{
    const data:ResUser[]=[]
    const fetchData= new Promise(async(resolve,reject)=>{
        try{
            const list=await getRequestRequestingList(myId);
            const requestList=list.request;
            const handler=new userDBManager(new getUserById());
            if(requestList.length===0)resolve(data);
                requestList.map(async(userId,ind)=>{
                    //@ts-ignore
                    const temp:User=await handler.doAction(userId);
                    // console.log(temp);
                    if(temp && temp.id && temp.id!=0){
                        console.log(temp.Bio);
                        console.log(DecryptData({Bio:temp.Bio || ""}).Bio);
                        const userData:ResUser={
                            id:temp.id,
                            Bio:temp.Bio?DecryptData({Bio:temp.Bio || ""}).Bio.toString():"",
                            name:DecryptData({name:temp.name || ""}).name.toString(),
                            profilePictureURL:temp.profilePictureURL,
                            username:temp.username
                        }
                        data.push(userData);
                        if(ind==requestList.length-1)resolve(data);
                    }else{
                        if(ind==requestList.length-1)resolve(data);
                    }
                    
                })
        }
        catch(e){
            console.log(e);
            resolve(data)
        }
    }) 
    return fetchData;
}

export default getRequestData;