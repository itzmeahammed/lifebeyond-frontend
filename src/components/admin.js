import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import "../styles/components/admin.scss";
import DoctorList from "./doctorlist";
import LawyerList from "./lawyerslist";
import UserList from "./userslist";

const Admin = ({ currentPage }) => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    // Save files to state
    setFiles(acceptedFiles);

    // Process each accepted file
    acceptedFiles.forEach((file) => {
      // Create a FormData object and append the file
      const formData = new FormData();
      formData.append("file", file);
      console.log("FormData for", file.name, "created.");

      // Create a FileReader to read the file as binary data (ArrayBuffer)
      const reader = new FileReader();
      reader.onload = () => {
        // reader.result contains the binary data as an ArrayBuffer
        console.log(`Binary Data for ${file.name}:`, reader.result);
      };
      reader.onerror = () => {
        console.error("Error reading file:", file.name);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  //   console.log(currentPage);

  return currentPage == "dashboard" ? (
    <div className='admin-container d-flex-full d-flex-col'>
      <div className='admin-inner-container d-flex-col gap-16 d-flex-jsc'>
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
          <p>
            {isDragActive
              ? "Drop files here..."
              : "Drag & Drop files here or click to upload"}
          </p>
        </div>
        {/* Display file names */}
        <div className='file-list' style={{ marginTop: "20px" }}>
          {files.map((file, index) => (
            <p key={index} style={{ color: "#fff" }}>
              {file.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  ) : currentPage == "doctor" ? (
    <DoctorList />
  ) : currentPage == "lawyer" ? (
    <LawyerList />
  ) : (
    <UserList />
  );
};

export default Admin;
