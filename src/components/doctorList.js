import React from "react";
import "../styles/components/doctorList.scss";
import { FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";

const doctors = [
  {
    id: 1,
    name: "Dr. Ayesha Khan",
    specialty: "Cardiologist",
    bio: "Experienced in heart-related treatments. Passionate about fitness & lifestyle care.",
    email: "ayesha.khan@healthmail.com",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 2,
    name: "Dr. Arjun Mehta",
    specialty: "Neurologist",
    bio: "Focuses on brain & nerve disorders. Tech enthusiast & mental health advocate.",
    email: "arjun.mehta@neurocare.com",
    avatar: "https://i.pravatar.cc/150?img=59",
  },
  {
    id: 3,
    name: "Dr. Rhea Das",
    specialty: "Dermatologist",
    bio: "Skin, hair, and cosmetic care expert. Promotes skin positivity and wellness.",
    email: "rhea.das@skincareplus.com",
    avatar: "https://i.pravatar.cc/150?img=48",
  },
  {
    id: 1,
    name: "Dr. Ayesha Khan",
    specialty: "Cardiologist",
    bio: "Experienced in heart-related treatments. Passionate about fitness & lifestyle care.",
    email: "ayesha.khan@healthmail.com",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 1,
    name: "Dr. Ayesha Khan",
    specialty: "Cardiologist",
    bio: "Experienced in heart-related treatments. Passionate about fitness & lifestyle care.",
    email: "ayesha.khan@healthmail.com",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 1,
    name: "Dr. Ayesha Khan",
    specialty: "Cardiologist",
    bio: "Experienced in heart-related treatments. Passionate about fitness & lifestyle care.",
    email: "ayesha.khan@healthmail.com",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 1,
    name: "Dr. Ayesha Khan",
    specialty: "Cardiologist",
    bio: "Experienced in heart-related treatments. Passionate about fitness & lifestyle care.",
    email: "ayesha.khan@healthmail.com",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 1,
    name: "Dr. Ayesha Khan",
    specialty: "Cardiologist",
    bio: "Experienced in heart-related treatments. Passionate about fitness & lifestyle care.",
    email: "ayesha.khan@healthmail.com",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 1,
    name: "Dr. Ayesha Khan",
    specialty: "Cardiologist",
    bio: "Experienced in heart-related treatments. Passionate about fitness & lifestyle care.",
    email: "ayesha.khan@healthmail.com",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
];

const DoctorList = () => {
  return (
    <div className='doctor-list-wrapper'>
      {doctors.map((doc) => (
        <div className='doctor-card' key={doc.id}>
          <div className='avatar-wrapper'>
            <img src={doc.avatar} alt={doc.name} />
          </div>
          <h3>{doc.name}</h3>
          <p className='specialty'>{doc.specialty}</p>
          <p className='bio'>{doc.bio}</p>
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
