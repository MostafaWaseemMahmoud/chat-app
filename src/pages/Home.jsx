import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";

const Home = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("id");

    if (!id) {
      navigate("/signup");
    }
  }, [navigate]);

  return (
    <div className="flex max-w-screen min-w-screen">
      <LeftBar onChatSelected={setSelectedChat} />
      <RightBar selectedChat={selectedChat} />
    </div>
  );
};

export default Home;