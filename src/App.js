import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';
import './App.scss';
import HomePage from './pages/Gen/HomePage';
import { LoginPage } from './pages/Auth/LoginPage';
import { SignUpPage } from './pages/Auth/SignUpPage';
import ExamChoicePage from './pages/Exams/ExamChoicePage';
import SetExamPage from './pages/Exams/SetExamPage';
import StudentDashboard from './pages/Students/Home/StudentDashboard';
import TestsChoicePage from './pages/Students/Tests/TestsChoicePage';
import { TakeTestPage } from './pages/Students/Tests/TakeTestPage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { RedirectUser } from './pages/Auth/routes';
import ProfilePage from './pages/User/ProfilePage';
import AdminDashboard from './pages/Admin/Home/AdminDashboard';
import Subjects from './pages/Admin/Subjects/Subjects';
import StaffAndUsersPage from './pages/Admin/StaffAndUsers/StaffAndUsersPage';
import ClassesAndClassTeachersPage from './pages/Admin/ClassesAndClassTeachers/ClassesAndClassTeachersPage';
import SideMenu from './components/SideMenu/SideMenu';
import TermsAndSessionPage from './pages/Admin/TermsAndSessionPage/TermsAndSessionPage';
import { RegisteredSubjects } from './pages/Students/Subjects/RegisteredSubjects';
import NotificationsPage from './pages/Admin/Notifications/NotificationsPage';
import TestAndExaminations from './pages/Admin/TestAndExaminations/TestAndExaminations';
import MyClassStudentsPage from './pages/ClassTeacher/MyClassStudents';
import ClassTeacherDashboard from './pages/ClassTeacher/Home/ClassTeacherDashboard';
import ResultsPage from './pages/Students/Results/ResultsPage';
import CreateUserPage from './pages/Admin/CreateUser/CreateUserPage';
import StudentsPerformance from './pages/ClassTeacher/StudentsPerformance';
import TermResultsPage from './pages/Students/Results/TermResultsPage';
import SubjectsClassAssignmentPage from './pages/Academics/SubjectsClassAssignmentPage';
import TeacherDashboard from './pages/Teachers/Home/TeacherDashboard';
import StudentsPerformancePage from './pages/Academics/StudentsPerformancePage';
import StoreAdminDashboard from './pages/StoreAdmin/Home/StoreAdminDashboard';
import AddStoreItem from './pages/StoreAdmin/Store/AddStoreItem';
import GraduationPage from './pages/Admin/Graduation/GraduationPage';
import NewAccountBanner from './components/NewAccount/NewAccountBanner';
import { loggedInUser } from './data/services';

function App() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  const [size, setSize] = useState(window.innerWidth);

  function checkSize() {
    setSize(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', checkSize);
  }, []);

  return (
    <div className=" noOverFlow defColor">
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/" component={HomePage}>
          {user ? RedirectUser(user.role) : ''}
        </Route>
        <Route exact path="/login" component={LoginPage}></Route>
        <Route exact path="/signUp" component={SignUpPage}></Route>

        <Route
          exact
          path="/takeExam/:subjectId/:testTypeId"
          component={TakeTestPage}
        ></Route>
        <div className={size > 990 ? 'row' : ''}>
          {size > 990 ? (
            <div className="col-md-3">
              <SideMenu />
            </div>
          ) : (
            ''
          )}
          <div className={size > 990 ? 'col-md-9' : 'ml-2'}>
            {size < 990 ? <SideMenu /> : ''}
            {loggedInUser && loggedInUser.isNewAccount ? (
              <NewAccountBanner />
            ) : (
              ''
            )}
            <Route
              exact
              path="/studentHome"
              component={StudentDashboard}
            ></Route>
            <Route exact path="/graduation" component={GraduationPage}></Route>
            <Route
              exact
              path="/chooseExamToSet"
              component={ExamChoicePage}
            ></Route>
            <Route exact path="/adminHome" component={AdminDashboard}></Route>
            <Route
              exact
              path="/storeAdminHome"
              component={StoreAdminDashboard}
            ></Route>
            <Route exact path="/addStoreItem" component={AddStoreItem}></Route>
            <Route exact path="/subjectsViewAdd" component={Subjects}></Route>
            <Route
              exact
              path="/staffAndUsers"
              component={StaffAndUsersPage}
            ></Route>
            <Route exact path="/createUser" component={CreateUserPage}></Route>
            <Route
              exact
              path="/classAndClassTeachers"
              component={ClassesAndClassTeachersPage}
            ></Route>
            <Route exact path="/profile" component={ProfilePage}></Route>
            <Route
              exact
              path="/termsAndSessions"
              component={TermsAndSessionPage}
            ></Route>
            <Route
              exact
              path="/registerSubject"
              component={RegisteredSubjects}
            ></Route>
            <Route path="/notifications" component={NotificationsPage}></Route>
            <Route path="/testTypes" component={TestAndExaminations}></Route>
            <Route exact path="/testChoice" component={TestsChoicePage}></Route>

            <Route
              exact
              path="/setExam/:subjectId/:levelId"
              component={SetExamPage}
            ></Route>
            <Route
              exact
              path="/myStudents"
              component={MyClassStudentsPage}
            ></Route>
            <Route
              exact
              path="/studentsPerformance/:studentId"
              component={StudentsPerformance}
            ></Route>
            <Route
              exact
              path="/classTeacherHome"
              component={ClassTeacherDashboard}
            ></Route>
            <Route
              exact
              path="/teacherHome"
              component={TeacherDashboard}
            ></Route>
            <Route exact path="/myResults/:id" component={ResultsPage}></Route>
            <Route
              exact
              path="/results/all"
              component={TermResultsPage}
            ></Route>
            <Route
              exact
              path="/subjectsClassAssignment"
              component={SubjectsClassAssignmentPage}
            ></Route>
            <Route
              exact
              path="/studentsPerformance"
              component={StudentsPerformancePage}
            ></Route>
          </div>
        </div>
      </Switch>
      <Footer></Footer>
    </div>
  );
}

export default App;
