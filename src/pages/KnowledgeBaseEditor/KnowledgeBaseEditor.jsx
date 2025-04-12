import React, { useState } from "react";
import Sidebar from "@components/Sidebar";
import DiseaseManager from "@components/DiseaseManager";
import SymptomManager from "@components/SymptomManager";
import SymptomValuesManager from "@components/SymptomValuesManager";
import NormalValuesManager from "@components/NormalValuesManager";
import ClinicalPictureManager from "@components/ClinicalPictureManager";
import SymptomValuesByDiseaseManager from "@components/SymptomValuesByDiseaseManager";
import KnowledgeCheck from "@components/KnowledgeCheck";
import DiagnosisEngine from "@components/DiagnosisEngine";
import "./KnowledgeBaseEditor.css";

const KnowledgeBaseEditor = () => {
  const [activeModule, setActiveModule] = useState(null);

  const renderModule = () => {
    switch (activeModule) {
      case "Заболевания":
        return <DiseaseManager />;
      case "Признаки":
        return <SymptomManager />;
      case "Возможные значения признаков":
        return <SymptomValuesManager />;
      case "Нормальные значения признаков":
        return <NormalValuesManager />;
      case "Клиническая картина":
        return <ClinicalPictureManager />;
      case "Значения признаков для заболеваний":
        return <SymptomValuesByDiseaseManager />;
      case "Проверка полноты знаний":
        return <KnowledgeCheck />;
      case "Диагностика":
        return <DiagnosisEngine />;
      default:
        return <div style={{ padding: "20px" }}>Выберите раздел слева</div>;
    }
  };

  return (
    <>
      <div className="editor-container">
        <Sidebar onSelect={setActiveModule} />
        <div className="workspace">{renderModule()}</div>
      </div>

      {activeModule !== "Диагностика" && (
        <div className="diagnosis-fab">
          <button onClick={() => setActiveModule("Диагностика")}>
            Диагностика
          </button>
        </div>
      )}
    </>
  );
};

export default KnowledgeBaseEditor;
