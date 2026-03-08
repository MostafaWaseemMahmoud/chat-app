import { Send } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import './Right.css'
import axios from 'axios'
import { api_url } from '../api'

const RightBar = ({ selectedChat }) => {
  const [newmessageValue, SetNewmessageValue] = useState('')
  const [Room, setRoom] = useState(null)
  const messagesEndRef = useRef(null)
  
 useEffect(()=>{
     if (selectedChat) {
      setRoom(selectedChat.room)
      makeAsRead(selectedChat.room);
      }
 },[selectedChat])

 const makeAsRead = async(room)=> {
    const res = await axios.post(
          `${api_url}rooms/makeasread/${room.RoomId}/${window.localStorage.getItem("id")}`,
        );
        console.log(res)
 }

  useEffect(() => {
    if (!Room) return

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`${api_url}rooms/allrooms/${window.localStorage.getItem("id")}`)

        const updatedRoom = res.data.find(r => r.RoomId === Room.RoomId)
        if (updatedRoom) {
          setRoom(updatedRoom)
        }
      } catch (err) {
        console.log(err)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [Room?.RoomId])

  const sendMessage = async () => {
    if (!newmessageValue.trim()) return

    const data = {
      message: newmessageValue,
      email: window.localStorage.getItem("email"),
      date: new Date().toISOString()
    }

    SetNewmessageValue("")

    try {
      const res = await axios.post(
        `${api_url}rooms/sendmessage/${Room.RoomId}/${window.localStorage.getItem("id")}`,
        data
      )

      if (res.data.allRooms && res.data.allRooms.length > 0) {
        setRoom(res.data.allRooms[0])
      }
    } catch (err) {
      console.log(err)
    }
  }

  const allMessages = [
    ...(Room?.Messages || []),
    ...(Room?.NewMessages || [])
  ]
    .filter(msg => msg.date) 
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [allMessages])

  if (!selectedChat) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[url('/chatbg.png')] bg-cover">
        <h1 className="text-xl sm:text-2xl text-black">No Chat Selected</h1>
        <span className="text-sm sm:text-base text-black">Select Chat To Open Here..</span>
      </div>
    )
  }

  return (
    <div className="w-full lg:w-[70%] min-h-screen bg-[url('/chatbg.png')] bg-cover relative flex flex-col">

      <div className="bg-white flex items-center justify-between px-4 sm:px-6 py-3 border-b">
        <div className="flex items-center">
          <img src={selectedChat.user.avatar} className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border mr-3" />
          <h1 className="font-semibold text-sm sm:text-base">{selectedChat.user.username}</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-scroll hide-scrollbar px-3 sm:px-6 lg:px-10 py-4 space-y-4">
        {allMessages.map((msg, index) => {
          const isMe = msg.sender_email === window.localStorage.getItem("email")
          return (
            <div key={index} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div className={`px-4 py-2 rounded-xl text-sm max-w-[85%] sm:max-w-[70%] lg:max-w-[60%] ${isMe ? "bg-green-500 text-white rounded-br-none" : "bg-white text-black rounded-bl-none"}`}>
                {msg.message}
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="w-full px-3 sm:px-6 pb-4 flex justify-center">
        <div className="bg-white w-full sm:w-[80%] lg:w-[50%] py-3 px-4 flex items-center gap-3 rounded-2xl shadow">
          <input
            type="text"
            placeholder="Message..."
            className="flex-1 outline-none text-sm"
            value={newmessageValue}
            onChange={(e) => SetNewmessageValue(e.target.value)}
          />
          <Send size={18} className="text-[#8BABD8] cursor-pointer" onClick={sendMessage} />
        </div>
      </div>

    </div>
  )
}

export default RightBar
