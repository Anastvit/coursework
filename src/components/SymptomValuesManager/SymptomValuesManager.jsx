import React, { useState } from "react";
import "./SymptomValuesManager.css";

const SymptomValuesManager = () => {
  const [symptoms] = useState([
    "Наличие видимых повреждений",
    "Острая боль",
    "Хруст при попытке движения",
    "Ненормальная подвижность"
  ]);

  const [selectedSymptom, setSelectedSymptom] = useState(symptoms[0]);
  const [valueInput, setValueInput] = useState("");
  const [selectedValueIndex, setSelectedValueIndex] = useState(null);

  const [valuesBySymptom, setValuesBySymptom] = useState({
    "Наличие видимых повреждений": [
      "Отсутствует",
      "Присутствует",
      "Полная",
      "Неполная",
      "Ноги",
      "Руки",
      "Голова"
    ],
    "Острая боль": [],
    "Хруст при попытке движения": [],
    "Ненормальная подвижность": []
  });

  const addValue = () => {
    if (!valueInput.trim()) return;

    setValuesBySymptom((prev) => ({
      ...prev,
      [selectedSymptom]: [...prev[selectedSymptom], valueInput.trim()]
    }));

    setValueInput("");
  };

  const removeValue = () => {
    if (selectedValueIndex === null) return;

    setValuesBySymptom((prev) => ({
      ...prev,
      [selectedSymptom]: prev[selectedSymptom].filter(
        (_, i) => i !== selectedValueIndex
      )
    }));

    setSelectedValueIndex(null);
  };

  return (
    <div className="symptom-values-manager">
      <label>Выберите признак</label>
      <select
        value={selectedSymptom}
        onChange={(e) => {
          setSelectedSymptom(e.target.value);
          setSelectedValueIndex(null);
        }}
      >
        {symptoms.map((symptom, i) => (
          <option key={i} value={symptom}>
            {symptom}
          </option>
        ))}
      </select>

      <label>Возможное значение</label>
      <div className="input-row">
        <input
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
        />
        <button className="add-btn" onClick={addValue}>
          +
        </button>
      </div>

      <div className="list-box">
        <ul>
          {(valuesBySymptom[selectedSymptom] || []).map((val, i) => (
            <li
              key={i}
              onClick={() => setSelectedValueIndex(i)}
              className={selectedValueIndex === i ? "selected" : ""}
            >
              {val}
            </li>
          ))}
        </ul>
        <button className="remove-btn" onClick={removeValue}>
          -
        </button>
      </div>
    </div>
  );
};

export default SymptomValuesManager;
