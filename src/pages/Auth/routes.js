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
