import React, { useState, useEffect } from 'react';
import { httpService, backendUrl } from '../../data/services';
import { MyTable } from '../../assets/aesthetics/MyTable';

export default function MyClassStudentsPage() {
  const [students, setStudents] = useState([]);
  const [level, setLevel] = useState({});

  async function GetMyStudents() {
    const path = 'classTeacher/myStudents';
    const res = await httpService.get(path);

    if (res) {
      setStudents(res.data.students);
      setLevel(res.data.level);
    }
  }

  useEffect(() => {
    GetMyStudents();
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
    { title: 'Email', field: 'email' },
    { title: 'Full Name', field: 'fullName' },
    {
      title: 'Action',
      field: '_id',
      render: (rowData) => (
        <div>
          <a
            className="btn btn-dark"
            href={`/studentsPerformance/${rowData._id}`}
          >{`${rowData.firstName}'s performance`}</a>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="p-3">
        <div className="border border-primary p-3 mb-4 bg-primary text-white shadow-lg rounded">
          <div className="h3">My Class Students</div>
          <p>See all the students assigned to your class.</p>
          <p>You can also view performance for each student.</p>
        </div>
        {level ? (
          <MyTable
            title={`${level.level} students`}
            data={students}
            columns={columns}
          ></MyTable>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
