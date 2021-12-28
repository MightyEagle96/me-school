import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { MyTable } from '../../../assets/aesthetics/MyTable';
import { backendUrl, httpService } from '../../../data/services';
import { NOTIFICATIONS_PAGE } from '../../../utils/labels';

export default function NotificationsPage() {
  const [awaitingStudents, setAwaitingStudents] = useState({
    count: 0,
    awaitingStudents: [],
  });

  const [awaitingClassTeachers, setAwaitingClassTeachers] = useState({
    count: 0,
    awaitingClassTeachers: [],
  });

  const [assignedClass, setAssignedClass] = useState({});

  const [levels, setLevels] = useState([]);

  //get students who are yet to be assigned to a class
  async function studentsYetToBeAssiged() {
    const path = 'school/admin/toBeAssigned?role=student';
    const res = await httpService.get(path);
    if (res) {
      setAwaitingStudents({
        count: res.data.count,
        awaitingStudents: res.data.awaitingUsers,
      });
    }
  }

  //get class teachers yet to be assigned
  async function classTeachersYetToBeAssiged() {
    const path = `${backendUrl}school/admin/toBeAssigned?role=classTeacher`;
    const res = await httpService.get(path);
    if (res) {
      setAwaitingClassTeachers({
        count: res.data.count,
        awaitingClassTeachers: res.data.awaitingUsers,
      });
    }
  }

  async function viewLevels() {
    const path = `levels/view`;
    const res = await httpService.get(path);
    if (res) {
      console.log(res.data);
      setLevels(res.data.levels);
    }
  }

  async function assignToClass() {
    const path = 'school/admin/assignToClass';

    const res = await httpService.patch(path, assignedClass);
    if (res) {
      Swal.fire({ icon: 'success', title: 'Success', text: res.data.message });
      studentsYetToBeAssiged();
    }
  }

  useEffect(() => {
    studentsYetToBeAssiged();
    classTeachersYetToBeAssiged();
    viewLevels();
  }, []);

  const columns = [
    { title: 'Full Name', field: 'fullName' },
    {
      title: 'Class',
      field: '_id',
      render: (rowData) => (
        <div className="col-md-8">
          <div className="d-flex justify-content-between">
            <div>
              <select
                className="form-control"
                name="levelHandler"
                onChange={(e) => {
                  console.log(e);
                  setAssignedClass({
                    ...assignedClass,
                    userId: rowData._id,
                    level: e.target.value,
                    levelText: levels.find((level) => {
                      return level._id === e.target.value;
                    }).level,
                  });
                }}
              >
                <option value="">Select a class</option>;
                {levels.map((level, index) => {
                  return (
                    <option key={index} value={level._id}>
                      {level.level}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    Swal.fire({
                      icon: 'question',
                      title: `Assign ${rowData.fullName} to  ${assignedClass.levelText}`,
                      text: NOTIFICATIONS_PAGE.CLASS_ASSIGNMENT_TEXT,
                      confirmButtonText: 'Yes assign!',
                      cancelButtonText: "No don't assign",
                      showConfirmButton: true,
                      showCancelButton: true,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        assignToClass();
                      }
                    });
                  }}
                >
                  Assign to class
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="pr-3">
        <div className="row">
          <div className="col-md-4 card">
            <div className="alert alert-light">
              <div className="h5">Students yet to be assigned</div>
              <hr />
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="h2"> {awaitingStudents.count}</div>
                </div>
                <div>
                  <button className="btn btn-success btn-sm">
                    Click to view
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-md-4  card ml-3">
            <div className="alert alert-light">
              <div className="h5">Class Teachers yet to be assigned</div>
              <hr />
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="h2"> {awaitingClassTeachers.count}</div>
                </div>
                <div>
                  <button className="btn btn-primary btn-sm">
                    Click to view
                  </button>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="mt-3">
          <MyTable
            title="Students waiting to be assigned to a class"
            data={awaitingStudents.awaitingStudents}
            columns={columns}
          ></MyTable>
        </div>
      </div>
    </div>
  );
}
