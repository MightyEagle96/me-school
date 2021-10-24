import React from "react";
import SideMenu from "../../../components/SideMenu/SideMenu";

export default function StaffAndUsersPage() {
  return (
    <div>
      <div className="row">
        <div className="col-md-3">
          <SideMenu />
        </div>
        <div className="col-md-9 pe-3">
          <div className="mt-3">
            <div className="d-flex justify-content-between">
              <div>
                <h3>STAFF & USERS</h3>
              </div>
              <div>
                <button className="btn btn-success">
                  <i class="fas fa-user-plus    "></i>
                </button>
              </div>
            </div>

            <div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Class</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
