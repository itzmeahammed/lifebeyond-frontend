import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../styles/components/admin.scss";
import DoctorList from "./doctorlist";
import LawyerList from "./lawyerslist";
import UserList from "./userslist";

const Admin = ({ currentPage }) => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  // Load stored files from localStorage on mount
  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem("files")) || [];
    setFiles(storedFiles);
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        const newFile = { name: file.name, data: base64String };

        // Store files in localStorage
        const storedFiles = JSON.parse(localStorage.getItem("files")) || [];
        const updatedFiles = [...storedFiles, newFile];
        localStorage.setItem("files", JSON.stringify(updatedFiles));

        setFiles(updatedFiles); // Update state
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    const role = Cookies.get("role");
    const token = Cookies.get("role");
    if (!token) navigate("/");
    if (role === "user") navigate("/dashboard");
    if (role === "doctor") navigate("/doctor");
    if (role === "lawyer") navigate("/lawyer");
  }, []);

  return currentPage === "dashboard" ? (
    <div className='admin-container d-flex-full d-flex-col'>
      <div className='admin-inner-container d-flex-col gap-16 d-flex-jsc'>
        {/* Drag and Drop Upload */}
        <div
          {...getRootProps()}
          style={{
            width: "500px",
            height: "500px",
            backgroundColor: isDragActive ? "#444" : "#000",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px dashed white",
            cursor: "pointer",
          }}
        >
          <input {...getInputProps()} />
          <p style={{ fontSize: "20px" }}>
            {isDragActive
              ? "Drop files here..."
              : "Drag & Drop files here or click to upload"}
          </p>
        </div>

        {/* Display Uploaded File Names */}
        <div className='file-list' style={{ marginTop: "20px" }}>
          {files.map((file, index) => (
            <p key={index} style={{ color: "#fff" }}>
              {file.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  ) : currentPage === "doctor" ? (
    <DoctorList />
  ) : currentPage === "lawyer" ? (
    <LawyerList />
  ) : (
    <UserList />
  );
};

export default Admin;
