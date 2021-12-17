import { Redirect } from 'react-router';

export const loginRouting = (role) => {
  switch (role) {
    case 'class teacher':
      return window.location.assign('/classTeacherHome');
    case 'student':
      return window.location.assign('/studentHome');
    case 'admin':
      return window.location.assign('/adminHome');
    case 'teacher':
      return window.location.assign('/teacherHome');

    default:
      break;
  }
};

export const RedirectUser = (role) => {
  switch (role) {
    case 'student':
      return <Redirect to="/studentHome" />;
    case 'class teacher':
      return <Redirect to="/staffHome" />;
    case 'admin':
      return <Redirect to="/adminHome" />;

    default:
      break;
  }
};
