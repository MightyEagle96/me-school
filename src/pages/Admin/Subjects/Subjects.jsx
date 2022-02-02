import React, { useState, useEffect } from 'react';

import { httpService } from '../../../data/services';
import { IsLoading } from '../../../assets/aesthetics/IsLoading';
import Swal from 'sweetalert2';
import { useAlert } from 'react-alert';

export default function Subjects() {
  const defaultData = { title: '', category: '' };
  const [subject, setSubject] = useState(defaultData);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const alert = useAlert();

  const createSubject = async () => {
    if (subject.title === '' && subject.category === '') {
      setLoading(false);
      return Swal.fire({
        icon: 'warning',
        text: 'Please select a subject and a category',
      });
    }

    Swal.fire({
      icon: 'question',
      text: 'Do you want to create this subject? This is a critical action please confirm',
      showCancelButton: true,
      cancelButtonText: "No don't create",
      confirmButtonText: 'Yes create',
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const path = 'subjects/add';

        const res = await httpService.post(path, subject);
        if (res) {
          setLoading(false);
          viewSubjects();
          setSubject(defaultData);
          Swal.fire({ icon: 'success', text: 'Subject created successfully' });
        } else {
          setLoading(false);
          Swal.fire({
            icon: 'info',
            text: 'Something occurred, cannot process request at this time',
          });
        }
      }
    });
  };

  const updateSubject = async () => {
    const path = `subjects/update/${subject._id}`;

    const res = await httpService.patch(path, subject);
    if (res) {
      alert.success(res.data.message);
      setSubject(defaultData);
      viewSubjects();
    }
  };
  const viewSubjects = async () => {
    setLoading(true);
    const path = 'subjects/view';
    const res = await httpService.get(path);
    if (res && res.data) {
      setLoading(false);

      setSubjects(res.data.subjects);
    } else {
      alert.error('Something occurred, cannot process request at this time');
    }
  };

  const deleteSubject = async (subjectId, subjectName) => {
    Swal.fire({
      icon: 'question',
      text: 'Do you want to delete this subject? This is a critical action and can greatly impact the system',
      confirmButtonText: 'Yes delete',
      cancelButtonText: "No don't delete",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          titleText: `Type "${subjectName}" in the field below`,
          input: 'text',
        }).then(async (result) => {
          if (result.value === subjectName) {
            const path = `subjects/delete/${subjectId}`;
            const res = await httpService.delete(path);

            if (res) {
              Swal.fire({ icon: 'success', text: res.data.message });
              viewSubjects();
            }
          } else {
            Swal.fire({
              icon: 'info',
              text: 'Text does not match.\nProcess aborted',
            });
          }
        });
      }
    });
  };

  const viewSubject = async (subjectId) => {
    const path = `subjects/view/${subjectId}`;
    const res = await httpService(path);
    if (res) {
      setSubject(res.data.subject);
    } else {
      alert.error('Something happened. Try again later');
    }
  };
  useEffect(() => {
    viewSubjects();
  }, []);

  return (
    <div>
      <div className="shadow-lg mr-2">
        <div className="p-3">
          <div className="h3" style={{ fontWeight: 400 }}>
            AVAILABLE SUBJECTS
          </div>
          <hr />

          <div className="row">
            <div className="col-md-8 p-3">
              <IsLoading color={'text-primary'} />
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>SUBJECT</th>
                    <th>JUNIOR</th>
                    <th>SENIOR</th>
                    <th>BOTH</th>
                    <th>EDIT</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((sub, index) => {
                    return (
                      <tr key={index}>
                        <td>{sub.subject.title}</td>
                        <td className="text-center">
                          {sub.subject.category === 'junior' ? (
                            <i class="fas fa-check  text-success  "></i>
                          ) : (
                            '-'
                          )}
                        </td>
                        <td className="text-center">
                          {sub.subject.category === 'senior' ? (
                            <i class="fas fa-check  text-success  "></i>
                          ) : (
                            '-'
                          )}
                        </td>
                        <td className="text-center">
                          {sub.subject.category === 'both' ? (
                            <i class="fas fa-check  text-success  "></i>
                          ) : (
                            '-'
                          )}
                        </td>
                        <td className="text-center">
                          <button
                            className="btn btn-info"
                            onClick={() => {
                              viewSubject(sub.subject._id);
                            }}
                          >
                            <i class="fas fa-edit    "></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                {/* <tfoot>
                  <tr>
                    <td colSpan={5}>Helo</td>
                  </tr>
                </tfoot> */}
              </table>
            </div>
            <div className=" col-md-4 p-3">
              <div className=" ">
                <h4 className="text-primary" style={{ fontWeight: 400 }}>
                  Add a new subject
                </h4>
                <div className="mt-2 mb-2">
                  <input
                    className="form-control"
                    name="subject"
                    placeholder="Subject name"
                    onChange={(e) => {
                      setSubject({ ...subject, title: e.target.value });
                    }}
                    value={subject.title}
                  />
                </div>
                <div className="mb-2">
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setSubject({ ...subject, category: e.target.value });
                    }}
                    name="category"
                    value={subject.category}
                  >
                    <option value="">Select a category for the subject</option>
                    <option value="junior">Junior</option>
                    <option value="senior">Senior</option>
                    <option value="both">Both</option>
                  </select>
                </div>
                <div>
                  {subject._id ? (
                    <button className="btn btn-warning" onClick={updateSubject}>
                      {loading ? (
                        <IsLoading color={'text-white'} show={loading} />
                      ) : (
                        'Update Subject'
                      )}
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary "
                      onClick={createSubject}
                    >
                      {loading ? (
                        <IsLoading color={'text-white'} show={loading} />
                      ) : (
                        'Create Subject'
                      )}
                    </button>
                  )}
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
