import React, { useState, useEffect } from 'react';
import { httpService } from '../../data/services';
import { loggedInUser } from '../../data/services';

export default function ExamChoicePage() {
  const [subjectClassCombination, setSubjectClassCombination] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);

  async function GetSubjects() {
    const path = `academics/whoIsAssignedToWhat?teacher=${loggedInUser._id}`;

    const res = await httpService.get(path);

    if (res) {
      if (res.data.whoIsAssignedToWhat.length < 1) {
        setMessage(true);
      } else {
        setSubjectClassCombination(
          res.data.whoIsAssignedToWhat[0].subjectAndLevel
        );
      }
    }
  }
  useEffect(() => {
    GetSubjects();
  }, []);
  return (
    <div>
      <div className="mr-2">
        {message ? (
          <div className="alert alert-danger">
            <div className="h5">
              {' '}
              You are yet to register the subjects and classes you teach.
            </div>
          </div>
        ) : (
          <div>
            <div className="border border-info p-3 bg-info text-white">
              <div className="h3 mb-2">Paper Choice</div>
              <p>Select a subject to set for a class that you registered</p>
            </div>
            <div className="mt-3">
              <div className="col-md-6">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Level</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjectClassCombination.map((d, index) => (
                      <tr key={index}>
                        <td>{d.subject.title}</td>
                        <td>{d.level.level}</td>
                        <td>
                          <a
                            href={`/setExam/${d.subject._id}/${d.level._id}`}
                            className="btn btn-danger"
                          >
                            Go to test page.
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
