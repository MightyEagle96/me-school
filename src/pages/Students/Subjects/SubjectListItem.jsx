/* eslint-disable react/prop-types */
import React from 'react';

export default function SubjectListITem({ subject }) {
  return (
    <div className=" rounded shadow p-3 mb-3">
      <div className="d-flex justify-content-between">
        <div className="h6 text-default">{subject.subject.title}</div>
        <div>
          <a
            href={`myResults/${subject.subject._id}`}
            className="btn btn-primary btn-sm"
          >
            View Result
          </a>
        </div>
      </div>
    </div>
  );
}
