import React, { useState, useEffect } from 'react';
import { loggedInUser } from '../../../data/services';
import { IsLoading } from '../../../assets/aesthetics/IsLoading';
import { httpService } from '../../../data/services';

export default function TermResultsPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [testTypes, setTestTypes] = useState([]);

  async function GetTestTypes() {
    setLoading(true);
    const path = 'testType';
    const res = await httpService.get(path);
    if (res) {
      setLoading(false);
      setTestTypes(res.data.testTypes);
    }
  }

  async function FetchStudentResults() {
    setLoading(true);
    const path = 'student/results/all';
    const res = await httpService.get(path);

    if (res && res.data) {
      setResults(res.data.totalResults);
      setLoading(false);
    }
  }
  useEffect(() => {
    GetTestTypes();
    FetchStudentResults();
  }, []);
  return (
    <div>
      <div className="p-3">
        <div className="resultBanner text-white shadow">
          <div className="p-5">
            <div className="text-center">
              <h3>
                {`${
                  loggedInUser.currentTerm.term
                } results for ${loggedInUser.currentSession.session.replace(
                  '-',
                  '/'
                )} academic session.`}
              </h3>
            </div>
          </div>
        </div>
        <div>
          <IsLoading show={loading} color={'primary'} />
        </div>
        <div className="mt-4">
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
                  {result.scores.map((score, key) => (
                    <td key={key} className="text-center">
                      {score.score}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
