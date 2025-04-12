import React, { useState } from "react";
import "./DiseaseManager.css";

const DiseaseManager = ({ knowledgeBase, setKnowledgeBase }) => {
  const diseases = knowledgeBase.diseases || [];
  const [newDisease, setNewDisease] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);

  const addDisease = () => {
    const trimmed = newDisease.trim();
    if (!trimmed || diseases.includes(trimmed)) return;

    setKnowledgeBase({
      ...knowledgeBase,
      diseases: [...diseases, trimmed]
    });

    setNewDisease("");
  };

  const removeDisease = () => {
    if (selectedIndex === null) return;

    const updated = diseases.filter((_, index) => index !== selectedIndex);

    setKnowledgeBase({
      ...knowledgeBase,
      diseases: updated
    });

    setSelectedIndex(null);
  };

  return (
    <div className="disease-manager">
      <label>Название заболевания</label>
      <div className="input-row">
        <input
          type="text"
          value={newDisease}
          onChange={(e) => setNewDisease(e.target.value)}
        />
        <button className="add-btn" onClick={addDisease}>+</button>
      </div>

      <label>Список заболеваний</label>
      <div className="list-box">
        <ul>
          {diseases.map((disease, i) => (
            <li
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={selectedIndex === i ? "selected" : ""}
            >
              {disease}
            </li>
          ))}
        </ul>
        <button className="remove-btn" onClick={removeDisease}>-</button>
      </div>
    </div>
  );
};

export default DiseaseManager;
