import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Chat from "./chat"; // Import the Chat component

export function getUserByRole(token) {
  return axios({
    method: "get",
    url: "http://localhost:6777/api/user/getUserByRole?role=doctor",
    headers: {
      Authorization: token,
    },
  });
}

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");

    getUserByRole(token)
      .then((response) => {
        setDoctors(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error fetching data");
        setLoading(false);
      });
  }, []);

  const handleContactDoctor = async (doctor) => {
    const token = Cookies.get("token");

    try {
      // Fetch existing chats with this doctor
      const response = await axios.get(
        "http://localhost:6777/api/chat/getChatsByUser",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // Check if there's an existing chat with the selected doctor
      const existingChat = response.data.find(
        (chat) => chat.person2.id === doctor.id || chat.person1.id === doctor.id
      );

      if (existingChat) {
        // If chat exists, use the chat ID and pass it to the Chat component
        setSelectedDoctor({ ...doctor, chatId: existingChat.id, role: "user" });
      } else {
        // If no chat exists, create a new chat
        const createChatResponse = await axios.post(
          "http://localhost:6777/api/chat/createChat",
          {
            from_role: Cookies.get("role"),
            text: "Hi...!",
            person2: doctor.id,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        // After creating a new chat, update the state
        setSelectedDoctor({
          ...doctor,
          chatId: createChatResponse.data.id, // Set new chatId after creation
          role: "user",
        });
      }
    } catch (err) {
      console.error("Error contacting the doctor", err);
      setError("Failed to contact doctor.");
    }
  };

  const handleCloseChat = () => {
    setSelectedDoctor(null); // Set the selected doctor to null to close the chat
  };
  return (
    <>
      {!selectedDoctor ? (
        <div className='doctor-list-wrapper'>
          {doctors.map((doc) => (
            <div className='doctor-card' key={doc.id}>
              <div className='avatar-wrapper'>
                <img
                  src={
                    doc.avatar ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt={doc.username}
                />
              </div>
              <h3>{doc.username}</h3>
              <p className='bio'>{doc.bio ? doc.bio : "No bio available"}</p>
              <a href={`mailto:${doc.email}`} className='email'>
                {doc.email}
              </a>
              <div className='social-icons'>
                <FaTwitter />
                <FaLinkedin />
                <FaEnvelope />
              </div>
              <button
                className='contact-btn'
                onClick={() => handleContactDoctor(doc)} // Trigger contact on button click
              >
                Contact Doctor
              </button>
            </div>
          ))}
        </div>
      ) : (
        <Chat
          doctor={selectedDoctor}
          chatId={selectedDoctor.chatId}
          role={selectedDoctor.role}
          onClose={handleCloseChat}
        /> // Pass the role to the Chat component
      )}
    </>
  );
};

export default DoctorList;
