import React, { useState, useEffect } from 'react';
import { httpService } from '../../../data/services';
import { useParams } from 'react-router';
import './ResultsPage.scss';
import { loggedInUser } from '../../../data/services';

export default function ResultsPage() {
  const [results, setResults] = useState([]);

  const [subject, setSubject] = useState({});

  const { id } = useParams();

  async function GetSubject() {
    const path = `subjects/view/${id}`;

    const res = await httpService.get(path);
    if (res) {
      setSubject(res.data.subject);
    }
  }

  async function GetResults() {
    const path = `student/result?subject=${id}`;

    const res = await httpService.get(path);

    if (res) {
      setResults(res.data.result);
    }
  }

  useEffect(() => {
    GetResults();
    GetSubject();
  }, []);

  return (
    <div className="p-3">
      <div className="resultBanner text-white shadow">
        <div className="p-5">
          <div className="text-center">
            <h1>
              {subject && subject.title ? subject.title : 'Subject not found'}
            </h1>
            <h4>
              {' '}
              <strong>
                {' '}
                {`${loggedInUser.level.level} result for ${
                  loggedInUser.currentTerm.term
                }, ${loggedInUser.currentSession.session.replace(
                  '-',
                  '/'
                )} academic session.`}
              </strong>
            </h4>
          </div>
        </div>
      </div>
      <div className="text-center h3 mt-4  p-3">
        Results
        <hr />
      </div>
      <div className="row">
        {results.map((result, index) => (
          <div
            key={index}
            className="col-md-3 p-3 mr-2 mb-2 card shadow rounded"
          >
            <div className="text-black-50">{result.testType.testType}</div>
            <strong>Score: {result.score}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
