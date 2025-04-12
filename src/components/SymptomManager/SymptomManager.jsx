import React, { useState } from "react";
import "./SymptomManager.css";

const SymptomManager = () => {
  const [symptoms, setSymptoms] = useState([
    "Наличие видимых повреждений",
    "Острая боль",
    "Хруст при попытке движения",
    "Ненормальная подвижность",
    "Локализация",
    "Целостность тканей",
    "Видимые костные фрагменты"
  ]);

  const [newSymptom, setNewSymptom] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);

  const addSymptom = () => {
    if (!newSymptom.trim()) return;
    setSymptoms([...symptoms, newSymptom.trim()]);
    setNewSymptom("");
  };

  const removeSymptom = () => {
    if (selectedIndex === null) return;
    setSymptoms(symptoms.filter((_, i) => i !== selectedIndex));
    setSelectedIndex(null);
  };

  return (
    <div className="disease-manager">
      <label>Название признака</label>
      <div className="input-row">
        <input
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
