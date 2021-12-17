import React from 'react';
import { loggedInUser } from '../../../data/services';

export default function TeacherDashboard() {
  return (
    <div>
      <div className="jumbotron jumbotron-fluid jumbotronBackground text-white">
        <div className="container">
          <h1 className="display-4">Hello, {loggedInUser.firstName}</h1>

          <div className="col-md-4">
            <div className="text-center h1">
              <i class="fas fa-user-tie    "></i>
            </div>
            <div className="text-center capitalise">
              <strong>Role: {loggedInUser.role}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
