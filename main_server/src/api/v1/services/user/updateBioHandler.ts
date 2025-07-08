import { updateValues } from "../../controllers";
import { EncrptData,DecryptData } from "../../helpers";
import {User} from "../../interfaces/types"



const updateHandler=async(username:string,value:string,updateId:number):Promise<string>=>{
    let update=`name`;
    if(updateId==1){
        update=`Bio`;
    }else if(updateId==2){
        update=`profilePictureURL`;
    }else{
        update=`name`;
    }
    const updatehandler=new updateValues();
    
    try{
        const encValue=EncrptData({value:value});
        // console.log(encBio.bio);
        // @ts-ignore
        const updated:string=await updatehandler.execute(username,encValue.value,updateId);
        // console.log(updated);
        // decrypting the data;
        const final=DecryptData({update:updated}).update;
        // console.log(final);
        return final.toString();
        // return updatedBio
    }catch(e){
        console.log(e);
    }

    return "";
}
export default updateHandler;