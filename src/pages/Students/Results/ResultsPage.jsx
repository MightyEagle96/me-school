import React, { useState, useEffect } from 'react';
import { httpService } from '../../../data/services';

export default function ResultsPage() {
  const [results, setResults] = useState([]);
  const [testTypes, setTestTypes] = useState([]);

  async function GetResults() {
    const path = 'student/result';

    const res = await httpService.get(path);

    if (res) {
      setResults(res.data.detailedResult);
    }
  }

  useEffect(() => {
    GetResults();
  }, []);

  return (
    <div>
      <h3>HELLO</h3>
    </div>
  );
}