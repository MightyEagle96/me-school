import React from 'react';
import SideMenu from '../../../components/SideMenu/SideMenu';
import { loggedInUser } from '../../../data/services';

export default function AdminDashboard() {
  return (
    <div className="p-3">
      <div className="jumbotron jumbotron-fluid jumbotronBackground text-white m-0">
        <div class="container">
          <h1 class="display-4">Hello, {loggedInUser.firstName}</h1>
          <div className="mt-3">
            <div className="border border-white"></div>
          </div>
          {/* <p class="lead">
            This is a modified jumbotron that occupies the entire horizontal
            space of its parent.
          </p> */}
        </div>
      </div>
      <div className="mt-4">
        <div className="row">
          <div className="col-md-3">
            <div className="bg-danger text-white p-3 text-center">
              <div className="h3">2020-2021 Session</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="bg-info text-white p-3 text-center">
              <div className="h3">First Term</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="bg-success text-white p-3 text-center">
              <div className="h3">2020-2021 Session</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="bg-primary text-white p-3 text-center">
              <div className="h3">Number of Users</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
