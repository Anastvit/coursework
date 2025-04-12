import React, { useState } from "react";
import "./NormalValuesManager.css";

const NormalValuesManager = ({ knowledgeBase, setKnowledgeBase }) => {
  const symptoms = knowledgeBase.symptoms || [];
  const symptomValues = knowledgeBase.symptomValues || {};
  const normalValues = knowledgeBase.normalValues || {};

  const [selectedSymptom, setSelectedSymptom] = useState(symptoms[0] || "");

  const handleSetNormal = (value) => {
    const updated = {
      ...knowledgeBase,
      normalValues: {
        ...normalValues,
        [selectedSymptom]: value
      }
    };

    setKnowledgeBase(updated);
  };

  return (
    <div className="disease-manager">
      <label>Выберите признак</label>
      <select
        value={selectedSymptom}
        onChange={(e) => setSelectedSymptom(e.target.value)}
      >
        {symptoms.map((s, i) => (
          <option key={i} value={s}>
            {s}
          </option>
        ))}
      </select>

      <label>Выберите нормальное значение</label>
      <div className="list-box">
        <ul>
          {(symptomValues[selectedSymptom] || []).map((val, i) => (
            <li
              key={i}
              onClick={() => handleSetNormal(val)}
              className={
                normalValues[selectedSymptom] === val ? "selected" : ""
              }
            >
              {val}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NormalValuesManager;
