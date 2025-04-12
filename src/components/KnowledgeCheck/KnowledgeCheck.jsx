import React from "react";
import "./KnowledgeCheck.css";

const KnowledgeCheck = () => {
  // 🔧 Моковые данные — в будущем заменим на реальную проверку
  const diseases = [
    { name: "Перелом", complete: true },
    { name: "Вывих", complete: true },
    { name: "Травма мышц и сухожилий", complete: false }
  ];

  const symptoms = [
    { name: "Острая боль", complete: true },
    { name: "Локализация", complete: true },
    { name: "Степень повреждений", complete: true },
    { name: "Хруст при попытке движения", complete: false },
    { name: "Ненормальная подвижность", complete: false }
  ];

  const isSectionComplete =
    diseases.every((d) => d.complete) && symptoms.every((s) => s.complete);

  return (
    <div className="knowledge-check">
      <div className="check-columns">
        <div className="check-list">
          <div className="check-title">Заболевания</div>
          <ul>
            {diseases.map((d, i) => (
              <li key={i}>
                {d.name}
                <span className={d.complete ? "check ok" : "check fail"}>
                  {d.complete ? "✔" : "✖"}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="check-list">
          <div className="check-title">Признаки</div>
          <ul>
            {symptoms.map((s, i) => (
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

      <div className={`status ${isSectionComplete ? "success" : "error"}`}>
        {isSectionComplete ? "Раздел заполнен" : "Раздел не заполнен"}
      </div>
    </div>
  );
};

export default KnowledgeCheck;
