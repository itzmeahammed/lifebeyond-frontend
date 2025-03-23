import React from "react";
import "../styles/components/doctorList.scss";
import { FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";

const lawyers = [
  {
    id: 1,
    name: "Adv. Kavita Sharma",
    specialty: "Family Law Expert",
    bio: "Helping families resolve legal matters peacefully. Advocate for women’s rights.",
    email: "kavita.sharma@lawmail.com",
    avatar: "https://i.pravatar.cc/150?img=52",
  },
  {
    id: 2,
    name: "Adv. Rohit Verma",
    specialty: "Criminal Defense",
    bio: "Handles high-profile criminal cases with integrity and precision.",
    email: "rohit.verma@justicehub.com",
    avatar: "https://i.pravatar.cc/150?img=60",
  },
  {
    id: 3,
    name: "Adv. Sneha Roy",
    specialty: "Corporate Law",
    bio: "Expert in contracts, startups & company law. Advisor to growing firms.",
    email: "sneha.roy@bizlaw.com",
    avatar: "https://i.pravatar.cc/150?img=65",
  },
  {
    id: 4,
    name: "Adv. Manav Patel",
    specialty: "Property Law",
    bio: "Trusted advisor for real estate, land and lease disputes.",
    email: "manav.patel@landlegal.com",
    avatar: "https://i.pravatar.cc/150?img=67",
  },
];

const LawyerList = () => {
  return (
    <div className='doctor-list-wrapper'>
      {lawyers.map((lawyer) => (
        <div className='doctor-card' key={lawyer.id}>
          <div className='avatar-wrapper'>
            <img src={lawyer.avatar} alt={lawyer.name} />
          </div>
          <h3>{lawyer.name}</h3>
          <p className='specialty'>{lawyer.specialty}</p>
          <p className='bio'>{lawyer.bio}</p>
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
