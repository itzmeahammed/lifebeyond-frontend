import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { FiSend } from "react-icons/fi";
import "../styles/components/Userchat.scss";
import { useLocation } from "react-router-dom";

const UserchatData = [
  {
    id: "u001",
    name: "Ahammed",
    avatar: "A",
    messages: [
      { from: "user", text: "Hi" },
      { from: "doctor", text: "Hello" },
      { from: "user", text: "Good morning doctor" },
      { from: "doctor", text: "Good morning!" },
    ],
  },
  {
    id: "u002",
    name: "Vinay",
    avatar: "V",
    messages: [
      { from: "user", text: "Hey doctor" },
      { from: "doctor", text: "Hi Vinay, what's up?" },
      { from: "user", text: "Just a small query about my meds." },
    ],
  },
  {
    id: "u003",
    name: "Meera",
    avatar: "M",
    messages: [
      { from: "user", text: "Hello" },
      { from: "doctor", text: "Hi Meera!" },
      { from: "user", text: "Thanks for the advice last time" },
      { from: "doctor", text: "Glad it helped!" },
    ],
  },
];
const UserChat = () => {
  const [activeUser, setActiveUser] = useState(UserchatData[0]);
  const [newMessage, setNewMessage] = useState("");
  const path = useLocation();

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const updated = {
      ...activeUser,
      messages: [...activeUser.messages, { from: "user", text: newMessage }],
    };

    const updatedUserChatList = UserchatData.map((user) =>
      user.id === activeUser.id ? updated : user
    );

    setActiveUser(updated);
    setNewMessage("");
  };

  return (
    <div className='Userchat-layout'>
      {/* Sidebar */}
      {path.includes("/doctor") && (
        <div className='Userchat-sidebar'>
          <h3 className='Userchat-sidebar-title'>Users</h3>
          {UserchatData.map((user) => (
            <div
              key={user.id}
              className={`Userchat-user-item ${
                user.id === activeUser.id ? "active-user" : ""
              }`}
              onClick={() => setActiveUser(user)}
            >
              <Avatar>{user.avatar}</Avatar>
              <span>{user.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* Main UserChat */}
      <div className='Userchat-container'>
        <div className='Userchat-header'>UserChat with {activeUser.name}</div>

        <div className='Userchat-body'>
          {activeUser.messages.map((msg, index) => (
            <div
              key={index}
              className={`Userchat-message ${
                msg.from === "user" ? "user-message" : "doctor-message"
              }`}
            >
              <Avatar className='Userchat-avatar'>
                {msg.from === "user" ? "U" : "D"}
              </Avatar>
              <div className='Userchat-text'>{msg.text}</div>
            </div>
          ))}
        </div>

        <div className='Userchat-input-section'>
          <input
            type='text'
            placeholder='Type a message...'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSend}>
            <FiSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserChat;
