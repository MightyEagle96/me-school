import React, { useState, useEffect } from 'react';

import { httpService } from '../../../data/services';
import { IsLoading } from '../../../assets/aesthetics/IsLoading';
import Swal from 'sweetalert2';

export default function Subjects() {
  const defaultData = { title: '', category: '' };
  const [subject, setSubject] = useState(defaultData);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const viewSubjects = async () => {
    setLoading(true);
    const path = 'subjects/view';
    const res = await httpService.get(path);
    if (res && res.data) {
      setLoading(false);

      setSubjects(res.data.subjects);
    } else {
      setLoading(false);
      Swal.fire({
        icon: 'info',
        text: 'Something occurred, cannot process request at this time',
      });
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
  useEffect(() => {
    viewSubjects();
  }, []);

  return (
    <div>
      <div className="shadow-lg pr-3">
        <div className="p-3">
          <div className="h3">Available Subjects</div>
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
                    <th>Action</th>
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
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              deleteSubject(sub.subject._id, sub.subject.title);
                            }}
                          >
                            <i class="fas fa-trash    "></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className=" col-md-4 p-3">
              <div className="border border-primary p-3">
                <h4 className="text-primary">Add a new subject</h4>
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
                  >
                    <option value="">Select a category for the subject</option>
                    <option value="junior">Junior</option>
                    <option value="senior">Senior</option>
                    <option value="both">Both</option>
                  </select>
                </div>
                <div>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={createSubject}
                  >
                    Create Subject
                  </button>{' '}
                  <IsLoading color={'text-primary'} show={loading} />
                </div>
              </div>
              <hr />
              <div className="alert alert-primary p-3">
                <h4>LEGEND</h4>
                {subjects.length > 0 ? (
                  <div>
                    <div>
                      Junior category <i class="fas fa-arrow-down    "></i>:{' '}
                      <strong>
                        {
                          subjects.filter((sub) => {
                            return sub.category === 'junior';
                          }).length
                        }
                      </strong>
                    </div>
                    <div>
                      Senior category <i class="fas fa-arrow-up    "></i>:{' '}
                      <strong>
                        {
                          subjects.filter((sub) => {
                            return sub.category === 'senior';
                          }).length
                        }
                      </strong>
                    </div>
                    <div>
                      Both <i class="fas fa-recycle  "></i>:{' '}
                      <strong>
                        {
                          subjects.filter((sub) => {
                            return sub.category === 'both';
                          }).length
                        }
                      </strong>
                    </div>
                    <div>
                      Total Number of Subjects:{' '}
                      <span>
                        {' '}
                        <strong>{subjects.length}</strong>
                      </span>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
