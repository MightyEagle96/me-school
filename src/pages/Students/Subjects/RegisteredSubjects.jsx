import React, { useState, useEffect } from 'react';

import { httpService } from '../../../data/services';

import Swal from 'sweetalert2';
import { MyTable } from '../../../assets/aesthetics/MyTable';

export const RegisteredSubjects = () => {
  /**
   * First of all fetch the subjects
   */
  const [subjects, setSubjects] = useState([]);
  const [userData, setUserData] = useState({
    currentTerm: { term: '' },
    currentSession: { session: '' },
    level: { level: '' },
  });
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [loading, setLoading] = useState(false);
  const [registeredSubjects, setRegisteredSubjects] = useState([]);

  const fetchRegisteredSubjects = async () => {
    setLoading(true);
    const path = '/class/viewRegisteredSubject';
    const res = await httpService.get(path);
    if (res) {
      setLoading(false);
      setRegisteredSubjects(res.data.registeredSubject.subjects);
    } else setLoading(false);
  };
  const fetchSubjects = async () => {
    setLoading(true);
    const path = 'subjects/view';
    const res = await httpService.get(path);
    console.log(res.data);
    if (res) {
      setUserData(res.data.userData);
      setSubjects(res.data.subjects);
      setLoading(false);
    } else setLoading(false);
  };

  async function postSubjects() {
    setLoading(true);
    const subjectIds = [];
    for (let i = 0; i < selectedSubject.length; i++) {
      subjectIds.push(selectedSubject[i]._id);
    }
    const path = '/class/registerSubject';
    const body = { subjects: subjectIds };
    const res = await httpService.post(path, body);
    if (res) {
      Swal.fire({ icon: 'success', text: 'Subjects registered' }).then(() => {
        //  fetchRegisteredSubjects();
      });
    }
  }
  const registerSubjects = () => {
    Swal.fire({
      icon: 'question',
      title: 'Cross check',
      text: `Are you sure you want to register ${
        selectedSubject.length > 1 ? 'these subjects?' : 'this subject?'
      }\nThis cannot be undone, till you contact your administrator.`,
      showCancelButton: true,
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        postSubjects();
      }
    });
  };

  useEffect(() => {
    fetchRegisteredSubjects();
    fetchSubjects();
  }, []);

  const columns = [
    { title: 'Subject', field: 'title' },
    {
      title: 'Add',
      field: '_id',
      render: (rowData) => (
        <button className="btn btn-success btn-sm">Add</button>
      ),
    },
  ];

  // const isRegistered = (subjectId) => {
  //   if (subjectId && registeredSubjects) {
  //     const findSubject = registeredSubjects.find((regSubject) => {
  //       return regSubject.subject._id === subjectId;
  //     });
  //     if (findSubject) return true;
  //     else return false;
  //   } else return false;
  // };
  return (
    <div>
      <div className="mt-3">
        <div className="h4 mb-4 text-primary">
          Register your subjects for the session
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="shadow-lg rounded p-4">
              <MyTable
                title="Available Subjects"
                data={subjects}
                columns={columns}
              ></MyTable>
            </div>
          </div>
          <div className="col-md-6">
            <div className="shadow-lg rounded p-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
  // return (
  // <div>
  //   <div>
  //     <div class="mt-3">
  //       <div className="alert alert-secondary">
  //         <div className="h3">REGISTER SUBJECTS</div>
  //       </div>
  //       <div className="alert alert- shadow col-md-4">
  //         <h5>Term: {userData.currentTerm.term}</h5>
  //         <h5>Session: {userData.currentSession.session}</h5>
  //         <h5>Class:{userData.level.level}</h5>
  //       </div>
  //       <div>
  //         <div>
  //           <IsLoading show={loading} />
  //         </div>
  //         <div className="d-flex flex-wrap border border-pink p-3">
  //           <div className="col-md-4 ">
  //             <div className="">
  //               <div className="h4">
  //                 Add the subjects you will be offering for this term
  //               </div>
  //               {subjects.map((subject, index) => {
  //                 return (
  //                   <div class="form-check mb-3">
  //                     {isRegistered(subject._id) ? (
  //                       <div>
  //                         {' '}
  //                         <input
  //                           class="form-check-input"
  //                           type="checkbox"
  //                           value=""
  //                           name={subject.title}
  //                           id={subject._id}
  //                           checked
  //                           disabled
  //                         />
  //                         <label class="form-check-label" for={subject._id}>
  //                           {subject.title}
  //                         </label>
  //                       </div>
  //                     ) : (
  //                       <div>
  //                         {' '}
  //                         <input
  //                           class="form-check-input"
  //                           type="checkbox"
  //                           value=""
  //                           name={subject.title}
  //                           id={subject._id}
  //                           onClick={(e) => {
  //                             if (e.target.checked === true) {
  //                               const data = selectedSubject.find(
  //                                 (subject) => {
  //                                   return subject.title === e.target.name;
  //                                 }
  //                               );
  //                               if (!data) {
  //                                 setSelectedSubject((oldArray) => [
  //                                   ...oldArray,
  //                                   subject,
  //                                 ]);
  //                               }
  //                             } else {
  //                               const filtered = selectedSubject.filter(
  //                                 (subject) => {
  //                                   return subject.title !== e.target.name;
  //                                 }
  //                               );
  //                               setSelectedSubject(filtered);
  //                             }
  //                           }}
  //                         />
  //                         <label class="form-check-label" for={subject._id}>
  //                           {subject.title}
  //                         </label>
  //                       </div>
  //                     )}
  //                   </div>
  //                 );
  //               })}
  //             </div>
  //           </div>
  //           <div className="col-md-4 border-left">
  //             {selectedSubject.length > 0 ? (
  //               <div>
  //                 <div className="h4 mb-2">SELECTED SUBJECTS</div>
  //                 {selectedSubject.map((subject, index) => {
  //                   return <h5 key={index}>{subject.title}</h5>;
  //                 })}
  //                 <div>
  //                   <button
  //                     className="btn btn-pink"
  //                     onClick={registerSubjects}
  //                   >
  //                     {selectedSubject.length > 1
  //                       ? 'Register these subjects'
  //                       : 'Register this subject'}
  //                   </button>
  //                 </div>
  //               </div>
  //             ) : (
  //               <div className="alert alert-secondary">
  //                 These are the subjects you have registered for the term
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>
  //);
};
