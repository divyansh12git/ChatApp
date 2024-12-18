'use server'
 
import { redirect } from 'next/navigation'

export default async function Home() {
  // redirect(`/chat`);
  const token=localStorage.getItem('token');
  
  if(token){
    
    return redirect(`/chat`);
  }

  return redirect(`/auth/login`);
}
