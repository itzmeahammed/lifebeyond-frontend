import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "../styles/components/doctorList.scss";
import { FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve token from cookies (adjust the cookie name if necessary)
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

  return (
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
          {/* The API response might not include a specialty field */}
          <p className='bio'>{lawyer.bio ? lawyer.bio : "No bio available"}</p>
          <a href={`mailto:${lawyer.email}`} className='email'>
            {lawyer.email}
          </a>
          <div className='social-icons'>
            <FaTwitter />
            <FaLinkedin />
            <FaEnvelope />
          </div>
          <button className='contact-btn'>Contact Lawyer</button>
        </div>
      ))}
    </div>
  );
};

export default LawyerList;
