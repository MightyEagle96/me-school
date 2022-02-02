import React, { useState, useEffect } from 'react';
import ExamChoiceItem from '../../../components/ExamCards/ExamChoiceItem';

import { httpService } from '../../../data/services';

export default function TestsChoicePage() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  //fetch registered subjects
  const fetchRegisteredSubjects = async () => {
    setLoading(true);
    const path = 'subjectRegistration/viewRegisteredSubject';
    const res = await httpService.get(path);
    if (res && res.data.registeredSubjects.subjects) {
      setLoading(false);
      setSubjects(res.data.registeredSubjects.subjects);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegisteredSubjects();
  }, []);
  return (
    <div className="">
      <div
        className="h4 text-secondary shadow-lg p-3"
        style={{ fontWeight: 400 }}
      >
        Choose a subject from the available subjects you have registered
      </div>
      <div>
        {subjects.length > 0 ? (
          <div className="d-flex flex-wrap">
            {subjects.map((subject, index) => {
              return subject.subject ? (
                <div key={index} className="mb-3">
                  <ExamChoiceItem subject={subject} />
                </div>
              ) : (
                ''
              );
            })}
          </div>
        ) : (
          <div className="p-5">
            <div className="h4 text-center text-dark">
              You have not yet registered any subject
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
