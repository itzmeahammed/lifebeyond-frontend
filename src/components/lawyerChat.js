import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Avatar } from "@mui/material";
import { FiSend } from "react-icons/fi";
import { IoClose } from "react-icons/io5"; // Import the close icon
import "../styles/components/chat.scss";

const LawyerChat = ({ lawyer, chatId, role, onClose, name }) => {
  // Add onClose function as prop
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (chatId) {
      fetchMessages(chatId); // Fetch messages for the chatId provided
    }
  }, [chatId]);

  const fetchMessages = async (chatId) => {
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

      const chat = response.data.find((chat) => chat.id === chatId);
      if (chat) {
        setMessages(chat.messages); // Set the existing messages for the chat
      }
    } catch (err) {
      console.error("Error fetching chat messages", err);
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const token = Cookies.get("token");
    const payload = {
      from_role: Cookies.get("role"), // assuming the role is in cookies
      text: newMessage,
    };

    try {
      if (chatId) {
        await axios.post(
          `http://localhost:6777/api/chat/addMessage?chat_id=${chatId}`,
          payload,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        // Add the new message to the messages list immediately
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            from: Cookies.get("role"),
            text: newMessage,
            timestamp: new Date().toISOString(),
          }, // Ensure timestamp is in ISO format
        ]);
        setNewMessage(""); // Clear the input after sending
      }
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  const formatTimestamp = (timestamp) => {
    if (timestamp && typeof timestamp === "string") {
      return timestamp.split(" ")[0]; // Display only the date part
    }
    // If timestamp is not in the expected format, return a default or fallback value
    return "Invalid timestamp";
  };

  return (
    <div className='chat-layout'>
      <div className='chat-sidebar'>
        <div className='chat-doctor-info'>
          <Avatar>{name}</Avatar>
          <span>{name}</span>
        </div>
      </div>

      <div className='chat-container'>
        <div className='chat-header'>
          Chat with {name}
          <button className='close-chat-btn' onClick={onClose}>
            <IoClose size={24} /> {/* Close icon */}
          </button>
        </div>

        <div className='chat-body'>
          {messages.map((msg, index) => {
            const isLawyerMessage = msg.from === "user";
            const isUserMessage = msg.from === "lawyer";

            return (
              <div
                key={index}
                className={`chat-message ${
                  (role === "user" && isLawyerMessage) ||
                  (role === "lawyer" && isUserMessage)
                    ? "doctor-message" // Left alignment for lawyer messages
                    : "user-message" // Right alignment for user messages
                }`}
              >
                <Avatar className='chat-avatar'>
                  {isUserMessage ? "U" : "L"}
                </Avatar>
                <div className='chat-text'>
                  {msg.text}
                  <div className='chat-timestamp'>
                    {formatTimestamp(msg.timestamp)} {/* Format timestamp */}
                  </div>
                </div>
              </div>
            );
          })}
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

export default LawyerChat;
