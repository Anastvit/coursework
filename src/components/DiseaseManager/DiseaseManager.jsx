import React, { useState } from 'react';
import './DiseaseManager.css';

const DiseaseManager = () => {
  const [diseases, setDiseases] = useState([
    "Перелом",
    "Вывих",
    "Травма мышц и сухожилий"
  ]);
  const [newDisease, setNewDisease] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(null);

  const addDisease = () => {
    if (newDisease.trim() === '') return;
    setDiseases([...diseases, newDisease.trim()]);
    setNewDisease('');
  };

  const removeDisease = () => {
    if (selectedIndex === null) return;
    setDiseases(diseases.filter((_, index) => index !== selectedIndex));
    setSelectedIndex(null);
  };

  return (
    <div className="disease-manager">
      <label>Название заболевания</label>
      <div className="input-row">
        <input
          type="text"
          value={newDisease}
          onChange={(e) => setNewDisease(e.target.value)}
        />
        <button className="add-btn" onClick={addDisease}>+</button>
      </div>

      <label>Список заболеваний</label>
      <div className="list-box">
        <ul>
          {diseases.map((disease, index) => (
            <li
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={selectedIndex === index ? 'selected' : ''}
            >
              {disease}
            </li>
          ))}
        </ul>
        <button className="remove-btn" onClick={removeDisease}>-</button>
      </div>
    </div>
  );
};

export default DiseaseManager;
