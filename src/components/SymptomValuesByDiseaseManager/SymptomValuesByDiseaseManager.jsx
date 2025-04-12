import React, { useState } from "react";
import "./SymptomValuesByDiseaseManager.css";

const SymptomValuesByDiseaseManager = ({ knowledgeBase, setKnowledgeBase }) => {
  const diseases = knowledgeBase.diseases || [];
  const symptoms = knowledgeBase.symptoms || [];
  const valuesMap = knowledgeBase.symptomValues || {};
  const diseaseMap = knowledgeBase.symptomValuesByDisease || {};

  const [selectedDisease, setSelectedDisease] = useState(diseases[0] || "");
  const [selectedSymptom, setSelectedSymptom] = useState(symptoms[0] || "");

  const currentValues =
    diseaseMap[selectedDisease]?.[selectedSymptom] || [];

  const toggleValue = (value) => {
    const current = Array.isArray(currentValues) ? currentValues : [currentValues];
    const exists = current.includes(value);
    const newValues = exists
      ? current.filter((v) => v !== value)
      : [...current, value];

    const updated = {
      ...knowledgeBase,
      symptomValuesByDisease: {
        ...diseaseMap,
        [selectedDisease]: {
          ...diseaseMap[selectedDisease],
          [selectedSymptom]: newValues
        }
      }
    };

    setKnowledgeBase(updated);
  };

  return (
    <div className="svd-manager">
      <div className="svd-column">
        <label>Заболевание</label>
        <ul className="svd-list">
          {diseases.map((d, i) => (
            <li
              key={i}
              className={selectedDisease === d ? "selected" : ""}
              onClick={() => {
                setSelectedDisease(d);
                setSelectedSymptom(symptoms[0] || "");
              }}
            >
              {d}
            </li>
          ))}
        </ul>

        <label>Признак</label>
        <ul className="svd-list">
          {symptoms.map((s, i) => (
            <li
              key={i}
              className={selectedSymptom === s ? "selected" : ""}
              onClick={() => setSelectedSymptom(s)}
            >
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="svd-column">
        <label>Значения признака</label>
        <ul className="svd-list">
          {(valuesMap[selectedSymptom] || []).map((val, i) => (
            <li
              key={i}
              className={currentValues.includes(val) ? "selected" : ""}
              onClick={() => toggleValue(val)}
            >
              {val}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SymptomValuesByDiseaseManager;
