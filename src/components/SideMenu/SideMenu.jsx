import React, { useState } from 'react';
import { backendUrl, loggedInUser } from '../../data/services';
import './SideMenu.scss';
import maleAvatar from '../../assets/images/avatars/maleDefault.png';
import femaleAvatar from '../../assets/images/avatars/femaleDefault.jpeg';
import { RedirectUser } from '../../pages/Auth/routes';

export default function SideMenu() {
  //const [selectedFile, setSelectedFile] = useState(null);

  let avatar;
  if (loggedInUser) {
    if (loggedInUser.imageUrl) {
      avatar = `${backendUrl}/images/${loggedInUser.imageUrl}`;
    } else {
      loggedInUser.gender === 'male'
        ? (avatar = maleAvatar)
        : (avatar = femaleAvatar);
    }
  }
  function redirectUser(role) {
    switch (role) {
      case 'admin':
        return '/adminHome';
      case 'student':
        return '/studentHome';
      case 'class teacher':
        return '/classteacherHome';

      default:
        break;
    }
  }

  return (
    <div className="shadow-lg rounded">
      <div className="p-4 sideMenu text-primary">
        <div className="mb-4 mt-4">
          <div className="text-center ">
            <img className="avatar" src={avatar} alt={loggedInUser.fullName} />
          </div>
          <hr className="bg-white" />
        </div>
        <div>
          <ul class="staffList mb-5">
            <li className="mb-4  ">
              <a href={redirectUser(loggedInUser.role)}>
                <span class="fa fa-home mr-3"></span> Home
              </a>
            </li>
            {/* Student menu */}
            {loggedInUser &&
            loggedInUser.role === 'student' &&
            loggedInUser.level ? (
              <div>
                {' '}
                <li className=" mb-4 ">
                  <a href="/registerSubject">
                    <span class="fa fa-briefcase mr-3"></span> Registered
                    Subjects
                  </a>
                </li>
                <li className="mb-4  ">
                  <a href="/testChoice">
                    <span class="fas fa-pen  mr-3"></span> Take tests or exams
                  </a>
                </li>
                <li className="mb-4  ">
                  <a href="/results/all">
                    <span class="fas fa-scroll   mr-3"></span> My Results
                  </a>
                </li>{' '}
              </div>
            ) : (
              ''
            )}
            {loggedInUser && loggedInUser.role === 'class teacher' ? (
              <div>
                <li className="mb-4  ">
                  <a href="/myStudents">
                    <span class="fas fa-users  mr-3"></span> My Students
                  </a>
                </li>
              </div>
            ) : (
              ''
            )}
            {loggedInUser &&
            (loggedInUser.role === 'class teacher' ||
              loggedInUser.role === 'teacher') ? (
              <div>
                {' '}
                <li className=" mb-4 ">
                  <a href="/chooseExamToSet">
                    <i class="    "></i>
                    <span class="fas fa-question mr-3"></span> Set Tests and
                    Examinations
                  </a>
                </li>
                {/* <li className="mb-4  ">
                  <a href="#">
                    <span class="fa fa-sticky-note mr-3"></span> Student's
                    Performance
                  </a>
                </li> */}
              </div>
            ) : (
              ''
            )}
            {loggedInUser && loggedInUser.role === 'admin' ? (
              <div>
                <li className="mb-4">
                  <a href="/termsAndSessions">
                    <span className="fas fa-clock mr-3   "></span> Terms and
                    Sessions
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/subjectsViewAdd">
                    <span className="fas fa-book mr-3   "></span> Subjects
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/staffAndUsers">
                    <span className="fas fa-users mr-3   "></span> Staff and
                    Students
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/classAndclassTeachers">
                    <span className="fas fa-chalkboard-teacher   mr-3   "></span>{' '}
                    Classes and Class Teachers
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/testTypes">
                    <span className="fas fa-pen-nib mr-3 "></span> Test &
                    Examinations
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/notifications">
                    <span className="fas fa-bell mr-3   "></span> Notifications
                  </a>
                </li>
                <li className="mb-4">
                  <a href="£!">
                    <span className="fas fa-chart-bar  mr-3   "></span>{' '}
                    Analytics
                  </a>
                </li>
                <li className="mb-4">
                  <a href="£!">
                    <span className="fas fa-volume-up mr-3   "></span>{' '}
                    Broadcasts
                  </a>
                </li>
              </div>
            ) : (
              ''
            )}
            <li className="mb-4  ">
              <a href="/profile">
                <span class="fas fa-user-cog   mr-3"></span> Profile
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
