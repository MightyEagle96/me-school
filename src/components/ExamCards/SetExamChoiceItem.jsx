import React, { useState, useEffect } from 'react';
import { MDBCollapse } from 'mdb-react-ui-kit';
import { httpService } from '../../data/services';

export const SetExamChoiceItem = (subject) => {
  const [showShow, setShowShow] = useState(false);
  const toggleShow = () => setShowShow(!showShow);
  const [levels, setLevels] = useState([]);
  async function getLevels() {
    const path = 'levels';
    const res = await httpService.get(path);
    if (res) {
      setLevels(res.data.levels);
    }
  }
  useEffect(() => {
    getLevels();
  }, []);
  return (
    <div className="col-md-3">
      <div className="alert alert-info">
        <div className="h4">{subject.title}</div>
        <button className="btn btn-success" onClick={toggleShow}>
          Select Class to set
        </button>
        <div className="">
          <MDBCollapse show={showShow}>
            {levels.map((level, index) => {
              return (
                <a
                  key={index}
                  className="btn btn-info"
                  href={`/setExam/${subject._id}/${level._id}`}
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
