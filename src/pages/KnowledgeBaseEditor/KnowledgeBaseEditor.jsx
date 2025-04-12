import React from "react";
import Sidebar from "@components/Sidebar";
import "./KnowledgeBaseEditor.css";

const KnowledgeBaseEditor = () => {
  return (
    <div className="editor-container">
      <Sidebar />
      <div className="workspace">{/* Здесь будет контент */}</div>
    </div>
  );
};

export default KnowledgeBaseEditor;
