import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { httpService, loggedInUser } from '../../data/services';
import { IsLoading } from '../../assets/aesthetics/IsLoading';

export default function SubjectsClassAssignmentPage() {
  const [combination, setCombination] = useState([]);
  let [userCombination, setUserCombination] = useState([]);
  const [currentData, setCurrentData] = useState({ subject: '', level: '' });

  const [isSelected, setSelected] = useState(false);

  const [otherStaffAssignment, setOtherStaffAssignment] = useState([]);

  const [loading, setLoading] = useState(false);

  async function GetSubjectClassCombinations() {
    setLoading(true);
    const path = 'academics/viewSubjectClassAssignment';
    const res = await httpService.get(path);

    if (res && res.data.combination) {
      setLoading(false);
      setCombination(res.data.combination);
    }
  }

  async function SaveChanges() {
    Swal.fire({
      icon: 'question',
      text: 'Do you wish to save changes?',
      showCancelButton: true,
      showConfirmButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const path = 'academics/postSubjectClassAssignment';

        const body = { subjectAndLevel: userCombination };
        const res = await httpService.post(path, body);

        if (res) {
          setLoading(false);
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
    setLoading(true);
    const path = 'academics/whoIsAssignedToWhat';
    const res = await httpService.get(path);
    if (res) {
      setLoading(false);
      const playAround = res.data.whoIsAssignedToWhat;
      const index = playAround.findIndex((d) => d.teacher === loggedInUser._id);
      if (index >= 0) {
        setUserCombination(playAround.splice(index, 1)[0].subjectAndLevel);
      } else {
        setUserCombination([]);
      }
      let data = [];
      for (let i = 0; i < playAround.length; i++) {
        const loop1 = playAround[i];
        for (let j = 0; j < loop1.subjectAndLevel.length; j++) {
          const combo = loop1.subjectAndLevel[j];
          data.push(combo);
        }
      }
      console.log(data);

      setOtherStaffAssignment(
        data.filter((d) => d.subject != null && d.level !== null)
      );
    }
  }

  function HandleChecked(subject, level) {
    if (
      userCombination.find(
        (d) => d.subject._id === subject && d.level._id === level
      )
    )
      return true;
  }

  function HandleDisabled(subject, level) {
    if (
      otherStaffAssignment.find(
        (d) => d.subject._id === subject && d.level._id === level
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
      <div className="mr-3 ">
        <div className="border border-danger p-3 mb-4 bg-danger text-white shadow-lg rounded">
          <div className="h3 mb-3">Subject And Class Assignment</div>
          <p>
            Select a class for a subject from available checkboxes you will like
            to teach.
          </p>
          <p>
            Disabled checkboxes show that they have been selected by other
            teachers.
          </p>
        </div>
        <div className="mt-3">
          <div className="h3 text-center">Subects and Classes</div>
          <table className="table table-striped table-bordered">
            <thead></thead>
            <tbody>
              {combination.map((combo) => (
                <tr key={combo.subjectId}>
                  <td>{combo.title}</td>
                  {combo.levels.map((level) => (
                    <td key={level._id}>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          id={`${combo.subjectId}-${level._id}`}
                          className="form-check-input"
                          onChange={handleChange}
                          name={`${combo.subjectId}-${level._id}`}
                          checked={
                            HandleChecked(combo.subjectId, level._id) ||
                            HandleDisabled(combo.subjectId, level._id)
                          }
                          disabled={HandleDisabled(combo.subjectId, level._id)}
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
        </div>
        <div>
          <button
            className="btn btn-warning text-white mr-3"
            onClick={SaveChanges}
          >
            Save Changes
          </button>
          <IsLoading show={loading} color={'text-warning'} />
        </div>
      </div>
    </div>
  );
}
