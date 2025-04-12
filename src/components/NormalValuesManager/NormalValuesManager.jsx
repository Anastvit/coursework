import React, { useState } from "react";
import "./NormalValuesManager.css";

const NormalValuesManager = () => {
  const [symptoms] = useState([
    "Наличие видимых повреждений",
    "Острая боль",
    "Хруст при попытке движения"
  ]);

  const [selectedSymptom, setSelectedSymptom] = useState(symptoms[0]);

  const [allValuesBySymptom] = useState({
    "Наличие видимых повреждений": [
      "Отсутствует",
      "Присутствует",
      "Полная",
      "Поврежденная"
    ],
    "Острая боль": ["Сильная", "Умеренная", "Слабая"],
    "Хруст при попытке движения": ["Есть", "Нет"]
  });

  const [normalValuesBySymptom, setNormalValuesBySymptom] = useState({
    "Наличие видимых повреждений": ["Отсутствует"],
    "Острая боль": [],
    "Хруст при попытке движения": []
  });

  const [selectedAvailableIndex, setSelectedAvailableIndex] = useState(null);
  const [selectedNormalIndex, setSelectedNormalIndex] = useState(null);

  const availableValues =
    allValuesBySymptom[selectedSymptom]?.filter(
      (val) => !normalValuesBySymptom[selectedSymptom]?.includes(val)
    ) || [];

  const normalValues = normalValuesBySymptom[selectedSymptom] || [];

  const addToNormal = () => {
    if (selectedAvailableIndex === null) return;
    const value = availableValues[selectedAvailableIndex];

    setNormalValuesBySymptom((prev) => ({
      ...prev,
      [selectedSymptom]: [...prev[selectedSymptom], value]
    }));

    setSelectedAvailableIndex(null);
  };

  const removeFromNormal = () => {
    if (selectedNormalIndex === null) return;
    setNormalValuesBySymptom((prev) => ({
      ...prev,
      [selectedSymptom]: prev[selectedSymptom].filter(
        (_, i) => i !== selectedNormalIndex
      )
    }));

    setSelectedNormalIndex(null);
  };

  return (
    <div className="normal-values-manager">
      <label>Выберите признак</label>
      <select
        value={selectedSymptom}
        onChange={(e) => {
          setSelectedSymptom(e.target.value);
          setSelectedAvailableIndex(null);
          setSelectedNormalIndex(null);
        }}
      >
        {symptoms.map((s, i) => (
          <option key={i} value={s}>
            {s}
          </option>
        ))}
      </select>

      <div className="dual-list">
        <div className="list-column">
          <div className="list-title">Возможные значения</div>
          <ul>
            {availableValues.map((val, i) => (
              <li
                key={i}
                className={selectedAvailableIndex === i ? "selected" : ""}
                onClick={() => setSelectedAvailableIndex(i)}
              >
                {val}
              </li>
            ))}
          </ul>
        </div>

        <div className="list-buttons">
          <button onClick={addToNormal}>&gt;</button>
          <button onClick={removeFromNormal}>&lt;</button>
        </div>

        <div className="list-column">
          <div className="list-title">Нормальные значения</div>
          <ul>
            {normalValues.map((val, i) => (
              <li
                key={i}
                className={selectedNormalIndex === i ? "selected" : ""}
                onClick={() => setSelectedNormalIndex(i)}
              >
                {val}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NormalValuesManager;
