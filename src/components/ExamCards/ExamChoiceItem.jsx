import React, { useState, useEffect } from 'react';

import { httpService } from '../../data/services';
import './ExamChoiceItem.scss';

export default function ExamChoiceItem(subject) {
  const [testTypes, setTestTypes] = useState([]);
  //fetch the terms
  const fetchTestTypes = async () => {
    const path = 'testType';
    const res = await httpService.get(path);
    if (res) {
      setTestTypes(res.data.testTypes);
    }
  };

  useEffect(() => {
    fetchTestTypes();
  }, []);

  return (
    <div className="cardWidth mr-3">
      <div className="subjectBanner  text-white">
        <div className="p-3">
          <h3 className="marginText">{subject.subject.subject.title}</h3>
        </div>
      </div>
      <div className="border border-white shadow-lg p-3 selectDiv">
        <div class="dropdown">
          <button
            class="btn btn-dark dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Select test type
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {testTypes.map((testType, index) => {
              return (
                <a
                  key={index}
                  target="_blank"
                  href={`/takeExam/${subject.subject.subject._id}/${testType._id}`}
                  className="dropdown-item"
                  rel="noreferrer"
                >
                  {testType.testType}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
