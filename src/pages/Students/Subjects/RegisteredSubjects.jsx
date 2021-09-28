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
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSubjects = async () => {
    setLoading(true);
    const path = 'subjects';
    const res = await httpService.get(path);
    if (res) {
      setLoading(false);
      setSubjects(res.data.subjects);
    }
  };
  useEffect(() => {
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
              <div className="h3">Subjects available for your class</div>
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
                    return <h4 key={index}>{subject.title}</h4>;
                  })}
                  <div>
                    <button className="btn btn-pink">Register Subjects</button>
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
