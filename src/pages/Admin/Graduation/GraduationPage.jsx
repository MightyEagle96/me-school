import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { IsLoading } from '../../../assets/aesthetics/IsLoading';
import { httpService } from '../../../data/services';

export default function GraduationPage() {
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [level, setLevel] = useState(null);

  async function GetLevels() {
    setLoading(true);
    const path = 'levels/view';
    const res = await httpService.get(path);
    if (res) {
      setLoading(false);
      setLevels(res.data.levels);
    }
  }

  async function GetStudents(levelId) {
    setLoading(true);
    const path = `school/admin/viewUsers?account_type=me-school&role=student&level=${levelId}`;
    const res = await httpService.get(path);
    if (res) {
      setLoading(false);
      console.log(res.data);
      if (res.data.users.length === 0) {
        Swal.fire({
          icon: 'info',
          text: 'There are no students in this class',
        });
      }
      setStudents(res.data.users);
    }
  }
  useEffect(() => {
    GetLevels();
  }, []);
  return (
    <div>
      <div className="mr-2">
        <div className="border border-light p-3 rounded shadow-lg">
          <div className="h2">Graduate Students</div>
          <p>
            Graduate eligible students to the next class in a new academic
            session.
          </p>
          <p>
            You can{' '}
            <span>
              <strong>"Bulk Graduate a class."</strong> But be sure that all
              students are eligible for graduation.{' '}
            </span>
          </p>
        </div>

        <div className="mt-3">
          <div className=" p-4 bg-white ">
            <div className="d-flex flex-wrap text-center">
              {levels.map((level, index) => (
                <div key={index} className="col-md-2 mb-3">
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      GetStudents(level._id);
                      setLevel(level);
                    }}
                  >
                    {level.level}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3">
          <IsLoading show={loading} />
        </div>
        {students.length > 0 ? (
          <div className="mt-5">
            <div className="d-flex justify-content-center">
              <div className="col-md-6">
                <div className="h4">{level.level} students</div>
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Graduate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <tr key={index}>
                        <td>{student.fullName}</td>
                        <td>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              name=""
                              id={student._id}
                              className="form-check-input"
                            />
                            <label
                              htmlFor={student._id}
                              className="form-check-label"
                            >
                              Graduate
                            </label>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="btn btn-success">Graduate Students</button>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
