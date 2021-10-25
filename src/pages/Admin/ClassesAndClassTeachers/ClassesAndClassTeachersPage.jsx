import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { httpService } from "../../../data/services";

export default function ClassesAndClassTeachersPage() {
  const defaultValue = { level: "", levelTeacher: "" };
  const [classTeachers, setClassTeachers] = useState([]);
  const [levels, setLevels] = useState([]);
  const [level, setLevel] = useState(defaultValue);

  const getClassTeachers = async () => {
    const path =
      "/school/admin/viewUsers?account_type=me-school&role=classTeacher";
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
    const path = "/levels/create";
    const res = await httpService.post(path, level);
    if (res) {
      Swal.fire({ icon: "success", title: "success", text: res.data.message });
    }
  };

  const viewLevels = async () => {
    const path = "/levels/view";
    const res = await httpService.get(path);
    if (res) {
      setLevels(res.data.levels);
    }
  };
  return (
    <div>
      <div className="p-3">
        <div>
          <div className="h3">CLASSES AND CLASS TEACHERS</div>
          <hr />
        </div>
        <div className="row">
          <div className="col-md-7">
            <div>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Class Teacher</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
          <div className="col-md-5">
            <div className="border border-primary p-3">
              <div className="h4 text-primary">Add a new class</div>
              <div className="mb-2 mt-2">
                <input
                  className="form-control"
                  placeholder="Class name"
                  onChange={(e) => {
                    setLevel({ ...level, level: e.target.value });
                  }}
                  value={level.level}
                />
              </div>
              <div className="mb-2">
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
                        {" "}
                        {ct.fullName}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <button className="btn btn-primary" onClick={createLevel}>
                  Create Class
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
