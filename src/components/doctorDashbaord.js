import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Chat from "./chat";
import "../styles/components/doctordashboard.scss";
import { useNavigate } from "react-router-dom";
import VoiceRecorder from "./voiceAssistant";

const DoctorDashboard = ({ currentPage }) => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isrecordStart, setisrecordStart] = useState(false);

  const role = Cookies.get("role");
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const fetchChats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:6777/api/chat/getChatsByUser",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setChats(response.data);
    } catch (error) {
      console.error("Error fetching chats", error);
    }
  };

  useEffect(() => {
    if (currentPage === "chat") {
      fetchChats();
    }
  }, [currentPage]);
  useEffect(() => {
    if (!token) navigate("/");

    if (role === "user") navigate("/dashboard");
    if (role === "admin") navigate("/admin");

    if (role === "lawyer") navigate("/lawyer");
  }, [role, token]);

  const handleCloseChat = () => {
    setSelectedChat(null); // Set the selected doctor to null to close the chat
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
        <h2 style={{ color: "white" }}>Chats</h2>
        {chats.length === 0 ? (
          <p>No chats available</p> // Show this message if there are no chats
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              className='chat-doctor-item'
              onClick={() => setSelectedChat({ ...chat, role: "doctor" })} // Set role as "doctor"
            >
              <p> Text from {chat.person1.username}</p>{" "}
              {/* Dynamically render the username */}
            </div>
          ))
        )}
      </div>

      {/* Render the selected chat with messages */}
      {selectedChat && (
        <Chat
          doctor={selectedChat.person2} // Pass the selected doctor
          chatId={selectedChat.id} // Pass chatId
          role={selectedChat.role} // Pass role
          onClose={handleCloseChat}
          name={selectedChat?.person1?.username}
        />
      )}
    </div>
  ) : null;
};

export default DoctorDashboard;
