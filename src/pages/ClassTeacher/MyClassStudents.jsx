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
      console.log(res.data.students);
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
            className="avatar"
          />
        </div>
      ),
    },
    { title: 'Full Name', field: 'fullName' },
    {
      title: 'Action',
      field: '_id',
      render: (rowData) => (
        <div>
          <a
            className="btn btn-elegant"
            href={`/studentsPerformance/${rowData._id}`}
          >{`${rowData.firstName}'s performance`}</a>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="mt-3">
        <div className="h3 text-primary mb-4">My Class Students</div>
        <MyTable
          title={`${level.level} students`}
          data={students}
          columns={columns}
        ></MyTable>
      </div>
    </div>
  );
}
