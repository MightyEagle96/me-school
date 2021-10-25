import React from "react";

export default function StaffAndUsersPage() {
  return (
    <div>
      <div>
        <div className="mt-3">
          <div className="d-flex justify-content-between">
            <div>
              <h3>STAFF & STUDENTS</h3>
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
  );
}
