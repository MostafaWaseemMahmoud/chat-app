import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftBar from '../components/LeftBar';
import RightBar from '../components/RightBar';

const Home = () => {
    const [selectedChat,setSelectedChat] = useState(null)
    const navigate = useNavigate()
      const IsId = window.localStorage.getItem("id")
    useEffect(()=>{
        if(!IsId) {
            navigate("/signup")
        }
    },[]);
    return(
        <div className='flex max-w-screen min-w-screen'>
            <LeftBar onChatSelected={setSelectedChat}/>
            <RightBar selectedChat={selectedChat}/>
            </div>
    )
};

export default Home;