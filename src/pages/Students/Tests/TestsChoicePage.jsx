import React, { useState, useEffect } from 'react';
import ExamChoiceItem from '../../../components/ExamCards/ExamChoiceItem';
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/Navbar/Navbar';
import { StudentSideMenu } from '../../../components/SideMenu/StudentSideMenu/StudentSideMenu';
import { httpService } from '../../../data/services';

export default function TestsChoicePage() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  //fetch registered subjects
  const fetchRegisteredSubjects = async () => {
    setLoading(true);
    const path = '/class/viewRegisteredSubject';
    const res = await httpService.get(path);
    if (res) {
      setLoading(false);
      setSubjects(res.data.registeredSubject.subjects);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegisteredSubjects();
  }, []);
  return (
    <div>
      <Navbar></Navbar>
      <div className="row">
        <div className="col-md-3">
          <StudentSideMenu />
        </div>
        <div className="col-md-9">
          <div className="alert alert-secondary text-center h3">
            CHOOSE A TEST OR AN EXAMINATION YOU WISH TO SIT FOR
          </div>
          <div>
            <div className="d-flex flex-wrap">
              {subjects.map((subject, index) => {
                return (
                  <div key={index} className="mb-3">
                    <ExamChoiceItem subject={subject} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
