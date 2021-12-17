import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { loggedInUser, httpService } from '../../data/services';

export default function StudentsPerformancePage() {
  const [message, setMessage] = useState(false);
  const [subjectClassCombination, setSubjectClassCombination] = useState([]);
  const [studentsOfferingMySubject, setStudentsofferingMySubject] = useState(
    []
  );
  const [studentInView, setStudentInView] = useState(null);
  const [subjectToSearch, setSubjectToSearch] = useState(null);
  const [results, setResults] = useState([]);

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
  async function StudentsOfferingMySubjects(subject, level) {
    const path = `academics/studentsOfferingMyCourse?subject=${subject}&level=${level}`;

    const res = await httpService.get(path);

    if (res) {
      // console.log(res.data);
      if (res.data.studentsOfferingMySubject.length === 0) {
        Swal.fire({
          icon: 'info',
          text: 'There are no students offering your subject for this class',
        });
      }
      setStudentsofferingMySubject(res.data.studentsOfferingMySubject);
      setStudentInView(null);
    }
  }

  async function GetResults(userId) {
    const path = `student/result?subject=${subjectToSearch.subject._id}&user=${userId}&level=${subjectToSearch.level._id}`;

    const res = await httpService.get(path);

    if (res) {
      if (res.data.result.length === 0) {
        Swal.fire({ icon: 'info', text: 'This student has no results.' });
      }
      setResults(res.data.result);
    }
  }
  useEffect(() => {
    GetSubjects();
  }, []);
  return (
    <div>
      <div className="p-3">
        <div className="border border-default p-3 mb-4">
          <div className="h3">Student's Subject Performance</div>
          <p>
            This page contains performance data about students that offer the
            subject you teach.
          </p>
          <p>
            Click on the{' '}
            <span>
              <strong>view students</strong> button to reveal the students in a
              particular class that offer your subject.
            </span>
          </p>
        </div>
        <div className="row">
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
                      <button
                        className="btn btn-info"
                        onClick={() => {
                          StudentsOfferingMySubjects(
                            d.subject._id,
                            d.level._id
                          );
                          setSubjectToSearch({
                            subject: d.subject,
                            level: d.level,
                          });
                        }}
                      >
                        View Students
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {studentsOfferingMySubject.length > 0 ? (
            <div className="col-md-6">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {studentsOfferingMySubject.map((s, index) => (
                    <tr key={index}>
                      <td>{s.fullName}</td>
                      <td>
                        <button
                          className="btn btn-secondary"
                          onClick={() => {
                            setStudentInView(s);
                            GetResults(s._id);
                          }}
                        >
                          View Result
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            ''
          )}
        </div>
        <hr />
        <div className="col-md-6 ">
          {studentInView && subjectToSearch ? (
            <div className="border border-default p-3">
              <div className="h5">
                <i class="fas fa-user-graduate    "></i> :{' '}
                {studentInView.fullName}
              </div>
              <div className="h5">
                <i class="fas fa-clock    "></i> :{' '}
                {loggedInUser.currentTerm.term}
              </div>
              <div className="h5">
                <i class="fas fa-calendar    "></i> :{' '}
                {loggedInUser.currentSession.session.replace('-', '/')} session
              </div>
              <div className="h5">
                <i class="fas fa-book-open    "></i> :{' '}
                {subjectToSearch.subject.title}
              </div>
              {results.map((r, index) => (
                <div
                  key={index}
                  className="p-3 mb-2 border border-info rounded"
                >
                  <strong> {r.testType.testType}</strong>
                  <p>{r.score}</p>
                </div>
              ))}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}
