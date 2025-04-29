import React, { useState } from "react";
import axios from "axios";
import "./DiagnosisEngine.css";

const DiagnosisEngine = ({ knowledgeBase }) => {
  const {
    symptoms = [],
    symptomValues = {},
    diseases = [],
    clinicalPicture = {},
    symptomValuesByDisease = {},
  } = knowledgeBase;

  // значения, выбранные пользователем: { признак: значение }
  const [values, setValues] = useState({});
  // выбранные признаки по чекбоксам
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  // активный признак в селекте для указания значения
  const [activeSymptom, setActiveSymptom] = useState("");
  //  массив диагнозов с совпадениями
  const [diagnosisResults, setDiagnosisResults] = useState([]);

  // функция для переключения выбранного признака
  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) => {
      const updated = prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom];
      // если активный признак перестал быть выбранным, очищаем его
      if (!updated.includes(activeSymptom)) {
        setActiveSymptom("");
      }
      return updated;
    });
    // если значение уже задано для данного симптома, удаляем его
    setValues((prev) => {
      const updated = { ...prev };
      if (updated[symptom]) {
        delete updated[symptom];
      }
      return updated;
    });
  };

  // установить значение для активного признака
  const setValue = (symptom, value) => {
    setValues((prev) => ({
      ...prev,
      [symptom]: value,
    }));
  };

  // функция для отправки данных на сервер и получения предсказаний
  const handleDiagnosis = async () => {
    try {
      console.log("Выбранные симптомы:", selectedSymptoms); // логирование выбранных симптомов
      console.log("Значения симптомов:", values); // логирование значений симптомов

      //  массив значений симптомов
      const symptomsArray = symptoms.map((symptom) => {
        if (!selectedSymptoms.includes(symptom)) return 0; // если симптом не выбран, значение = 0

        const value = values[symptom];
        switch (symptom) {
          case "степень повреждений":
            return value === "полная" ? 1 : 0;
          case "локализация":
            return { голова: 1, спина: 2, ноги: 3, руки: 4 }[value] || 0;
          case "происхождение":
            return { острый: 1, патологический: 2, привычный: 3 }[value] || 0;
          default:
            return value === "присутствует" ? 1 : 0;
        }
      });

      console.log("Отправляемые данные:", { symptoms: symptomsArray }); // логирование 

      // запрос на API
      const response = await axios.post("http://127.0.0.1:8000/predict", {
        symptoms: symptomsArray,
      });

      console.log("Полученные данные:", response.data); // логирование 

      // \результаты в массив диагнозов
      const predictions = response.data;
      const results = Object.entries(predictions).map(([disease, probability]) => ({
        disease,
        probability: (probability*100).toFixed(4), \
      }));

      console.log("Обработанные результаты:", results); // логирование 

      // обновляем состояние с результатами
      setDiagnosisResults(results);
    } catch (error) {
      console.error("Ошибка при отправке данных:", error.response?.data || error.message);
      alert("Не удалось получить диагноз. Проверьте подключение к серверу.");
    }
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
                  {res.disease} – Вероятность: {res.probability} %
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