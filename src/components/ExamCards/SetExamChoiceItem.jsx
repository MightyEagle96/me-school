import React, { useState } from 'react';
import { MDBCollapse } from 'mdb-react-ui-kit';

export const SetExamChoiceItem = (subject) => {
  const [showShow, setShowShow] = useState(false);
  const toggleShow = () => setShowShow(!showShow);

  return (
    <div className="col-md-3">
      <div className="alert alert-info">
        <div className="h4">{subject.subject.title}</div>
        <button className="btn btn-success btn-sm" onClick={toggleShow}>
          Select Class to set
        </button>
        <div className="">
          <MDBCollapse show={showShow}>
            {subject.levels.map((level, index) => {
              return (
                <a
                  key={index}
                  className="btn btn-info btn-sm"
                  href={`/setExam/${subject.subject._id}/${level._id}`}
                >
                  {level.level}
                </a>
              );
            })}
          </MDBCollapse>
        </div>
      </div>
      <div></div>
    </div>
  );
};
