import React, { useState, useEffect } from "react";
import { backendUrl, httpService } from "../../../data/services";
import "./StaffAndUsersPage.scss";

export default function StaffAndUsersPage() {
  const [users, setUsers] = useState([]);

  const viewUsers = async () => {
    const path = "/school/admin/viewUsers?account_type=me-school";
    const res = await httpService.get(path);
    if (res) {
      setUsers(res.data.users);
    }
  };

  useEffect(() => {
    viewUsers();
  }, []);
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
                <i class="fas fa-user-plus"></i>
              </button>
            </div>
          </div>

          <div>
            <table className="table table-condensed">
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  {/* <th>Class</th> */}
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div>
                          <img
                            src={`${backendUrl}/images/${user.imageUrl}`}
                            className="avatar"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="h6">{user.fullName}</div>
                      </td>
                      <td>
                        <div className="h6">{user.email}</div>
                      </td>
                      <td>
                        <div className="h6 transform">{user.role}</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
