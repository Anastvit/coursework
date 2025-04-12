import React, { useState } from "react";
import "./ClinicalPictureManager.css";

const ClinicalPictureManager = ({ knowledgeBase, setKnowledgeBase }) => {
  const diseases = knowledgeBase.diseases || [];
  const symptoms = knowledgeBase.symptoms || [];
  const clinicalPicture = knowledgeBase.clinicalPicture || {};

  const [selectedDisease, setSelectedDisease] = useState(diseases[0] || "");
  const [selectedAvailableIndex, setSelectedAvailableIndex] = useState(null);
  const [selectedCurrentIndex, setSelectedCurrentIndex] = useState(null);

  const current = clinicalPicture[selectedDisease] || [];
  const available = symptoms.filter((s) => !current.includes(s));

  const addSymptom = () => {
    if (selectedAvailableIndex === null) return;

    const symptom = available[selectedAvailableIndex];

    const updated = {
      ...knowledgeBase,
      clinicalPicture: {
        ...clinicalPicture,
        [selectedDisease]: [...current, symptom]
      }
    };

    setKnowledgeBase(updated);
    setSelectedAvailableIndex(null);
  };

  const removeSymptom = () => {
    if (selectedCurrentIndex === null) return;

    const updatedList = current.filter((_, i) => i !== selectedCurrentIndex);

    const updated = {
      ...knowledgeBase,
      clinicalPicture: {
        ...clinicalPicture,
        [selectedDisease]: updatedList
      }
    };

    setKnowledgeBase(updated);
    setSelectedCurrentIndex(null);
  };

  return (
    <div className="clinical-picture-manager">
      <label>Выберите заболевание</label>
      <select
        value={selectedDisease}
        onChange={(e) => {
          setSelectedDisease(e.target.value);
          setSelectedAvailableIndex(null);
          setSelectedCurrentIndex(null);
        }}
      >
        {diseases.map((d, i) => (
          <option key={i} value={d}>
            {d}
          </option>
        ))}
      </select>

      <div className="dual-list">
        <div className="list-column">
          <div className="list-title">Все признаки</div>
          <ul>
            {available.map((s, i) => (
              <li
                key={i}
                className={selectedAvailableIndex === i ? "selected" : ""}
                onClick={() => setSelectedAvailableIndex(i)}
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="list-buttons">
          <button onClick={addSymptom}>&gt;</button>
          <button onClick={removeSymptom}>&lt;</button>
        </div>

        <div className="list-column">
          <div className="list-title">Клиническая картина</div>
          <ul>
            {current.map((s, i) => (
              <li
                key={i}
                className={selectedCurrentIndex === i ? "selected" : ""}
                onClick={() => setSelectedCurrentIndex(i)}
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClinicalPictureManager;
