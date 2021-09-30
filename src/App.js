import { Route, Switch } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import 'bootstrap/dist/js/bootstrap.bundle';

import HomePage from './pages/Gen/HomePage';
import { LoginPage } from './pages/Auth/LoginPage';
import { SignUpPage } from './pages/Auth/SignUpPage';
import ExamChoicePage from './pages/Teachers/Exams/ExamChoicePage';
import SubjectsListPage from './pages/Teachers/subjects/SubjectsList';
import StaffDashboard from './pages/Teachers/Home/StaffDashboard';
import './App.scss';
import SetExamPage from './pages/Teachers/Exams/SetExamPage';
import StudentDashboard from './pages/Students/Home/StudentDashboard';
import { RegisteredSubjects } from './pages/Students/Subjects/RegisteredSubjects';
import TestsChoicePage from './pages/Students/Tests/TestsChoicePage';
import { TakeTestPage } from './pages/Students/Tests/TakeTestPage';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage}></Route>
      <Route exact path="/login" component={LoginPage}></Route>
      <Route exact path="/signUp" component={SignUpPage}></Route>
      <Route exact path="/chooseExamToSet" component={ExamChoicePage}></Route>
      <Route exact path="/subjects" component={SubjectsListPage}></Route>
      <Route exact path="/staffHome" component={StaffDashboard}></Route>
      <Route exact path="/studentHome" component={StudentDashboard}></Route>
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
    </Switch>
  );
}

export default App;
