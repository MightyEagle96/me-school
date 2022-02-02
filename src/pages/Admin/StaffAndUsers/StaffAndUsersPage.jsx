import React, { useState, useEffect } from 'react';
import { backendUrl, httpService } from '../../../data/services';
import './StaffAndUsersPage.scss';
import { MyTable } from '../../../assets/aesthetics/MyTable';

export default function StaffAndUsersPage() {
  const [users, setUsers] = useState([]);

  const viewUsers = async () => {
    const path = '/school/admin/viewUsers?account_type=me-school';
    const res = await httpService.get(path);
    if (res) {
      setUsers(res.data.users);
    }
  };

  useEffect(() => {
    viewUsers();
  }, []);

  const columns = [
    {
      title: 'Photo',
      field: 'imageUrl',
      render: (rowData) => (
        <div>
          <img
            src={`${backendUrl}/images/${rowData.imageUrl}`}
            alt={rowData.fullName}
            className="avatarList img-fluid"
          />
        </div>
      ),
    },
    { title: 'Full Name', field: 'fullName' },
    {
      title: 'Role',
      field: 'role',
      render: (rowData) => <p className="capitalise">{rowData.role}</p>,
    },
    {
      title: 'Email',
      field: 'email',
    },
  ];
  return (
    <div className="mr-3">
      <div className="alert alert-dark">
        <div className="d-flex justify-content-between">
          <div>
            <h3 style={{ fontWeight: 400 }}>STAFF & STUDENTS</h3>
          </div>
          <div>
            <a href="/createUser" className="btn btn-success">
              <i class="fa fa-user-plus" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>

      <div>
        <MyTable title={'CREATED USERS'} data={users} columns={columns} />
      </div>
    </div>
  );
}
