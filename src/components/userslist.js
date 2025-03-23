import React from "react";
import "../styles/components/doctorList.scss";
import { FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";

const users = [
  {
    id: 1,
    name: "Ahammed Riyaz",
    role: "Frontend Developer",
    bio: "Loves building modern UI with React and MUI. Focused on clean design and UX.",
    email: "ahammed.r@webmail.com",
    avatar: "https://i.pravatar.cc/150?img=68",
  },
  {
    id: 2,
    name: "Vishnu V",
    role: "YouTuber & Web Creator",
    bio: "Passionate about tech and job updates. Runs the 'Mr.V' channel for private job seekers.",
    email: "vishnu.v@creatorhub.com",
    avatar: "https://i.pravatar.cc/150?img=69",
  },
  {
    id: 3,
    name: "Meena Kapoor",
    role: "UI/UX Designer",
    bio: "Figma enthusiast who loves turning ideas into aesthetic designs.",
    email: "meena.k@designly.com",
    avatar: "https://i.pravatar.cc/150?img=70",
  },
  {
    id: 4,
    name: "Sameer Reddy",
    role: "Mobile App Developer",
    bio: "Works on React Native and Flutter to build cross-platform mobile solutions.",
    email: "sameer.reddy@appsdev.com",
    avatar: "https://i.pravatar.cc/150?img=71",
  },
];

const UserList = () => {
  return (
    <div className='doctor-list-wrapper'>
      {users.map((user) => (
        <div className='doctor-card' key={user.id}>
          <div className='avatar-wrapper'>
            <img src={user.avatar} alt={user.name} />
          </div>
          <h3>{user.name}</h3>
          <p className='specialty'>{user.role}</p>
          <p className='bio'>{user.bio}</p>
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
