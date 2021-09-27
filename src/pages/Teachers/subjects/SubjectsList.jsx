import React, { useState, useEffect } from 'react';
import { httpService } from '../../../data/services';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';

export default function SubjectsListPage() {
  const [subjects, setSubjects] = useState([]);

  async function getSubjects() {
    const path = 'subjects';
    const res = await httpService.get(path);
    if (res) {
      console.log(res.data.subjects);
      setSubjects(res.data.subjects);
    }
  }

  useEffect(() => {
    getSubjects();
  }, []);
  return (
    <div>
      <Navbar></Navbar>
      <div className="mt-2">
        <div className="container">
          <table className="table table-stiped">
            <thead>
              <th>Subject</th>
              <th>View</th>
            </thead>
            <tbody>
              {subjects.map((subject, index) => {
                return (
                  <tr key={index}>
                    <td>{subject.title}</td>
                    <td>
                      <button className="btn btn-secondary">View</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
