import React, { useState, useEffect } from 'react';

import { httpService } from '../../../data/services';
import { IsLoading } from '../../../assets/aesthetics/IsLoading';

export default function Subjects() {
  const defaultData = { title: '', category: '' };
  const [subject, setSubject] = useState(defaultData);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const createSubject = async () => {
    setLoading(true);
    if (subject.title === '' && subject.category === '') {
      setLoading(false);
      return alert('Please enter a subject name and select a category');
    }

    const path = 'subjects/add';
    const res = await httpService.post(path, subject);
    if (res) {
      setLoading(false);
      viewSubjects();
      setSubject(defaultData);
    }
  };

  const viewSubjects = async () => {
    setLoading(true);
    const path = 'subjects/view';
    const res = await httpService.get(path);
    if (res) {
      setLoading(false);
      setSubjects(res.data.subjects);
    }
  };

  useEffect(() => {
    viewSubjects();
  }, []);

  return (
    <div>
      <div className="pr-3">
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
                {subjects.map((sub) => {
                  return (
                    <tr>
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
                        <button className="btn btn-danger btn-sm">
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
                <IsLoading show={loading} />
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
  );
}
