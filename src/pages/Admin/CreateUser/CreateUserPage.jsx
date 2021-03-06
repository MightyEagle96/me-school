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

  async function CreateUser(e) {
    e.preventDefault();
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
    <div className="mr-3">
      <div className="alert alert-info ">
        <div className="h3" style={{ fontWeight: 400 }}>
          CREATE USER
        </div>
      </div>
      <div className="mt-4">
        <form onSubmit={CreateUser}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="">First Name:</label>
                <input
                  className="form-control"
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  onChange={HandleChange}
                  required
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
                  required
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
                  required
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
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="">Password:</label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={HandleChange}
                  required
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
                  required
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
                  required
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
                <button className="btn btn-primary" type="submit">
                  {loading ? (
                    <IsLoading show={loading} color={'text-white'} />
                  ) : (
                    'Create user'
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
