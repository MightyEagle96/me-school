import React, { useState, useEffect } from 'react';
import { httpService } from '../../../data/services';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import { StaffSideMenu } from '../../../components/SideMenu/StaffSideMenu/StaffSideMenu';
import { SetExamChoiceItem } from '../../../components/ExamCards/SetExamChoiceItem';

export default function ExamChoicePage() {
  const [subjects, setSubjects] = useState([]);

  async function getSubjects() {
    const path = 'subjects';
    const res = await httpService.get(path);
    if (res) {
      setSubjects(res.data.subjects);
    } else {
      console.log('error');
    }
  }

  useEffect(() => {
    getSubjects();
  }, []);
  return (
    <div>
      <Navbar></Navbar>
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
            <div className="d-flex flex-wrap">
              {subjects.map((subject, index) => {
                return <SetExamChoiceItem key={index} {...subject} />;
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
