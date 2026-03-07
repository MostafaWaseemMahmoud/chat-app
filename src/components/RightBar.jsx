import { Send } from 'lucide-react'
import React from 'react'
import './Right.css'

const RightBar = ({ selectedChat }) => {
  
  if (!selectedChat) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[url('/chatbg.png')] bg-cover">
        <h1 className="text-xl sm:text-2xl text-black">No Chat Selected</h1>
        <span className="text-sm sm:text-base text-black">
          Select Chat To Open Here..
        </span>
      </div>
    )
  }else {
    var Room = selectedChat.room
  }

  return (
    <div className="w-full lg:w-[70%] min-h-screen bg-[url('/chatbg.png')] bg-cover relative flex flex-col">

      {/* Header */}
      <div className="bg-white flex items-center justify-between px-4 sm:px-6 py-3 border-b">
        <div className="flex items-center">
          <img
            src={selectedChat.user.avatar}
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border mr-3"
          />
          <h1 className="font-semibold text-sm sm:text-base">
            {selectedChat.user.username}
          </h1>
        </div>

        <button className="bg-red-600 text-white text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-xl">
          Delete
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-scroll hide-scrollbar px-3 sm:px-6 lg:px-10 py-4 space-y-4">

        {[...Room.Messages, ...Room.NewMessages].map((msg, index) => {
          const isMe = msg.sender_email == window.localStorage.getItem("email") ? true : false

          return (
            <div
              key={index}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`
                  px-4 py-2 rounded-xl text-sm
                  max-w-[85%] sm:max-w-[70%] lg:max-w-[60%]
                  ${isMe
                    ? "bg-green-500 text-white rounded-br-none"
                    : "bg-white text-black rounded-bl-none"
                  }
                `}
              >
                {msg.message}
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <div className="w-full px-3 sm:px-6 pb-4 flex justify-center">
        <div className="bg-white w-full sm:w-[80%] lg:w-[50%] py-3 px-4 flex items-center gap-3 rounded-2xl shadow">
          <input
            type="text"
            placeholder="Message..."
            className="flex-1 outline-none text-sm"
          />
          <Send size={18} className="text-[#8BABD8] cursor-pointer" />
        </div>
      </div>
    </div>
  )
}

export default RightBar
