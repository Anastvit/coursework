import React from "react";
import SidebarButton from "@components/SidebarButton";
import "./Sidebar.css";

const Sidebar = ({ onSelect }) => {
  const buttons = [
    "Заболевания",
    "Признаки",
    "Возможные значения признаков",
    "Нормальные значения признаков",
    "Клиническая картина",
    "Значения признаков для заболеваний",
    "Проверка полноты знаний"
  ];

  return (
    <div className="sidebar">
      {buttons.map((label, index) => (
        <SidebarButton key={index} label={label} onClick={() => onSelect(label)} />
      ))}
    </div>
  );
};

export default Sidebar;
