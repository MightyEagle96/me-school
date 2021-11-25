import React, { useState, useEffect } from 'react';
import { httpService } from '../../../data/services';
import Swal from 'sweetalert2';
import { MyTable } from '../../../assets/aesthetics/MyTable';
import SubjectCard from './SubjectCard';
import SubjectListItem from './SubjectListItem';

export const RegisteredSubjects = () => {
  const [subjects, setSubjects] = useState([]);

  const [loading, setLoading] = useState(false);

  const [userSelectedSubject, setUserSelectedSUbject] = useState([]);

  const [registeredSubjects, setRegisteredSubjects] = useState([]);

  const fetchSubjects = async () => {
    setLoading(true);
    const path = 'subjects/view';
    const res = await httpService.get(path);

    if (res) {
      setSubjects(res.data.subjects);
      setLoading(false);
    } else setLoading(false);
  };

  const columns = [
    { title: 'Subject', field: 'title' },
    {
      title: 'Add',
      field: '_id',
      render: (rowData) => (
        <button
          className="btn btn-success btn-sm"
          onClick={() => {
            const confirmExistence = userSelectedSubject.find((d) => {
              return d._id === rowData._id;
            });

            if (!confirmExistence)
              setUserSelectedSUbject((oldArray) => [...oldArray, rowData]);
          }}
        >
          Add
        </button>
      ),
    },
  ];
  async function FetchRegisteredSubjects() {
    const path = 'subjectRegistration/viewRegisteredSubject';

    const res = await httpService.get(path);

    if (res && res.data.registeredSubjects.subjects) {
      setRegisteredSubjects(res.data.registeredSubjects.subjects);
    }
  }

  async function RegisterSubjects() {
    Swal.fire({
      icon: 'question',
      confirmButtonText: 'Yes Register',
      cancelButtonText: "No don't register",
      title: 'Confirm',
      text: 'Do you wish to register these subjects? It cannot be undone after now',
      showCancelButton: true,
      showConfirmButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const path = 'subjectRegistration/registerSubject';

        const res = await httpService.post(path, userSelectedSubject);

        if (res) {
          FetchRegisteredSubjects();
          Swal.fire({ icon: 'success', title: res.data.message });
        }
      }
    });
  }

  useEffect(() => {
    fetchSubjects();
    FetchRegisteredSubjects();
  }, []);
  return (
    <div>
      <div className="mt-3">
        {registeredSubjects.length > 0 ? (
          <div className="row">
            <div className="col-md-5">
              {registeredSubjects.map((data) => {
                return <SubjectListItem subject={data} key={data._id} />;
              })}
            </div>
            <div className="d-flex align-items-center col-md-7 ">
              <div className="h5 text-primary ">
                These are you registered subjects for the session.
                <br /> You can view your performance for each subject by
                clicking on the view result button
              </div>
            </div>
          </div>
        ) : (
          <div>
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
                <div className="shadow-lg rounded p-4">
                  <div className="h4 text-primary mb-4">Subjects Added</div>
                  <div>
                    {userSelectedSubject.map((data, index) => {
                      return (
                        <SubjectCard
                          data={data}
                          key={index}
                          updateArray={setUserSelectedSUbject}
                          array={userSelectedSubject}
                        />
                      );
                    })}
                  </div>
                  {userSelectedSubject.length > 0 ? (
                    <div className="form-group">
                      <button
                        className="btn btn-success"
                        onClick={RegisterSubjects}
                      >
                        Register subjects
                      </button>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
