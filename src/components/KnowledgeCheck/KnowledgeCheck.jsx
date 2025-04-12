import React, { useState } from "react";
import "./KnowledgeCheck.css";

const KnowledgeCheck = ({ knowledgeBase }) => {
  const {
    diseases = [],
    clinicalPicture = {},
    symptomValues = {},
    normalValues = {},
    symptomValuesByDisease = {},
  } = knowledgeBase;

  const [selectedDisease, setSelectedDisease] = useState(diseases[0] || "");

  const relatedSymptoms = clinicalPicture[selectedDisease] || [];

  const symptomChecks = relatedSymptoms.map((symptom) => {
    const hasValues = (symptomValues[symptom] || []).length > 0;
    const hasNormal = normalValues[symptom] !== undefined;
    const usedInDisease = symptomValuesByDisease[selectedDisease]?.[symptom];
    return {
      name: symptom,
      complete: hasValues && hasNormal && usedInDisease,
    };
  });

  const allSymptomsValid = symptomChecks.every((s) => s.complete);

  return (
    <div className="knowledge-check">
      <div className="check-columns">
        {/* Левая колонка */}
        <div className="check-list">
          <div className="box">
            <div className="check-title">Заболевание:</div>
            <select
              className="disease-select"
              value={selectedDisease}
              onChange={(e) => setSelectedDisease(e.target.value)}
            >
              {diseases.map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <ul>
              <li className="check-result">
                {allSymptomsValid
                  ? "Все признаки заполнены"
                  : "Не все признаки заполнены"}
                <span className={allSymptomsValid ? "check ok" : "check fail"}>
                  {allSymptomsValid ? "✔" : "✖"}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Правая колонка */}
        <div className="check-list">
          <div className="box">
            <div className="check-title">Признаки заболевания</div>
            <ul>
              {symptomChecks.map((s, i) => (
                <li key={i}>
                  {s.name}
                  <span className={s.complete ? "check ok" : "check fail"}>
                    {s.complete ? "✔" : "✖"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div
        className={`status ${allSymptomsValid ? "success" : "error"}`}
      >
        {allSymptomsValid ? "Раздел заполнен" : "Раздел не заполнен"}
      </div>
    </div>
  );
};

export default KnowledgeCheck;
