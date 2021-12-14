import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { httpService, loggedInUser } from '../../data/services';

export default function StudentsPerformance() {
  const { studentId } = useParams();
  const [student, setStudent] = useState({});
  const [results, setResults] = useState([]);
  const [testTypes, setTestTypes] = useState([]);

  async function FetchStudent() {
    const path = `users/findUser/${studentId}`;
    const res = await httpService.get(path);

    if (res) {
      setStudent(res.data.user);
    }
  }
  async function FetchStudentResults() {
    const path = `classTeacher/studentsPerformance/${studentId}`;
    const res = await httpService.get(path);

    if (res && res.data) {
      console.log(res.data);

      setResults(res.data.totalResults);
    }
  }

  async function GetTestTypes() {
    const path = 'testType';
    const res = await httpService.get(path);
    if (res) {
      console.log(res.data);
      setTestTypes(res.data.testTypes);
    }
  }

  useEffect(() => {
    FetchStudent();
    FetchStudentResults();
    GetTestTypes();
  }, []);
  return (
    <div className="p-3">
      <div className="resultBanner text-white shadow">
        <div className="p-5">
          <div className="text-center">
            <div className="h1">{student.fullName}</div>
          </div>
        </div>
      </div>
      <div className="col-md-3 p-3">
        {`${loggedInUser.level.level} result for ${
          loggedInUser.currentTerm.term
        }, ${loggedInUser.currentSession.session.replace(
          '-',
          '/'
        )} academic session.`}
      </div>
      <div className="mt-3">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Subject</th>
              {testTypes.map((testType, index) => (
                <th key={index}>{testType.testType}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.title}</td>
                {result.scores.map((score) => (
                  <td className="text-center">{score.score}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
