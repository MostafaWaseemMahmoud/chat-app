import { PlusCircleIcon, SearchIcon, XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { api_url } from "../api.js";
import axios from "axios";

const LeftBar = ({ onChatSelected }) => {
  const [chats, setChats] = useState([]);
  const [chatsData, setChatsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddChat, setShowAddChat] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
  const id = localStorage.getItem("id");

  if (!id) return;

  const res = await axios.get(`${api_url}rooms/allrooms/${id}`);

  if (!res.data) return;

  const rooms = res.data;
  const chatsData = [];

  setChats(rooms)

  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];

    if (!room.otherUserId) {
      console.log("No Other User Id In This Room", room);
      continue;
    }

    await axios.get(`${api_url}users/find/${room.otherUserId}`).then((res)=> {
      const chat = {
        user:res.data.user,
        room: rooms[i]
      }
      console.log(chat);
      chatsData.push(chat)
    })

  }

  setChats(chatsData);

} catch (e) {
        console.log("The Error is:", e);
      }
    };

    fetchRooms();
  }, []);

const filteredChats = searchTerm.trim() === ""
  ? chats
  : chats.filter(chat => 
      chat.user.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const addChat = async (e) => {
    e.preventDefault();

    console.log("adding Chat With This Email", userEmail);

    setIsLoading(true);

    try {
      const res = await axios.get(`${api_url}users/findbyemail/${userEmail}`);

      if (res.data.message === "No User With This Email") {
        setIsLoading(false);
        return alert("No User With This Email");
      }

      console.log(res);

      const friendId = res.data.Account._id;

      await addRoom(friendId,friendId);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

const addRoom = async (friendId) => {
  try {
    const roomExists = chats.some(
      (chat) => chat.user && chat.user._id === friendId
    );

    if (roomExists) return alert("User Already Exists In Your Chats");

    const res = await axios.post(`${api_url}rooms/createroom`, {
      userId: localStorage.getItem("id"),
      friendId: friendId,
    });

    console.log(res);
  } catch (e) {
    console.log(e);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div
      className="
        bg-white min-h-screen border-r border-gray-300 relative
        w-full md:w-[40%] lg:w-[30%]
        px-3 sm:px-5
      "
    >
      {/* Top Bar */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center bg-[#f7f3f3] px-3 py-2 rounded-full flex-1">
          <SearchIcon size={18} />
          <input
            type="search"
            className="bg-transparent outline-none pl-2 w-full text-sm"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <PlusCircleIcon
          size={28}
          className="text-green-600 cursor-pointer"
          onClick={() => setShowAddChat(true)}
        />
      </div>

      {/* Chats */}
      <div className="space-y-1">
        {filteredChats.length ? (
          filteredChats.map((userchat, index) => (
            <div
              key={index}
              onClick={() => onChatSelected(userchat)}
              className="cursor-pointer hover:bg-gray-100 rounded-lg"
            >
              <div className="flex items-center p-2 sm:p-3">
                <img
                  src={userchat.user?.avatar}
                  alt="profile"
                  className="rounded-full border h-10 w-10 sm:h-12 sm:w-12 mr-3"
                />
                <div className="min-w-0">
                  <h1 className="font-medium text-sm sm:text-base truncate">
                    {userchat.user?.username}
                  </h1>

                  <span className="text-xs">
                    {userchat.room?.NewMessages.length > 0 ? (
                      <span className="text-green-500">New messages</span>
                    ) : (
                      <span className="text-gray-400">No news</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 mt-6 text-sm">
            No results found
          </p>
        )}
      </div>

      {/* Add Chat Modal */}
      {showAddChat && (
        <form
          onSubmit={addChat}
          className="absolute inset-0 bg-black/40 flex items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded-lg w-[90%] sm:w-[350px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">New Chat</h2>

              <XIcon
                className="cursor-pointer"
                onClick={() => setShowAddChat(false)}
              />
            </div>

            <input
              type="text"
              placeholder="User email"
              className="w-full border px-3 py-2 rounded-md outline-none mb-4 text-sm"
              onChange={(e) => setUserEmail(e.target.value)}
            />

            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
            >
              {isLoading ? "Adding Chat ....." : "Add Chat"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LeftBar;