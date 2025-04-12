import React, { useState } from "react";
import "./ClinicalPictureManager.css";

const ClinicalPictureManager = () => {
  const [diseases] = useState(["Перелом", "Вывих", "Ушиб"]);
  const [symptoms] = useState([
    "Происхождение",
    "Локализация",
    "Наличие \"пустоты\" в месте травмы",
    "Поврежденная",
    "Отсутствует"
  ]);

  const [selectedDisease, setSelectedDisease] = useState(diseases[0]);

  const [clinicalData, setClinicalData] = useState({
    Перелом: ["Отсутствует"],
    Вывих: [],
    Ушиб: []
  });

  const [selectedSymptomIndex, setSelectedSymptomIndex] = useState(null);
  const [selectedDiseaseSymptomIndex, setSelectedDiseaseSymptomIndex] =
    useState(null);

  const currentSymptoms = clinicalData[selectedDisease] || [];

  const availableSymptoms = symptoms.filter(
    (s) => !currentSymptoms.includes(s)
  );

  const addSymptomToDisease = () => {
    if (selectedSymptomIndex === null) return;

    const selectedSymptom = availableSymptoms[selectedSymptomIndex];

    setClinicalData((prev) => ({
      ...prev,
      [selectedDisease]: [...prev[selectedDisease], selectedSymptom]
    }));

    setSelectedSymptomIndex(null);
  };

  const removeSymptomFromDisease = () => {
    if (selectedDiseaseSymptomIndex === null) return;

    setClinicalData((prev) => ({
      ...prev,
      [selectedDisease]: prev[selectedDisease].filter(
        (_, i) => i !== selectedDiseaseSymptomIndex
      )
    }));

    setSelectedDiseaseSymptomIndex(null);
  };

  return (
    <div className="clinical-picture-manager">
      <label>Выберите заболевание</label>
      <select
        value={selectedDisease}
        onChange={(e) => {
          setSelectedDisease(e.target.value);
          setSelectedSymptomIndex(null);
          setSelectedDiseaseSymptomIndex(null);
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
          <div className="list-title">Множество признаков</div>
          <ul>
            {availableSymptoms.map((symptom, i) => (
              <li
                key={i}
                className={selectedSymptomIndex === i ? "selected" : ""}
                onClick={() => setSelectedSymptomIndex(i)}
              >
                {symptom}
              </li>
            ))}
          </ul>
        </div>

        <div className="list-buttons">
          <button onClick={addSymptomToDisease}>&gt;</button>
          <button onClick={removeSymptomFromDisease}>&lt;</button>
        </div>

        <div className="list-column">
          <div className="list-title">Выбранные признаки</div>
          <ul>
            {currentSymptoms.map((symptom, i) => (
              <li
                key={i}
                className={selectedDiseaseSymptomIndex === i ? "selected" : ""}
                onClick={() => setSelectedDiseaseSymptomIndex(i)}
              >
                {symptom}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClinicalPictureManager;
