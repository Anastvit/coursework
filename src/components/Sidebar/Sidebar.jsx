import React from "react";
import SidebarButton from "@components/SidebarButton";
import "./Sidebar.css";

const Sidebar = () => {
  const buttons = [
    "Заболевания",
    "Признаки",
    "Возможные значения признаков",
    "Нормальные значения признаков",
    "Клиническая картина",
    "Значения признаков для заболеваний"
  ];

  return (
    <div className="sidebar">
      {buttons.map((label, index) => (
        <SidebarButton key={index} label={label} />
      ))}
      <button className="sidebar-button check-button">
        Проверка полноты знаний
      </button>
    </div>
  );
};

export default Sidebar;
