import {LockIcon, MailIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { api_url } from '../api.js';

const Login = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [loading,setLoading] = useState(false)
 const Submit = async (event)=> {
    event.preventDefault();
    setLoading(true)
    await axios.post(`${api_url}users/login`,{
      email:email,password:password
    }).then((res)=> {
      console.log(res);
      if(res.data.message == "No User With This Email"){
        alert("No User With This email")
      }else if(res.data.message == "Wrong Password"){
         alert("Wrong Password");
      }else {
        window.localStorage.setItem("id",res.data.user._id);
        window.localStorage.setItem("email",res.data.user.email);
        navigate("/")
      }

    }).catch((e)=> {
      console.log('err' , e);
      console.log(e.message)
    }).finally(()=> {
      setLoading(false)
    })
  }
  return (
    <form onSubmit={Submit}>
    <div className='w-screen h-screen bg-green-400 flex items-center justify-center'>
      <div className='min-w-[300px] min-h-[300px] bg-white p-12 rounded-2xl'>
        <div className='w-full h-full flex items-center justify-center flex-col'>
            <h1 className='text-gray-900 text-3xl font-medium'>Login</h1>
            <span className='text-gray-500 text-sm mt-2'>Find Your Account</span>
        </div>
        <div className='flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2'>
          <MailIcon size={20} className='text-gray-500'/>
          <input 
          onChange={(e)=>{setEmail(e.target.value)}}
          type="email" placeholder='email id'  className='outline-none'/>
          </div>
        <div className='flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2'>
          <LockIcon size={20} className='text-gray-500'/>
          <input 
          onChange={(e)=>{setPassword(e.target.value)}}
          type="password" placeholder='Password'  className='outline-none'/>
          </div>
        <p className='text-gray-500 text-sm mt-2'>New Here ? <Link className='text-green-400 underline' to={'/signup'}>Create New Account</Link></p>
        <button type='submit' className='w-full  mt-5 bg-green-400 py-[11px] px-[11px] rounded-full text-white cursor-pointer'>{loading ? "Finding Your Account" : "Find Account"}</button>
          </div>
          </div>
    </form>
  );
};

export default Login;