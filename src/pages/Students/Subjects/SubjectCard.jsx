/* eslint-disable react/prop-types */
import React from 'react';
import './SubjectCard.scss';

export default function SubjectCard({ data, updateArray, array }) {
  return (
    <div className="mt-3">
      <div className="col-md-7">
        <div className="d-flex justify-content-between">
          <div className="h6 text-black">{data.title}</div>
          <div>
            <div
              className="h6 text-danger delete"
              onClick={() => {
                updateArray(array.filter((d) => d._id !== data._id));
              }}
            >
              <i className="fas fa-trash    "></i>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}
