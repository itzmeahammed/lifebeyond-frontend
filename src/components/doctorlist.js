import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "../styles/components/doctorList.scss";
import { FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";

// Helper function to fetch doctors
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve token from cookies (update cookie name if needed)
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

  return (
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
          <button className='contact-btn'>Contact Doctor</button>
        </div>
      ))}
    </div>
  );
};

export default DoctorList;
