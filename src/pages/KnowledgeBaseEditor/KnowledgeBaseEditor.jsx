import React from "react";
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

const KnowledgeBaseEditor = ({ knowledgeBase, setKnowledgeBase }) => {
  const [activeModule, setActiveModule] = React.useState(null);

  const renderModule = () => {
    switch (activeModule) {
      case "Заболевания":
        return (
          <DiseaseManager
            knowledgeBase={knowledgeBase}
            setKnowledgeBase={setKnowledgeBase}
          />
        );
      case "Признаки":
        return (
          <SymptomManager
            knowledgeBase={knowledgeBase}
            setKnowledgeBase={setKnowledgeBase}
          />
        );
      case "Возможные значения признаков":
        return (
          <SymptomValuesManager
            knowledgeBase={knowledgeBase}
            setKnowledgeBase={setKnowledgeBase}
          />
        );
      case "Нормальные значения признаков":
        return (
          <NormalValuesManager
            knowledgeBase={knowledgeBase}
            setKnowledgeBase={setKnowledgeBase}
          />
        );
      case "Клиническая картина":
        return (
          <ClinicalPictureManager
            knowledgeBase={knowledgeBase}
            setKnowledgeBase={setKnowledgeBase}
          />
        );
      case "Значения признаков для заболеваний":
        return (
          <SymptomValuesByDiseaseManager
            knowledgeBase={knowledgeBase}
            setKnowledgeBase={setKnowledgeBase}
          />
        );
        case "Проверка полноты знаний":
          return (
            <KnowledgeCheck
              knowledgeBase={knowledgeBase}
              setKnowledgeBase={setKnowledgeBase}
            />
          );        
      case "Диагностика":
        return (
          <DiagnosisEngine
            knowledgeBase={knowledgeBase}
            setKnowledgeBase={setKnowledgeBase}
          />
        );
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
