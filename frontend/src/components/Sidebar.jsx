import React from "react";
import { useNavigate, NavLink } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const sidebarStyle = {
    width: "250px",
    backgroundColor: "#0B4A63",
    color: "white",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    justifyContent: "space-between",
    height: "100vh",
    boxSizing: "border-box",
  };

  const menuStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const menuItemStyle = {
    padding: "12px 16px",
    margin: "6px 0",
    borderRadius: "6px",
    cursor: "pointer",
    textDecoration: "none",
    color: "white",
    fontWeight: "500",
    fontSize: "16px",
  };

  const activeStyle = {
    backgroundColor: "#14576D",
  };

  const logoutStyle = {
    padding: "12px 16px",
    margin: "6px 0",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: "grey",
    color: "white",
    textAlign: "center",
    fontWeight: "500",
  };

  const handleLogout = () => {
    // Clear any auth tokens here
    localStorage.removeItem("userToken");
    navigate("/");
  };

  return (
    <div style={sidebarStyle}>
      <div>
        <h2 style={{ marginBottom: "30px", fontSize: "22px" }}>CampusConnect</h2>
        <div style={menuStyle}>
          <NavLink
            to="/dashboard/cv"
            style={({ isActive }) =>
              isActive ? { ...menuItemStyle, ...activeStyle } : menuItemStyle
            }
          >
            CV Uploader
          </NavLink>
          <NavLink
            to="/dashboard/roadmap"
            style={({ isActive }) =>
              isActive ? { ...menuItemStyle, ...activeStyle } : menuItemStyle
            }
          >
            Roadmap
          </NavLink>
          <NavLink
            to="/dashboard/companies"
            style={({ isActive }) =>
              isActive ? { ...menuItemStyle, ...activeStyle } : menuItemStyle
            }
          >
            Companies
          </NavLink>
        </div>
      </div>

      <div onClick={handleLogout} style={logoutStyle}>
        Logout
      </div>
    </div>
  );
}
