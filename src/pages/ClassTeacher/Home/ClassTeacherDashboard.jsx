import React, { useState, useEffect } from 'react';
import './ClassTeacherDashboard.scss';
import { httpService, loggedInUser } from '../../../data/services';
import { ROLE } from '../../../utils/labels';

export default function ClassTeacherDashboard() {
  const [classSize, setClassSize] = useState(0);
  async function GetClassSize() {
    const path = 'classTeacher/myStudents';
    const res = await httpService.get(path);

    if (res) {
      setClassSize(res.data.count);
    }
  }
  useEffect(() => {
    GetClassSize();
  }, []);

  return (
    <div className="pr-3">
      <div className="jumbotron jumbotron-fluid jumbotronBackground text-white m-0">
        <div class="container">
          <h1 class="display-4">Hello, {loggedInUser.firstName}</h1>
        </div>
        <div className="row mt-5">
          <div className="col-md-4">
            <div className="text-center h1">
              <i class="fas fa-user-tie    "></i>
            </div>
            <div className="text-center capitalise">
              <strong>Role: {loggedInUser.role}</strong>
            </div>
          </div>
          <div className="col-md-4">
            <div className="text-center  h1">
              <i class="fas fa-school    "></i>
            </div>
            <div className="text-center">
              {
                <strong>
                  {loggedInUser.level !== undefined ? (
                    <div>Class: {loggedInUser.level.level}</div>
                  ) : (
                    'You are yet to be assigned to a class. Please contact the administrator'
                  )}
                </strong>
              }
            </div>
          </div>
          <div className="col-md-4">
            <div className="text-center  h1">
              <i class="fas fa-user-friends    "></i>
            </div>
            <div className="text-center">
              <strong>Class Size: {classSize}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3">
        <hr />
      </div>
      <div className="col-md-4">
        <div className=" rounded text-pink shadow-lg p-3">
          <div className="row ">
            <div className="col-md-6">
              <div className="text-center">
                <div className="h1">
                  <i class="fas fa-clock    "></i>
                </div>
                <strong>
                  {loggedInUser.currentTerm.term
                    ? loggedInUser.currentTerm.term
                    : '-'}
                </strong>
              </div>
            </div>
            <div className="col-md-6">
              <div className="text-center">
                <div className="h1">
                  <i class="fas fa-calendar    "></i>
                </div>
                <strong>
                  {loggedInUser.currentSession.session.replace('-', '/')}{' '}
                  Academic Session
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
