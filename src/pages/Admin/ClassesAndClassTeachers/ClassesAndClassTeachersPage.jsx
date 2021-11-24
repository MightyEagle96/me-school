import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { backendUrl, httpService } from '../../../data/services';
import { ADDCLASS_INFO, CATEGORY_LABEL } from '../../../utils/labels';

export default function ClassesAndClassTeachersPage() {
  const defaultValue = { level: '', levelTeacher: '', category: '' };
  const [classTeachers, setClassTeachers] = useState([]);
  const [levels, setLevels] = useState([]);
  const [level, setLevel] = useState(defaultValue);

  const getClassTeachers = async () => {
    const path = `/school/admin/viewUsers?account_type=me-school&role=classTeacher&filter=ytba`;
    const res = await httpService.get(path);
    if (res) {
      setClassTeachers(res.data.users);
    }
  };

  useEffect(() => {
    getClassTeachers();
    viewLevels();
  }, []);

  const createLevel = async () => {
    if (level.category === '') return alert('A class must have a category');
    if (level.levelTeacher === '')
      return alert('A class must have a class teacher assigned to it');
    if (level.levelTeacher === '') {
      return alert(
        'A class can only be created when a teacher is assigned to it'
      );
    }
    const path = '/levels/create';
    Swal.fire({
      icon: 'question',
      title: 'Create class?',
      text: ADDCLASS_INFO.CREATE_CLASS_TEXT,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes Create',
      cancelButtonText: `No don't create`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await httpService.post(path, level);
        if (res) {
          Swal.fire({
            icon: 'success',
            title: 'success',
            text: res.data.message,
          });
          setLevel(defaultValue);
          viewLevels();
          getClassTeachers();
        }
      }
    });
  };

  const viewLevels = async () => {
    const path = '/levels/view';
    const res = await httpService.get(path);
    if (res) {
      setLevels(res.data.levels);
    }
  };
  return (
    <div>
      <div className="p-3">
        <div>
          <div className="h3 text-black-50">CLASSES AND CLASS TEACHERS</div>
          <hr />
        </div>
        <div className="row">
          <div className="col-md-5">
            <div className="shadow-lg rounded p-4">
              <div className="h4 text-primary">Add a new class</div>
              <div className="mb-3 mt-3 form-group">
                <label htmlFor="" className="">
                  Class Name
                </label>
                <input
                  className="form-control"
                  placeholder="JSS 1, JSS 2 etc"
                  onChange={(e) => {
                    setLevel({ ...level, level: e.target.value });
                  }}
                  value={level.level}
                />
              </div>
              <div className="mb-3 form-group">
                <label htmlFor="">Class Category</label>
                <select
                  className="form-control capitalise"
                  onChange={(e) => {
                    setLevel({ ...level, category: e.target.value });
                  }}
                  value={level.category}
                >
                  <option value="">Choose category</option>

                  <option
                    value={CATEGORY_LABEL.JUNIOR_LABEL}
                    className="capitalise"
                  >
                    {CATEGORY_LABEL.JUNIOR_LABEL} school
                  </option>
                  <option
                    value={CATEGORY_LABEL.SENIOR_LABEL}
                    className="capitalise"
                  >
                    {CATEGORY_LABEL.SENIOR_LABEL} school
                  </option>
                </select>
              </div>
              <div className="mb-3 form-group">
                <label htmlFor="">Assign a class teacher</label>
                <select
                  name=""
                  id=""
                  className="form-control"
                  onChange={(e) => {
                    setLevel({ ...level, levelTeacher: e.target.value });
                  }}
                  value={level.levelTeacher}
                >
                  <option value="">
                    Select a class teacher to assign to this class
                  </option>
                  {classTeachers.map((ct, index) => {
                    return (
                      <option key={index} value={ct._id}>
                        {' '}
                        {ct.fullName}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-2">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={createLevel}
                >
                  Create Class
                </button>
              </div>
              <div className="mb-2">
                <h4 className="text-primary">
                  {' '}
                  <i class="fas fa-info-circle    "></i>{' '}
                  {ADDCLASS_INFO.headerText}
                </h4>

                <ol>
                  <li>{ADDCLASS_INFO.step1}</li>
                  <li>{ADDCLASS_INFO.step2}</li>
                  <li>{ADDCLASS_INFO.step3}</li>
                </ol>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="shadow-lg p-4 rounded">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>
                      <div className="h4 text-primary">Class</div>
                    </th>
                    <th>
                      <div className="h4 text-primary">Class Teacher</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {levels.map((level, index) => {
                    return (
                      <tr key={index}>
                        <td>{level.level}</td>
                        <td>
                          <div>
                            <div className="col-md-6">
                              <div className="d-flex justify-content-between">
                                <div>
                                  <img
                                    className="avatar"
                                    src={`${backendUrl}/images/${level.levelTeacher.imageUrl}`}
                                  />
                                </div>
                                <div className="d-flex align-items-center">
                                  <h5>{level.levelTeacher.fullName}</h5>
                                </div>
                              </div>
                            </div>
                          </div>
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
    </div>
  );
}
