import React, { useState } from "react";
import KnowledgeBaseEditor from "./pages/KnowledgeBaseEditor/KnowledgeBaseEditor";

const App = () => {
  const [knowledgeBase, setKnowledgeBase] = useState({
    diseases: ["перелом", "вывих", "травма мышц и сухожилий", "здоров"],
    symptoms: [
      "наличие видимых повреждений",
      "степень повреждений",
      "целостность тканей",
      "локализация",
      "происхождение",
      "острая боль",
      "ненормальная подвижность",
      "видимые костные фрагменты",
      "хруст при попытке движения",
      "изменение формы сустава",
      "вынужденное положение конечности",
      "разлитая боль при растяжении",
      "ощущение \"пустоты\" на месте травмы",
      "наличие гематомы"
    ],
    symptomValues: {
      "наличие видимых повреждений": ["присутствует", "отсутствует"],
      "степень повреждений": ["полная", "неполная"],
      "целостность тканей": ["целая", "поврежденная"],
      "локализация": ["голова", "спина", "ноги", "руки"],
      "происхождение": ["острый", "патологический", "привычный"],
      "острая боль": ["присутствует", "отсутствует"],
      "ненормальная подвижность": ["присутствует", "отсутствует"],
      "видимые костные фрагменты": ["присутствует", "отсутствует"],
      "хруст при попытке движения": ["присутствует", "отсутствует"],
      "изменение формы сустава": ["присутствует", "отсутствует"],
      "вынужденное положение конечности": ["присутствует", "отсутствует"],
      "разлитая боль при растяжении": ["присутствует", "отсутствует"],
      "ощущение \"пустоты\" на месте травмы": ["присутствует", "отсутствует"],
      "наличие гематомы": ["присутствует", "отсутствует"]
    },
    normalValues: {
      "наличие видимых повреждений": "отсутствует",
      "степень повреждений": "отсутствует",
      "целостность тканей": "отсутствует",
      "локализация": "отсутствует",
      "происхождение": "отсутствует",
      "острая боль": "отсутствует",
      "ненормальная подвижность": "отсутствует",
      "видимые костные фрагменты": "отсутствует",
      "хруст при попытке движения": "отсутствует",
      "изменение формы сустава": "отсутствует",
      "вынужденное положение конечности": "отсутствует",
      "разлитая боль при растяжении": "отсутствует",
      "ощущение \"пустоты\" на месте травмы": "отсутствует",
      "наличие гематомы": "отсутствует"
    },
    clinicalPicture: {
      здоров: [],
      перелом: [
        "наличие видимых повреждений",
        "степень повреждений",
        "целостность тканей",
        "локализация",
        "происхождение",
        "острая боль",
        "ненормальная подвижность",
        "видимые костные фрагменты",
        "хруст при попытке движения",
        "наличие гематомы"
      ],
      вывих: [
        "наличие видимых повреждений",
        "степень повреждений",
        "целостность тканей",
        "локализация",
        "происхождение",
        "изменение формы сустава",
        "вынужденное положение конечности",
        "острая боль"
      ],
      "травма мышц и сухожилий": [
        "наличие видимых повреждений",
        "степень повреждений",
        "целостность тканей",
        "локализация",
        "происхождение",
        "ощущение \"пустоты\" на месте травмы"
      ]
    },
    symptomValuesByDisease: {
      перелом: {
        "наличие видимых повреждений": "присутствует",
        "острая боль": "присутствует",
        "ненормальная подвижность": "присутствует",
        "видимые костные фрагменты": "присутствует",
        "хруст при попытке движения": "присутствует",
        "наличие гематомы": "присутствует",
        "степень повреждений": ["полная", "неполная"],
        "целостность тканей": ["целая", "поврежденная"],
        "локализация": ["голова", "спина", "руки", "ноги"],
        "происхождение": ["острый", "патологический"]
      },
      вывих: {
        "наличие видимых повреждений": "присутствует",
        "острая боль": "присутствует",
        "изменение формы сустава": "присутствует",
        "вынужденное положение конечности": "присутствует",
        "степень повреждений": ["полная", "неполная"],
        "целостность тканей": ["целая", "поврежденная"],
        "локализация": ["голова", "спина", "руки", "ноги"],
        "происхождение": ["острый", "патологический"]
      },
      "травма мышц и сухожилий": {
        "наличие видимых повреждений": "присутствует",
        "ощущение \"пустоты\" на месте травмы": "присутствует",
        "степень повреждений": ["полная", "неполная"],
        "целостность тканей": ["целая", "поврежденная"],
        "локализация": ["голова", "спина", "руки", "ноги"],
        "происхождение": ["острый", "патологический"]
      },
      здоров: {}
    }
  });
  

  return (
    <KnowledgeBaseEditor
      knowledgeBase={knowledgeBase}
      setKnowledgeBase={setKnowledgeBase}
    />
  );
};

export default App;
