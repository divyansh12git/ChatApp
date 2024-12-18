'use client'
import { useState, useEffect } from 'react';

interface LoginData{
    username:string,
    password:string,
}
interface SignUpData{
  name:string,
  username:string,
  password:string,
  confirmPassword:string
}
type formData=LoginData | SignUpData;
const AuthHook = (action:Function) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const auth=async(data:formData)=>{
    setLoading(true);
    setError(null);
    try{
        const response=await action(data);
        console.log(response);
        return response;
    }catch(e){
        console.log(e);
    }finally{
        setLoading(false);
    }
  }

  

  return { auth, loading, error };
};

export default AuthHook;