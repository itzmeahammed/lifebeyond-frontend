import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Chat from "./chat"; // Import the Chat component
import LawyerChat from "./lawyerChat";

// Helper function to fetch lawyers
export function getLawyers(token) {
  return axios({
    method: "get",
    url: "http://localhost:6777/api/user/getUserByRole?role=lawyer",
    headers: {
      Authorization: token,
    },
  });
}

const LawyerList = () => {
  const [lawyers, setLawyers] = useState([]);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve token from cookies
    const token = Cookies.get("token");

    getLawyers(token)
      .then((response) => {
        setLawyers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error fetching data");
        setLoading(false);
      });
  }, []);

  const handleContactLawyer = async (lawyer) => {
    const token = Cookies.get("token");

    try {
      // Fetch existing chats with this lawyer
      const response = await axios.get(
        "http://localhost:6777/api/chat/getChatsByUser",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // Check if there's an existing chat with the selected lawyer
      const existingChat = response.data.find(
        (chat) => chat.person2.id === lawyer.id || chat.person1.id === lawyer.id
      );

      if (existingChat) {
        // If chat exists, use the chat ID and pass it to the Chat component
        setSelectedLawyer({ ...lawyer, chatId: existingChat.id, role: "user" });
      } else {
        // If no chat exists, create a new chat
        const createChatResponse = await axios.post(
          "http://localhost:6777/api/chat/createChat",
          {
            from_role: Cookies.get("role"),
            text: "Hi...!",
            person2: lawyer.id,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setSelectedLawyer({
          ...lawyer,
          chatId: createChatResponse.data.id, // Set new chatId after creation
          role: "user",
        });
      }
    } catch (err) {
      console.error("Error contacting the lawyer", err);
      setError("Failed to contact lawyer.");
    }
  };

  const handleCloseChat = () => {
    setSelectedLawyer(null); // Set the selected lawyer to null to close the chat
  };

  return (
    <>
      {!selectedLawyer ? (
        <div className='doctor-list-wrapper'>
          {lawyers.map((lawyer) => (
            <div className='doctor-card' key={lawyer.id}>
              <div className='avatar-wrapper'>
                <img
                  src={
                    lawyer.avatar ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt={lawyer.username}
                />
              </div>
              <h3>{lawyer.username}</h3>
              <p className='bio'>
                {lawyer.bio ? lawyer.bio : "No bio available"}
              </p>
              <a href={`mailto:${lawyer.email}`} className='email'>
                {lawyer.email}
              </a>
              <div className='social-icons'>
                <FaTwitter />
                <FaLinkedin />
                <FaEnvelope />
              </div>
              <button
                className='contact-btn'
                onClick={() => handleContactLawyer(lawyer)} // Trigger contact on button click
              >
                Contact Lawyer
              </button>
            </div>
          ))}
        </div>
      ) : (
        <LawyerChat
          lawyer={selectedLawyer}
          chatId={selectedLawyer.chatId}
          role={selectedLawyer.role}
          onClose={handleCloseChat}
        />
      )}
    </>
  );
};

export default LawyerList;
