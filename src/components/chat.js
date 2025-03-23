import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { FiSend } from "react-icons/fi";
import "../styles/components/chat.scss";

const chatData = [
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
const Chat = () => {
  const [activeUser, setActiveUser] = useState(chatData[0]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const updated = {
      ...activeUser,
      messages: [...activeUser.messages, { from: "user", text: newMessage }],
    };

    const updatedChatList = chatData.map((user) =>
      user.id === activeUser.id ? updated : user
    );

    setActiveUser(updated);
    setNewMessage("");
  };

  return (
    <div className='chat-layout'>
      {/* Sidebar */}
      <div className='chat-sidebar'>
        <h3 className='chat-sidebar-title'>Users</h3>
        {chatData.map((user) => (
          <div
            key={user.id}
            className={`chat-user-item ${
              user.id === activeUser.id ? "active-user" : ""
            }`}
            onClick={() => setActiveUser(user)}
          >
            <Avatar>{user.avatar}</Avatar>
            <span>{user.name}</span>
          </div>
        ))}
      </div>

      {/* Main Chat */}
      <div className='chat-container'>
        <div className='chat-header'>Chat with {activeUser.name}</div>

        <div className='chat-body'>
          {activeUser.messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${
                msg.from === "user" ? "user-message" : "doctor-message"
              }`}
            >
              <Avatar className='chat-avatar'>
                {msg.from === "user" ? "U" : "D"}
              </Avatar>
              <div className='chat-text'>{msg.text}</div>
            </div>
          ))}
        </div>

        <div className='chat-input-section'>
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

export default Chat;
