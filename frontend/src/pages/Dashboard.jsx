import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import CVPage from "./CVPage";
import RoadmapPage from "./RoadmapPage";
import CompaniesPage from "./CompaniesPage";

export default function Dashboard() {
  const containerStyle = {
    display: "flex",
    height: "100vh",
    width: "100vw",
    fontFamily: "Arial, sans-serif",
  };

  const contentStyle = {
    flex: 1,
    padding: "30px",
    backgroundColor: "#f9f9f9",
    overflowY: "auto",
    minWidth: 0,
    boxSizing: "border-box",
  };

  return (
    <div style={containerStyle}>
      <Sidebar />
      <div style={contentStyle}>
        <Routes>
          <Route path="/" element={<Navigate to="cv" />} />
          <Route path="cv" element={<CVPage />} />
          <Route path="roadmap" element={<RoadmapPage />} />
          <Route path="companies" element={<CompaniesPage />} />
        </Routes>
      </div>
    </div>
  );
}
