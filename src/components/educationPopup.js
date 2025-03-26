import React from "react";
import { Modal } from "@mui/material";

const EducationPopup = ({ isEductionClicked, setisEductionClicked }) => {
  const storedFiles = JSON.parse(localStorage.getItem("files")) || [];

  return (
    <Modal
      open={isEductionClicked}
      onClose={() => setisEductionClicked(false)}
      className='d-flex-full'
    >
      <div
        className='retrieved-files  d-flex-col'
        style={{
          marginTop: "20px",
          height: "550px",
          width: "500px",
          overflowY: "auto",
          background: "#10182F",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h3
          style={{
            color: "#FDFBEE",
            textAlign: "center",
            marginBottom: "15px",
            fontSize: "22px",
            borderBottom: "2px solid #FDFBEE",
            paddingBottom: "10px",
          }}
        >
          Download Files
        </h3>

        <div
          className='file-list'
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems: "center",
          }}
        >
          {storedFiles.length > 0 ? (
            storedFiles.map((file, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "90%",
                  padding: "10px 15px",
                  background: "#1C2A4A",
                  borderRadius: "8px",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    color: "#FDFBEE",
                    fontSize: "16px",
                    wordBreak: "break-word",
                    maxWidth: "70%",
                  }}
                >
                  {file.name}
                </p>
                <button
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = file.data;
                    link.download = file.name;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  style={{
                    backgroundColor: "#007bff",
                    color: "#FDFBEE",
                    border: "none",
                    padding: "6px 12px",
                    cursor: "pointer",
                    borderRadius: "5px",
                    fontSize: "14px",
                    transition: "0.3s ease",
                  }}
                  onMouseOver={(e) => (e.target.style.background = "#0056b3")}
                  onMouseOut={(e) => (e.target.style.background = "#007bff")}
                >
                  Download
                </button>
              </div>
            ))
          ) : (
            <p style={{ color: "#fff", fontSize: "16px" }}>
              No files available.
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default EducationPopup;
