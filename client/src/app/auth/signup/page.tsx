'use client'
import React, { useState,useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Inputfield from "../components/inputfield";
import Link from "next/link";
import { makeSignUp } from "@/lib/auth";
  
type formdata={
    name:string,
    username:string,
    password:string,
    confirmPassword:string
}
const Signup=()=>{
    const router=useRouter();

    const [data,setdata]=useState({
        name:"",
        username:"",
        password:"",
        confirmPassword:"",
    });
    const dataRef=({
        nameRef:useRef(null),
        usernameRef:useRef(null),
        passwordRef:useRef(null),
        confirmPasswordRef:useRef(null),
    })
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target;
        for(let key in dataRef){
            //@ts-ignore
            if(dataRef[key].current){
                //@ts-ignore
                dataRef[key].current.innerHTML="";
            }
        }
        console.log(e.target.name);
        setdata({
            ...data,
            [name]:value
        })
    }
    const handleSubmit=async(e:any)=>{
        e.preventDefault();
        let errorvalue={
            nameError:"",
            usernameError:"",
            passwordError:"",
            confirmPasswordError:""
        }
        const formdata:formdata={...data};
        
        //data validation
        if(formdata.name==="" )errorvalue.nameError="*name field is required";
        if(formdata.username.includes(' ') || formdata.username.length===0 )
            errorvalue.usernameError="*enter valid username";
        if(formdata.password==="")errorvalue.passwordError="*password field is required";
        if(formdata.password.length>0 && formdata.password.length<8)errorvalue.passwordError="*password length should be greater than 8";
        if(formdata.password!==formdata.confirmPassword)errorvalue.confirmPasswordError="*passwords do not match";
        
        //@ts-ignore
        if(dataRef.nameRef.current)dataRef.nameRef.current.innerHTML=errorvalue.nameError;
        //@ts-ignore
        if(dataRef.usernameRef.current)dataRef.usernameRef.current.innerHTML=errorvalue.usernameError;
        //@ts-ignore
        if(dataRef.passwordRef.current)dataRef.passwordRef.current.innerHTML=errorvalue.passwordError;
        //@ts-ignore
        if(dataRef.confirmPasswordRef.current)dataRef.confirmPasswordRef.current.innerHTML=errorvalue.confirmPasswordError;
        if(errorvalue.nameError || errorvalue.usernameError || errorvalue.passwordError || errorvalue.confirmPasswordError){
            return;}
        
            setdata({
                name:"",
                username:"",
                password:"",
                confirmPassword:""
            });
            const dataToSend={
                name:formdata.name,
                username:formdata.username,
                password:formdata.password
            }
        const response=await makeSignUp(dataToSend);
        console.log(response);
        if(response.status){
            router.push("/");
        }
    }

    return(
        <form action="" className="flex  flex-col items-center gap-5">
            <div className="text-2xl">Sign Up</div>
            <Inputfield errorRef={dataRef.nameRef} name="name"  value={data.name} handleChange={handleChange} key="1" />
            <Inputfield errorRef={dataRef.usernameRef} name="username"  value={data.username} handleChange={handleChange} key="2" />
            <Inputfield errorRef={dataRef.passwordRef} name="password"  value={data.password} handleChange={handleChange} key="3" />
            <Inputfield errorRef={dataRef.confirmPasswordRef} name="confirmPassword"  value={data.confirmPassword} handleChange={handleChange} key="4" />
            <Button className="hover:bg-zinc-800  bg-zinc-900 rounded-full h-12 w-full px-5 text-white text-lg font-light" onClick={(e)=>handleSubmit(e)}> Sign Up</Button>
            <Link href="/auth"  className="self-end hover:text-gray-500  underline font-light text-xl text-white text-light">Login</Link>
            
        </form>
    );
}
export default Signup;