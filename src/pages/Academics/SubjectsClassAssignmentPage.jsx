import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { httpService, loggedInUser } from '../../data/services';

export default function SubjectsClassAssignmentPage() {
  const [combination, setCombination] = useState([]);
  let [userCombination, setUserCombination] = useState([]);
  const [currentData, setCurrentData] = useState({ subject: '', level: '' });

  const [isSelected, setSelected] = useState(false);

  const [otherStaffAssignment, setOtherStaffAssignment] = useState([]);

  async function GetSubjectClassCombinations() {
    const path = 'academics/viewSubjectClassAssignment';
    const res = await httpService.get(path);

    if (res && res.data.combination) {
      setCombination(res.data.combination);
    }
  }

  async function SaveChanges() {
    Swal.fire({
      icon: 'question',
      titleText: 'Save Changes?',
      showCancelButton: true,
      showConfirmButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const path = 'academics/postSubjectClassAssignment';

        const body = { subjectAndLevel: userCombination };
        const res = await httpService.post(path, body);

        if (res) {
          Swal.fire({ icon: 'success', title: res.data.message });
          GetWhoIsAssignedToWhat();
        }
      }
    });
  }

  const handleChange = (e) => {
    const [subject, level] = e.target.name.split('-');
    setCurrentData({ subject, level });

    const confirmExistence = userCombination.find(
      (d) => d.level === level && d.subject === subject
    );

    if (e.target.checked) {
      if (!confirmExistence) {
        setUserCombination((oldArray) => [...oldArray, { subject, level }]);
      }
    }
    if (!e.target.checked) {
      const index = userCombination.findIndex(
        (d) => d.level === level && d.subject === subject
      );
      userCombination.splice(index, 1);
      setUserCombination(userCombination);
    }
  };

  async function GetWhoIsAssignedToWhat() {
    const path = 'academics/whoIsAssignedToWhat';

    const res = await httpService.get(path);

    if (res) {
      const playAround = res.data.whoIsAssignedToWhat;

      const index = playAround.findIndex((d) => d.teacher === loggedInUser._id);

      setUserCombination(playAround.splice(index, 1)[0].subjectAndLevel);

      setOtherStaffAssignment(playAround[0].subjectAndLevel);
    }
  }

  function HandleChecked(subject, level) {
    if (userCombination.find((d) => d.subject === subject && d.level === level))
      return true;
  }

  function HandleDisabled(subject, level) {
    if (
      otherStaffAssignment.find(
        (d) => d.subject === subject && d.level === level
      )
    )
      return true;
  }
  useEffect(() => {
    GetSubjectClassCombinations();
    GetWhoIsAssignedToWhat();
  }, []);

  return (
    <div>
      <div className="p-3">
        <div className="alert alert-primary col-md-4">
          The table is combination of subjects and their classes
        </div>
        <div className="mt-3">
          <div className="h3 text-center">Subects and Classes</div>
          <table className="table table-striped table-bordered">
            <thead></thead>
            <tbody>
              {combination
                .sort((a, b) => {
                  let fa = a.title,
                    fb = b.title;

                  if (fa < fb) {
                    return -1;
                  }

                  if (fa > fb) {
                    return 1;
                  }
                  return 0;
                })
                .map((combo) => (
                  <tr key={combo.subjectId}>
                    <td>{combo.title}</td>
                    {combo.levels
                      .sort((a, b) => {
                        let fa = a.level,
                          fb = b.level;

                        if (fa < fb) {
                          return -1;
                        }

                        if (fa > fb) {
                          return 1;
                        }
                        return 0;
                      })
                      .map((level) => (
                        <td key={level._id}>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              id={`${combo.subjectId}-${level._id}`}
                              className="form-check-input"
                              onClick={handleChange}
                              name={`${combo.subjectId}-${level._id}`}
                              checked={
                                HandleChecked(combo.subjectId, level._id) ||
                                HandleDisabled(combo.subjectId, level._id)
                              }
                              disabled={HandleDisabled(
                                combo.subjectId,
                                level._id
                              )}
                            />
                            <label
                              htmlFor={`${combo.subjectId}-${level._id}`}
                              className="form-check-label"
                            >
                              {level.level}
                            </label>
                          </div>
                        </td>
                      ))}
                  </tr>
                ))}
            </tbody>
          </table>
          <button className="btn btn-success" onClick={SaveChanges}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
