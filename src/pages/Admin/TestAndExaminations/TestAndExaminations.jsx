import React, { useState, useEffect } from 'react';
import { TEST_AND_EXAMINATIONS_PAGE, TEST_TYPES } from '../../../utils/labels';
import { httpService } from '../../../data/services';
import Swal from 'sweetalert2';

export default function TestAndExaminations() {
  const [testType, setTestType] = useState({ testType: '' });
  const [testTypes, setTestTypes] = useState([]);
  //get all test types
  async function getTestTypes() {
    const path = 'testType';

    const res = await httpService.get(path);

    if (res) {
      console.log(res.data);
      setTestTypes(res.data.testTypes);
    }
  }

  async function createTestType() {
    if (testType.testType === '') return alert('Please select a test type');
    Swal.fire({
      icon: 'question',
      title: 'Are you sure?',
      text: 'Do you want to create this test type?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes Create',
      cancelButtonText: "No don't create",
    }).then(async (result) => {
      const path = 'testType';

      const res = await httpService.post(path, testType);

      if (res) {
        getTestTypes();
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: res.data.message,
        });
      }
    });
  }

  useEffect(() => {
    getTestTypes();
  }, []);

  //create a test type
  return (
    <div className="mt-3">
      <div>
        <div className="h3">Test & Examinations</div>
        <hr />
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="p-4 shadow-lg rounded">
            <div className="h4 text-primary mb-4">Create a test type</div>
            <div className="form-group">
              <label htmlFor="">Test Type</label>
              <select
                className="form-control"
                onChange={(e) => {
                  setTestType({ testType: e.target.value });
                }}
              >
                <option value=""></option>
                {TEST_TYPES.map((test_type, index) => {
                  return (
                    <option key={index} value={test_type}>
                      {test_type}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <button
                className="btn btn-success btn-sm"
                onClick={createTestType}
              >
                Create test type
              </button>
            </div>
            <blockquote>
              {TEST_AND_EXAMINATIONS_PAGE.information_text}
            </blockquote>
          </div>
        </div>
        <div className="col-md-6">
          <div className="p-4 shadow-lg rounded">
            <div className="h4 text-primary mb-4">Created Test Types</div>
            {testTypes.map((test_type) => {
              return (
                <div className="text-black-50 h5  ">{test_type.testType}</div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
