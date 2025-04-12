import React, { useState } from "react";
import "./SymptomValuesByDiseaseManager.css";

const SymptomValuesByDiseaseManager = () => {
  const diseases = ["Перелом", "Вывих", "Травма мышц и сухожилий"];
  const symptoms = [
    "Наличие видимых повреждений",
    "Острая боль",
    "Изменение формы сустава"
  ];

  const valuesBySymptom = {
    "Наличие видимых повреждений": ["Присутствует", "Отсутствует"],
    "Острая боль": ["Сильная", "Слабая"],
    "Изменение формы сустава": ["Да", "Нет"]
  };

  const [selectedDisease, setSelectedDisease] = useState(null);
  const [selectedSymptom, setSelectedSymptom] = useState(null);

  const [selectedValues, setSelectedValues] = useState({});

  const handleValueToggle = (value) => {
    if (!selectedDisease || !selectedSymptom) return;

    const key = `${selectedDisease}__${selectedSymptom}`;
    const current = selectedValues[key] || [];

    const newValues = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    setSelectedValues((prev) => ({
      ...prev,
      [key]: newValues
    }));
  };

  const getValuesForCurrent = () => {
    const key = `${selectedDisease}__${selectedSymptom}`;
    return selectedValues[key] || [];
  };

  return (
    <div className="svd-manager">
      <div className="svd-column">
        <label>Выберите заболевание</label>
        <ul className="svd-list">
          {diseases.map((d, i) => (
            <li
              key={i}
              className={selectedDisease === d ? "selected" : ""}
              onClick={() => {
                setSelectedDisease(d);
                setSelectedSymptom(null);
              }}
            >
              {d}
            </li>
          ))}
        </ul>

        <label>Выберите признак</label>
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
        <label>Отметьте значения</label>
        <ul className="svd-list">
          {(valuesBySymptom[selectedSymptom] || []).map((val, i) => (
            <li
              key={i}
              className={
                getValuesForCurrent().includes(val) ? "selected" : ""
              }
              onClick={() => handleValueToggle(val)}
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
