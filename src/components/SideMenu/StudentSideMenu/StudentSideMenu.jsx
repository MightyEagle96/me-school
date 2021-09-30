import React from 'react';
import './StudentSideMenu.scss';
export const StudentSideMenu = () => {
  return (
    <div className="shadow-lg">
      <div className="p-4 studentSideMenu text-white">
        <div className="mb-4 mt-4">
          <div className="text-center h1">HELLO</div>
          <hr className="bg-white" />
        </div>
        <div>
          <ul class="staffList mb-5">
            <li className="mb-4  ">
              <a href="/studentHome">
                <span class="fa fa-home mr-3"></span> Home
              </a>
            </li>
            <li className="mb-4  ">
              <a href="#">
                <span class="fa fa-user mr-3"></span> About
              </a>
            </li>
            <li className=" mb-4 ">
              <a href="/registerSubject">
                <span class="fa fa-briefcase mr-3"></span> Registered Subjects
              </a>
            </li>
            <li className="mb-4  ">
              <a href="/testChoice">
                <span class="fa fa-sticky-note mr-3"></span> Take tests or exams
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
