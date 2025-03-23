import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "../styles/components/doctorList.scss";
import { FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";

// Helper function to fetch users with role "user"
export function getUsers(token) {
  return axios({
    method: "get",
    url: "http://localhost:6777/api/user/getUserByRole?role=user",
    headers: {
      Authorization: token,
    },
  });
}

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve token from cookies (adjust the cookie name if necessary)
    const token = Cookies.get("token");

    getUsers(token)
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error fetching data");
        setLoading(false);
      });
  }, []);
  return (
    <div className='doctor-list-wrapper'>
      {users.map((user) => (
        <div className='doctor-card' key={user.id}>
          <div className='avatar-wrapper'>
            <img
              src={
                user.avatar ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt={user.username || user.name}
            />
          </div>
          <h3>{user.username || user.name}</h3>
          <p className='specialty'>{user.role}</p>
          <p className='bio'>{user.bio || "No bio available"}</p>
          <a href={`mailto:${user.email}`} className='email'>
            {user.email}
          </a>
          <div className='social-icons'>
            <FaTwitter />
            <FaLinkedin />
            <FaEnvelope />
          </div>
          <button className='contact-btn'>Contact User</button>
        </div>
      ))}
    </div>
  );
};

export default UserList;
