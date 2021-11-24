/* eslint-disable react/prop-types */
import React from 'react';

export default function SubjectListITem({ subject }) {
  return (
    <div className=" rounded shadow p-3 mb-3">
      <div className="d-flex justify-content-between">
        <div className="h6 text-default">{subject.subject.title}</div>
        <div>
          <button className="btn btn-warning btn-sm">View result</button>
        </div>
      </div>
    </div>
  );
}
