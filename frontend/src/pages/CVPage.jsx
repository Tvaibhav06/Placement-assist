import React, { useState } from "react";

export default function CVPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(""); // new state

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUploadClick = () => {
    document.getElementById("cvInput").click();
  };

  const handleUploadFile = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("cv", selectedFile); // 'cv' is the field name

    try {
      setUploadStatus("Uploading...");
      const response = await fetch("https://your-server.com/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setUploadStatus("File uploaded successfully!");
        setSelectedFile(null); // clear selection
      } else {
        setUploadStatus("Upload failed. Try again.");
      }
    } catch (error) {
      console.error(error);
      setUploadStatus("An error occurred during upload.");
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: "22px", marginBottom: "15px" }}>📄 CV Uploader</h2>
      <div
        style={{
          border: "2px dashed gray",
          borderRadius: "8px",
          padding: "40px",
          textAlign: "center",
          backgroundColor: "#fff",
        }}
      >
        <p style={{ marginBottom: "10px", color: "#555" }}>Drag & drop your CV here</p>

        <input
          type="file"
          id="cvInput"
          style={{ display: "none" }}
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />

        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#0B4A63",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginRight: "10px",
          }}
          onClick={handleUploadClick}
        >
          Select CV
        </button>

        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
          onClick={handleUploadFile}
        >
          Upload CV
        </button>

        {selectedFile && (
          <p style={{ marginTop: "10px", color: "#333" }}>Selected: {selectedFile.name}</p>
        )}

        {uploadStatus && <p style={{ marginTop: "10px" }}>{uploadStatus}</p>}
      </div>
    </div>
  );
}
