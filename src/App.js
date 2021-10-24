import { Route, Switch } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import "bootstrap/dist/js/bootstrap.bundle";

import HomePage from "./pages/Gen/HomePage";
import { LoginPage } from "./pages/Auth/LoginPage";
import { SignUpPage } from "./pages/Auth/SignUpPage";
import ExamChoicePage from "./pages/Teachers/Exams/ExamChoicePage";
import SubjectsListPage from "./pages/Teachers/subjects/SubjectsList";
import StaffDashboard from "./pages/Teachers/Home/StaffDashboard";
import "./App.scss";
import SetExamPage from "./pages/Teachers/Exams/SetExamPage";
import StudentDashboard from "./pages/Students/Home/StudentDashboard";
import { RegisteredSubjects } from "./pages/Students/Subjects/RegisteredSubjects";
import TestsChoicePage from "./pages/Students/Tests/TestsChoicePage";
import { TakeTestPage } from "./pages/Students/Tests/TakeTestPage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { RedirectUser } from "./pages/Auth/routes";
import ProfilePage from "./pages/User/ProfilePage";
import AdminDashboard from "./pages/Admin/Home/AdminDashboard";
import Subjects from "./pages/Admin/Subjects/Subjects";
import StaffAndUsersPage from "./pages/Admin/StaffAndUsers/StaffAndUsersPage";
import ClassesAndClassTeachersPage from "./pages/Admin/ClassesAndClassTeachers/ClassesAndClassTeachersPage";

function App() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  console.log(user);
  return (
    <div className="m-0 defColor">
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/" component={HomePage}>
          {user ? RedirectUser(user.role) : ""}
        </Route>
        <Route exact path="/login" component={LoginPage}></Route>
        <Route exact path="/signUp" component={SignUpPage}></Route>
        <Route exact path="/chooseExamToSet" component={ExamChoicePage}></Route>
        <Route exact path="/subjects" component={SubjectsListPage}></Route>
        <Route exact path="/staffHome" component={StaffDashboard}></Route>
        <Route exact path="/studentHome" component={StudentDashboard}></Route>
        <Route exact path="/adminHome" component={AdminDashboard}></Route>
        <Route exact path="/subjectsViewAdd" component={Subjects}></Route>
        <Route
          exact
          path="/classAndClassTeachers"
          component={ClassesAndClassTeachersPage}
        ></Route>
        <Route
          exact
          path="/staffAndUsers"
          component={StaffAndUsersPage}
        ></Route>
        <Route
          exact
          path="/registerSubject"
          component={RegisteredSubjects}
        ></Route>
        <Route exact path="/testChoice" component={TestsChoicePage}></Route>
        <Route
          exact
          path="/takeExam/:subjectId/:testTypeId"
          component={TakeTestPage}
        ></Route>
        <Route exact path="/chooseExamToSet" component={ExamChoicePage}></Route>
        <Route
          exact
          path="/setExam/:subjectId/:levelId"
          component={SetExamPage}
        ></Route>
        <Route exact path="/profile" component={ProfilePage}></Route>
      </Switch>
      <Footer></Footer>
    </div>
  );
}

export default App;
