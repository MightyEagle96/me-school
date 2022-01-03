import React from 'react';
import { loggedInUser, dataService } from '../../data/services';
import { RedirectUser } from '../../pages/Auth/routes';
export default function SideMenuLinks() {
  function redirectUser(role) {
    switch (role) {
      case 'admin':
        return '/adminHome';
      case 'student':
        return '/studentHome';
      case 'class teacher':
        return '/classTeacherHome';
      case 'teacher':
        return '/teacherHome';
      case 'store admin':
        return '/storeAdminHome';

      default:
        break;
    }
  }
  return (
    <div>
      <li className="mb-4">
        <a href={redirectUser(loggedInUser.role)}>
          <span class="fa fa-home mr-3 "></span> Home
        </a>
      </li>
      {/* Student menu */}
      {loggedInUser && loggedInUser.role === 'student' && loggedInUser.level ? (
        <div>
          {' '}
          <li className=" mb-4 ">
            <a href="/registerSubject">
              <span class="fa fa-briefcase mr-3"></span> Registered Subjects
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
      {loggedInUser &&
      loggedInUser.role === 'class teacher' &&
      loggedInUser.level ? (
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
              <span class="fas fa-question mr-3"></span> Set Tests and
              Examinations
            </a>
          </li>
          <li className=" mb-4 ">
            <a href="/subjectsClassAssignment">
              <span class="fas fa-chalkboard-teacher  mr-3"></span> Subjects and
              Class Assignment
            </a>
          </li>
          <li className=" mb-4 ">
            <a href="/studentsPerformance">
              <i class="    "></i>
              <span class="fas fa-user-graduate  mr-3"></span> Students
              performance
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
              <span className="fas fa-clock mr-3   "></span> Terms and Sessions
            </a>
          </li>
          <li className="mb-4">
            <a href="/subjectsViewAdd">
              <span className="fas fa-book mr-3   "></span> Subjects
            </a>
          </li>
          <li className="mb-4">
            <a href="/staffAndUsers">
              <span className="fas fa-users mr-3   "></span> Staff and Students
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
              <span className="fas fa-pen-nib mr-3 "></span> Test & Examinations
            </a>
          </li>
          <li className="mb-4">
            <a href="/notifications">
              <span className="fas fa-bell mr-3   "></span> Notifications
            </a>
          </li>
          <li className="mb-4">
            <a href="/graduation">
              <span className="fas fa-graduation-cap mr-3   "></span> Graduate
              Students
            </a>
          </li>

          <li className="mb-4">
            <a href="£!">
              <span className="fas fa-chart-bar  mr-3   "></span> Analytics
            </a>
          </li>
          <li className="mb-4">
            <a href="£!">
              <span className="fas fa-volume-up mr-3   "></span> Broadcasts
            </a>
          </li>
        </div>
      ) : (
        ''
      )}
      {loggedInUser && loggedInUser.role === 'store admin' ? (
        <div>
          {/* <li className="mb-4">
            <a href="/addStoreItem">
              <span className="fas fa-cart-plus mr-3   "></span> Add a new store
              item
            </a>
          </li> */}
          <li className="mb-4">
            <a href="/addNewItem">
              <span className="fas fa-money-bill  mr-3   "></span> Financial
              Report
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
      <li className="mb-4  ">
        <a
          type="button"
          onClick={() => {
            dataService.logout();
          }}
        >
          {' '}
          <span className="fas fa-arrow-circle-left mr-3"> </span> Logout
        </a>
      </li>
    </div>
  );
}
