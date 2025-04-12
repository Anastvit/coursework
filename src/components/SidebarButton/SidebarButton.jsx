import React from "react";
import "./SidebarButton.css";

const SidebarButton = ({ label, onClick }) => {
  return (
    <button className="sidebar-button" onClick={onClick}>
      {label}
    </button>
  );
};

export default SidebarButton;
