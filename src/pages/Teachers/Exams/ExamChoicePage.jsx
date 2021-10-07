import React, { useState, useEffect } from 'react';
import { httpService } from '../../../data/services';

import { StaffSideMenu } from '../../../components/SideMenu/StaffSideMenu/StaffSideMenu';
import { SetExamChoiceItem } from '../../../components/ExamCards/SetExamChoiceItem';
import { IsLoading } from '../../../assets/aesthetics/IsLoading';
export default function ExamChoicePage() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getSubjects() {
    setLoading(true);
    const path = 'subjects';
    const res = await httpService.get(path);
    if (res) {
      setSubjects(res.data.subjects);
      setLoading(false);
    } else {
      console.log('error');
      setLoading(false);
    }
  }

  useEffect(() => {
    getSubjects();
  }, []);
  return (
    <div>
      <div className="row">
        <div className="col-md-3">
          <StaffSideMenu />
        </div>
        <div className="col-md-9">
          <div className="mt-3 pr-2">
            <div className="alert alert-secondary  ">
              <div className="h4 text-center">
                Choose a subject and a class to set a test, or examination for
              </div>
            </div>
            <hr />
            {loading ? (
              <div className="text-center">
                <div class="spinner-border text-primary" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              ''
            )}
            <div className="d-flex flex-wrap">
              {subjects.map((subject, index) => {
                return <SetExamChoiceItem key={index} {...subject} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
