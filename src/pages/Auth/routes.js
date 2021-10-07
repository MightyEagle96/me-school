import { Redirect } from 'react-router';

export const loginRouting = (role) => {
  switch (role) {
    case 'classTeacher':
      return window.location.assign('/staffHome');
    case 'student':
      return window.location.assign('/studentHome');

    default:
      break;
  }
};

export const RedirectUser = (role) => {
  switch (role) {
    case 'student':
      return <Redirect to="/studentHome" />;
    case 'classTeacher':
      return <Redirect to="/staffHome" />;

    default:
      break;
  }
};
