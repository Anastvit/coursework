import React, { useState } from "react";
import "./SymptomManager.css";

const SymptomManager = ({ knowledgeBase, setKnowledgeBase }) => {
  const symptoms = knowledgeBase.symptoms || [];
  const [newSymptom, setNewSymptom] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);

  const addSymptom = () => {
    const trimmed = newSymptom.trim();
    if (!trimmed || symptoms.includes(trimmed)) return;

    setKnowledgeBase({
      ...knowledgeBase,
      symptoms: [...symptoms, trimmed]
    });

    setNewSymptom("");
  };

  const removeSymptom = () => {
    if (selectedIndex === null) return;

    const updated = symptoms.filter((_, index) => index !== selectedIndex);

    setKnowledgeBase({
      ...knowledgeBase,
      symptoms: updated
    });

    setSelectedIndex(null);
  };

  return (
    <div className="disease-manager">
      <label>Название признака</label>
      <div className="input-row">
        <input
          type="text"
          value={newSymptom}
          onChange={(e) => setNewSymptom(e.target.value)}
        />
        <button className="add-btn" onClick={addSymptom}>+</button>
      </div>

      <label>Список признаков</label>
      <div className="list-box">
        <ul>
          {symptoms.map((symptom, i) => (
            <li
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={selectedIndex === i ? "selected" : ""}
            >
              {symptom}
            </li>
          ))}
        </ul>
        <button className="remove-btn" onClick={removeSymptom}>-</button>
      </div>
    </div>
  );
};

export default SymptomManager;
