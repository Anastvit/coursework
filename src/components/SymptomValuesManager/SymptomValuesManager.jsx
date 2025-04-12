import React, { useState } from "react";
import "./SymptomValuesManager.css";

const SymptomValuesManager = ({ knowledgeBase, setKnowledgeBase }) => {
  const symptoms = knowledgeBase.symptoms || [];
  const symptomValues = knowledgeBase.symptomValues || {};

  const [selectedSymptom, setSelectedSymptom] = useState(symptoms[0] || "");
  const [newValue, setNewValue] = useState("");
  const [selectedValueIndex, setSelectedValueIndex] = useState(null);

  const values = symptomValues[selectedSymptom] || [];

  const addValue = () => {
    const trimmed = newValue.trim();
    if (!trimmed || values.includes(trimmed)) return;

    const updated = {
      ...knowledgeBase,
      symptomValues: {
        ...symptomValues,
        [selectedSymptom]: [...values, trimmed]
      }
    };

    setKnowledgeBase(updated);
    setNewValue("");
  };

  const removeValue = () => {
    if (selectedValueIndex === null) return;

    const updatedValues = values.filter((_, i) => i !== selectedValueIndex);

    const updated = {
      ...knowledgeBase,
      symptomValues: {
        ...symptomValues,
        [selectedSymptom]: updatedValues
      }
    };

    setKnowledgeBase(updated);
    setSelectedValueIndex(null);
  };

  return (
    <div className="disease-manager">
      <label>Выберите признак</label>
      <select
        value={selectedSymptom}
        onChange={(e) => {
          setSelectedSymptom(e.target.value);
          setSelectedValueIndex(null);
        }}
      >
        {symptoms.map((s, i) => (
          <option key={i} value={s}>
            {s}
          </option>
        ))}
      </select>

      <label>Возможное значение</label>
      <div className="input-row">
        <input
          type="text"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <button className="add-btn" onClick={addValue}>+</button>
      </div>

      <label>Список значений</label>
      <div className="list-box">
        <ul>
          {values.map((val, i) => (
            <li
              key={i}
              onClick={() => setSelectedValueIndex(i)}
              className={selectedValueIndex === i ? "selected" : ""}
            >
              {val}
            </li>
          ))}
        </ul>
        <button className="remove-btn" onClick={removeValue}>-</button>
      </div>
    </div>
  );
};

export default SymptomValuesManager;
