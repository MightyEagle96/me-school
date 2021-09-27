export const loginRouting = (role) => {
  switch (role) {
    case 'classTeacher':
      return window.location.assign('/staffHome');

    default:
      break;
  }
};
