import React, { useState, useEffect } from 'react';
import { IsLoading } from '../../../assets/aesthetics/IsLoading';
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/Navbar/Navbar';
import { StudentSideMenu } from '../../../components/SideMenu/StudentSideMenu/StudentSideMenu';
import { httpService } from '../../../data/services';
import { MDBBadge } from 'mdbreact';
export const RegisteredSubjects = () => {
  /**
   * First of all fetch the subjects
   */
  const [subjects, setSubjects] = useState([]);
  const [userData, setUserData] = useState({});
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSubjects = async () => {
    setLoading(true);
    const path = 'subjects';
    const res = await httpService.get(path);
    if (res) {
      setLoading(false);
      setUserData(res.data.userData);
      setSubjects(res.data.subjects);
    }
  };

  const registerSubjects = async () => {
    const subjectIds = [];
    for (let i = 0; i < selectedSubject.length; i++) {
      subjectIds.push(selectedSubject[i]._id);
    }
    const path = '/class/registerSubject';
    const body = { subjects: subjectIds };
    const res = await httpService.post(path, body);
    if (res) {
      console.log(res.data);
    }
  };

  const fetchRegisteredSubjects = async () => {
    const path = '/class/viewRegisteredSubject';
    const res = await httpService.get(path);
    console.log(res);
  };
  useEffect(() => {
    fetchRegisteredSubjects();
    fetchSubjects();
  }, []);
  return (
    <div>
      <Navbar></Navbar>
      <div className="row">
        <div className="col-md-3">
          <StudentSideMenu />
        </div>
        <div className="col-md-9">
          <div class="mt-3">
            <div className="alert alert-secondary">
              <div className="h3">REGISTER SUBJECTS</div>
            </div>
            <div className="alert alert- shadow col-md-4">
              {/* <h5>Term: {userData.currentTerm.term}</h5>
              <h5>Session: {userData.currentSession.session}</h5>
              <h5>Class:{userData.level.level}</h5> */}
            </div>
            <div>
              <div>
                <IsLoading show={loading} />
              </div>
              <div className="d-flex flex-wrap border border-pink p-3">
                <div className="col-md-4 ">
                  <div className="">
                    <div className="h4">
                      Add the subjects you will be offering for this term
                    </div>
                    {subjects.map((subject, index) => {
                      return (
                        <div class="form-check mb-3">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            name={subject.title}
                            id={subject._id}
                            onClick={(e) => {
                              if (e.target.checked === true) {
                                const data = selectedSubject.find((subject) => {
                                  return subject.title === e.target.name;
                                });
                                if (!data) {
                                  setSelectedSubject((oldArray) => [
                                    ...oldArray,
                                    subject,
                                  ]);
                                }
                              } else {
                                const filtered = selectedSubject.filter(
                                  (subject) => {
                                    return subject.title !== e.target.name;
                                  }
                                );
                                setSelectedSubject(filtered);
                              }
                            }}
                          />
                          <label class="form-check-label" for={subject._id}>
                            {subject.title}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="col-md-4 border-left">
                  <div className="h4 mb-2">SELECTED SUBJECTS</div>
                  {selectedSubject.map((subject, index) => {
                    return <h5 key={index}>{subject.title}</h5>;
                  })}
                  <div>
                    <button className="btn btn-pink" onClick={registerSubjects}>
                      Register Subjects
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};
