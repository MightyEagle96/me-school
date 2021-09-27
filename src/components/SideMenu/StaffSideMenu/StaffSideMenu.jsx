import React from 'react';
import './StaffSideMenu.scss';
export const StaffSideMenu = () => {
  return (
    <div className="shadow-lg">
      <div className="p-4 sideMenu text-white">
        <div className="mb-4 mt-4">
          <div className="text-center h1">HELLO</div>
          <hr className="bg-white" />
        </div>
        <div>
          <ul class="staffList mb-5">
            <li className="mb-4  ">
              <a href="/staffHome">
                <span class="fa fa-home mr-3"></span> Home
              </a>
            </li>
            <li className="mb-4  ">
              <a href="#">
                <span class="fa fa-user mr-3"></span> About
              </a>
            </li>
            <li className=" mb-4 ">
              <a href="/chooseExamToSet">
                <span class="fa fa-briefcase mr-3"></span> Set Exams
              </a>
            </li>
            <li className="mb-4  ">
              <a href="#">
                <span class="fa fa-sticky-note mr-3"></span> Student's
                Performance
              </a>
            </li>
            <li className="mb-4  ">
              <a href="#">
                <span class="fa fa-paper-plane mr-3"></span> Class Record
              </a>
            </li>
            <li className="mb-4  ">
              <a href="#">
                <span class="fa fa-paper-plane mr-3"></span> Settings
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
