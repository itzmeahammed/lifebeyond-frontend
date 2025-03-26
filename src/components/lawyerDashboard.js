import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Chat from "./chat";
import "../styles/components/doctordashboard.scss";
import LawyerChat from "./lawyerChat";
import VoiceRecorder from "./voiceAssistant";
import { useLocation, useNavigate } from "react-router-dom";

const LawyerDashboard = ({ currentPage }) => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const path = useLocation();

  const navigate = useNavigate();
  const [isrecordStart, setisrecordStart] = useState(false);

  const token = Cookies.get("token");
  const role = Cookies.get("role");

  useEffect(() => {
    if (!token) navigate("/");

    if (role === "user") navigate("/dashboard");
    if (role === "admin") navigate("/admin");

    if (role === "doctor") navigate("/doctor");
  }, [role, token]);

  const fetchChats = async () => {
    const token = Cookies.get("token");
    try {
      const response = await axios.get(
        "http://localhost:6777/api/chat/getChatsByUser",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setChats(response.data); // Save chats to the state if any
    } catch (error) {
      console.error("Error fetching chats", error);
    }
  };

  useEffect(() => {
    if (currentPage === "chat") {
      fetchChats();
    }
  }, [currentPage]);

  const handleCloseChat = () => {
    setSelectedChat(null); // Set the selected chat to null to close the chat
  };

  return currentPage === "dashboard" ? (
    <>
      <div className='dashboard-container d-flex-full d-flex-col'>
        <div className='dashboard-inner-container  d-flex-col gap-16 d-flex-jsc'>
          <p>Your past does not define you—your future is yours to build.</p>
          <div className='dasboard-btn-container '>
            <button className='p-16 cursor-ptr'>Get Started</button>
          </div>
          <div
            className='voice-assistent-gif-container d-flex-col d-flex-full cursor-ptr'
            onClick={() => setisrecordStart(true)}
          >
            <img
              src={
                "https://mir-s3-cdn-cf.behance.net/project_modules/hd/f4020f114494633.603cbcc781296.gif"
              }
              style={{
                borderRadius: "100px",
                objectFit: "cover",
              }}
              alt=''
              width={70}
              height={70}
            />
            <span className='cursor-ptr'>Ask me </span>
          </div>
        </div>
      </div>
      <VoiceRecorder
        isrecordStart={isrecordStart}
        setisrecordStart={setisrecordStart}
      />
    </>
  ) : currentPage === "chat" ? (
    <div className='chat-doctor-container'>
      <div className='chat-doctor-list'>
        <h2>Chats</h2>
        {chats.length === 0 ? (
          <p>No chats available</p>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              className='chat-doctor-item'
              onClick={() => setSelectedChat({ ...chat, role: "lawyer" })} // Set role as "lawyer"
            >
              <p>Chat with {chat.person1.username}</p>{" "}
              {/* Display username of the other person */}
            </div>
          ))
        )}
      </div>

      {/* Render the selected chat with messages */}
      {selectedChat && (
        <LawyerChat
          lawyer={selectedChat.person2} // Pass the selected lawyer
          chatId={selectedChat.id} // Pass chatId
          role={selectedChat.role} // Pass role
          onClose={handleCloseChat}
        />
      )}
    </div>
  ) : null;
};

export default LawyerDashboard;
