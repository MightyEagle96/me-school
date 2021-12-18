import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { IsLoading } from '../../../assets/aesthetics/IsLoading';
import { httpService } from '../../../data/services';

export default function CreateUserPage() {
  const [userData, setUserData] = useState({ account_type: 'me-school' });
  const [loading, setLoading] = useState(false);

  function HandleChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  async function CreateUser() {
    Swal.fire({
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      titleText: 'Create user?',
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const path = 'users/createUser';

        const res = await httpService.post(path, userData);

        if (res && res.data.message) {
          Swal.fire({ icon: 'success', titleText: res.data.message }).then(
            () => {
              setLoading(false);
              window.location.assign('/staffAndUsers');
            }
          );
        } else {
          setLoading(false);
          Swal.fire({
            icon: 'error',
            text: 'Could not process request at this time',
          });
        }
      }
    });
  }

  return (
    <div className="p-3">
      <div className="alert alert-info col-md-5">
        <div className="h3">Create a new User</div>
      </div>
      <div className="mt-4">
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="">First Name:</label>
              <input
                className="form-control"
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={HandleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Last Name:</label>
              <input
                className="form-control"
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={HandleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Email Address:</label>
              <input
                className="form-control"
                type="email"
                name="email"
                value={userData.email}
                onChange={HandleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Phone Number:</label>
              <input
                className="form-control"
                type="number"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={HandleChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="">Password:</label>
              <input
                className="form-control"
                type="password"
                name="password"
                value={userData.password}
                onChange={HandleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Gender:</label>
              <select
                name="role"
                id=""
                name="gender"
                value={userData.gender}
                onChange={HandleChange}
                className="form-control"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="">Role:</label>
              <select
                name="role"
                id=""
                name="role"
                value={userData.role}
                onChange={HandleChange}
                className="form-control"
              >
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="teacher">Teacher</option>
                <option value="class teacher">Class Teacher</option>
                <option value="student">Student</option>
                <option value="store admin">Store Admin</option>
              </select>
            </div>
            <div className="form-group">
              <button className="btn btn-primary" onClick={CreateUser}>
                Create new user
              </button>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
        <div className="col-md-4">
          <div>
            <IsLoading show={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}
