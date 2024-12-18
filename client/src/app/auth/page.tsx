'use client'
import React, { useState,useEffect,useRef } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import Inputfield from "./components/inputfield";
import Link from 'next/link'
import {useRouter} from "next/navigation";
import {useAuth} from '@/hooks';
import { makeLogin } from '@/lib/auth';
import toast, { Toaster } from 'react-hot-toast';
import { Loader } from "@/components/ui";

interface formdata{
    username:string,
    password:string,
}


const Login=()=>{
    const router=useRouter();
    const [formData,setFormData]=useState({
        username:"",
        password:"",
    })
    const {auth,loading,error}=useAuth(makeLogin);

    const usernameRef=useRef(null);
    const passwordRef=useRef(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if(usernameRef.current){
            //@ts-ignore
            usernameRef.current.innerHTML="";
        }
        if(passwordRef.current){
            //@ts-ignore
            passwordRef.current.innerHTML="";
        }

        setFormData({
          ...formData,
          [name]: value,
        });
    };
    const handleSubmit=async(e:any)=>{
        e.preventDefault();
        const data:formdata={...formData};
        let usernameError="";
        let passwordError="";
        if(data.username===""){
            usernameError="*username field is required";
        }
        if(data.username.includes(" ")){
            usernameError="*username field cannot contain spaces";
        }
        if(usernameError.length && usernameRef.current){
            //@ts-ignore
            usernameRef.current.innerHTML=usernameError;
        }
        if(data.password===""){
            passwordError="*password field is required";
        }
        if(data.password.length<8 && data.password.length>0){
            passwordError="*password length should be greater than 8";
        }
        if(passwordError.length && passwordRef.current){
            //@ts-ignore
            passwordRef.current.innerHTML=passwordError;
        }
        if(usernameError.length || passwordError.length)return;
        console.log(data);
        setFormData({
            username:"",
            password:""
        });
        const dataToSend={
            username:data.username,
            password:data.password
        }

        const response=await auth(dataToSend);

        if(response.status){
            toast.success(response.msg);

            //setting token to local storage:
            localStorage.setItem('token', response.token);

            router.push("/");
        }else{
            toast.error(response.msg || "Something went Wrong");
        }
        // console.log(response);
    }
    return(
        <>
            <Toaster />
            <form action="" className="flex  flex-col items-center gap-5">
                <div className="text-2xl"> Login</div>
                <Inputfield key={"1"} name="username" errorRef={usernameRef} handleChange={handleChange} value={formData.username} />
                <Inputfield key={"2"} name="password" errorRef={passwordRef} handleChange={handleChange} value={formData.password} />
                <div className="hover:bg-zinc-800  bg-zinc-900 flex justify-center rounded-full h-12 w-full px-5 text-white text-lg font-light" > 
                    {loading?<p className=" flex justify-center items-center"><Loader /></p>:<button className="w-full" onClick={(e)=>handleSubmit(e)}>Login</button>}
                </div>
                <Link href="/auth/signup"  className="self-end hover:text-gray-500  underline font-light text-xl text-white text-light">Sign up</Link>

            </form>
        </>
    );
}
export default Login;