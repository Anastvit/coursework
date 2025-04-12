import React, { useState } from "react";
import "./DiagnosisEngine.css";

const DiagnosisEngine = ({ knowledgeBase }) => {
  const {
    symptoms = [],
    symptomValues = {},
    diseases = [],
    clinicalPicture = {},
    symptomValuesByDisease = {},
  } = knowledgeBase;

  // Храним значения, выбранные пользователем: { признак: значение }
  const [values, setValues] = useState({});
  // Храним выбранные признаки по чекбоксам
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  // Активный признак в селекте для указания значения
  const [activeSymptom, setActiveSymptom] = useState("");
  // Результат диагностики — теперь массив диагнозов с совпадениями
  const [diagnosisResults, setDiagnosisResults] = useState([]);

  // Функция для переключения выбранного признака
  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) => {
      const updated = prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom];
      // Если активный признак перестал быть выбранным, очищаем его
      if (!updated.includes(activeSymptom)) {
        setActiveSymptom("");
      }
      return updated;
    });
    // Если значение уже задано для данного симптома, удаляем его
    setValues((prev) => {
      const updated = { ...prev };
      if (updated[symptom]) {
        delete updated[symptom];
      }
      return updated;
    });
  };

  // Установить значение для активного признака
  const setValue = (symptom, value) => {
    setValues((prev) => ({
      ...prev,
      [symptom]: value,
    }));
  };

  // Новая функция, которая анализирует введённые значения и выводит список диагнозов
  const handleDiagnosis = () => {
    // Массив для хранения результатов: { disease, matchCount, totalCriteria, percentage }
    const results = [];

    for (const disease of diseases) {
      const diseaseSymptoms = clinicalPicture[disease] || [];
      let matchCount = 0;
      let criteriaCount = diseaseSymptoms.length;

      // Для каждого симптома из клинической картины пытаемся сравнить
      for (const symptom of diseaseSymptoms) {
        // Если симптом не выбран или не введено значение – считаем, что критерий не выполнен
        if (!selectedSymptoms.includes(symptom) || !values[symptom]) continue;
        const expectedValues = symptomValuesByDisease[disease]?.[symptom];
        const actualValue = values[symptom];
        const isMatch = Array.isArray(expectedValues)
          ? expectedValues.includes(actualValue)
          : expectedValues === actualValue;
        if (isMatch) {
          matchCount++;
        }
      }

      // Если есть хоть одно совпадение, добавляем диагноз в список
      if (matchCount > 0) {
        results.push({
          disease,
          matchCount,
          criteriaCount,
          percentage: criteriaCount
            ? Math.round((matchCount / criteriaCount) * 100)
            : 0,
        });
      }
    }

    // Если результатов нет, значит ни один критерий не совпал – считаем, что диагноз "здоров"
    if (results.length === 0) {
      setDiagnosisResults([{ disease: "здоров", matchCount: 0, percentage: 0 }]);
      return;
    }

    // Сортируем по проценту совпадения в порядке убывания
    results.sort((a, b) => b.percentage - a.percentage);
    setDiagnosisResults(results);
  };

  return (
    <div className="diagnosis-container">
      <div className="left-section">
        <h3>Отметьте признаки для ввода исходных данных</h3>
        <div className="checkbox-list">
          {symptoms.map((symptom, i) => (
            <label key={i}>
              <input
                type="checkbox"
                checked={selectedSymptoms.includes(symptom)}
                onChange={() => toggleSymptom(symptom)}
              />
              {symptom}
            </label>
          ))}
        </div>

        <h3>Выберите признак для указания значения</h3>
        <select
          onChange={(e) => setActiveSymptom(e.target.value)}
          value={activeSymptom || ""}
        >
          <option value="">-- выберите --</option>
          {selectedSymptoms.map((s, i) => (
            <option key={i} value={s}>
              {s}
            </option>
          ))}
        </select>

        <h3>Укажите значение для выбранного признака</h3>
        <select
          onChange={(e) => setValue(activeSymptom, e.target.value)}
          value={values[activeSymptom] || ""}
          disabled={!activeSymptom}
        >
          <option value="">-- выберите --</option>
          {(symptomValues[activeSymptom] || []).map((v, i) => (
            <option key={i} value={v}>
              {v}
            </option>
          ))}
        </select>

        <button className="green-btn" onClick={handleDiagnosis}>
          Диагноз
        </button>
      </div>

      <div className="right-section">
        <h3>Сводная таблица введённых признаков</h3>
        <table>
          <thead>
            <tr>
              <th>Признак</th>
              <th>Значение</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(values).map(([symptom, value], i) => (
              <tr key={i}>
                <td>{symptom}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="diagnosis-result">
          <h3>Возможные диагнозы:</h3>
          {diagnosisResults.length > 0 ? (
            <ul>
              {diagnosisResults.map((res, i) => (
                <li key={i}>
                  {res.disease} – Совпадений: {res.matchCount} из {res.criteriaCount || "?"}{" "}
                  ({res.percentage}%)
                </li>
              ))}
            </ul>
          ) : (
            <p>Диагноз не определён</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiagnosisEngine;
