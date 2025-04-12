import React, { useState } from "react";
import "./DiagnosisEngine.css";

const allSymptoms = [
  "Наличие видимых повреждений",
  "Острая боль",
  "Хруст при попытке движения",
  "Ненормальная подвижность",
  "Локализация",
  "Целостность тканей"
];

const possibleValues = {
  "Наличие видимых повреждений": ["Присутствует", "Отсутствует"],
  "Острая боль": ["Да", "Нет"],
  "Хруст при попытке движения": ["Присутствует", "Отсутствует"],
  "Ненормальная подвижность": ["Да", "Нет"],
  "Локализация": ["Ноги", "Руки", "Голова"],
  "Целостность тканей": ["Нарушена", "Целая"]
};

const knowledgeBase = [
  {
    name: "Перелом",
    conditions: {
      "Наличие видимых повреждений": "Присутствует",
      "Хруст при попытке движения": "Присутствует"
    }
  },
  {
    name: "Вывих",
    conditions: {
      "Ненормальная подвижность": "Да",
      "Локализация": "Руки"
    }
  }
];

const DiagnosisEngine = () => {
  const [selectedInputSymptoms, setSelectedInputSymptoms] = useState([]);
  const [selectedSymptom, setSelectedSymptom] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [table, setTable] = useState([]);
  const [diagnosis, setDiagnosis] = useState(null);

  const toggleInputSymptom = (symptom) => {
    setSelectedInputSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const addToTable = () => {
    if (!selectedSymptom || !selectedValue) return;

    setTable((prev) => {
      const updated = prev.filter((row) => row.symptom !== selectedSymptom);
      return [...updated, { symptom: selectedSymptom, value: selectedValue }];
    });

    setSelectedSymptom("");
    setSelectedValue("");
  };

  const diagnose = () => {
    const inputMap = Object.fromEntries(
      table.map((row) => [row.symptom, row.value])
    );

    const matched = knowledgeBase.find((disease) =>
      Object.entries(disease.conditions).every(
        ([symptom, value]) => inputMap[symptom] === value
      )
    );

    setDiagnosis(matched?.name || "Диагноз не определён");
  };

  return (
    <div className="diagnosis-engine">
      <div className="input-panel">
        <label>Выберите признаки для ввода исходных данных</label>
        <ul className="checkbox-list">
          {allSymptoms.map((s, i) => (
            <li key={i}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedInputSymptoms.includes(s)}
                  onChange={() => toggleInputSymptom(s)}
                />
                {s}
              </label>
            </li>
          ))}
        </ul>

        <label>Выберите признак</label>
        <select
          value={selectedSymptom}
          onChange={(e) => setSelectedSymptom(e.target.value)}
        >
          <option value="">--</option>
          {selectedInputSymptoms.map((s, i) => (
            <option key={i} value={s}>
              {s}
            </option>
          ))}
        </select>

        <label>Укажите значение признака</label>
        <select
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
          disabled={!selectedSymptom}
        >
          <option value="">--</option>
          {(possibleValues[selectedSymptom] || []).map((v, i) => (
            <option key={i} value={v}>
              {v}
            </option>
          ))}
        </select>

        <button onClick={addToTable}>Добавить</button>
      </div>

      <div className="summary-panel">
        <div className="summary-title">Сводная таблица значений признаков</div>
        <table>
          <thead>
            <tr>
              <th>Признак</th>
              <th>Значение</th>
            </tr>
          </thead>
          <tbody>
            {table.map((row, i) => (
              <tr key={i}>
                <td>{row.symptom}</td>
                <td>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="diagnosis-footer">
          <button className="diagnose-btn" onClick={diagnose}>
            Диагноз
          </button>

          {diagnosis && (
            <div className="diagnosis-result">
              <strong>Диагноз:</strong> {diagnosis}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiagnosisEngine;
