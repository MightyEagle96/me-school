import { Redirect } from "react-router";

export const loginRouting = (role) => {
  switch (role) {
    case "classTeacher":
      return window.location.assign("/staffHome");
    case "student":
      return window.location.assign("/studentHome");
    case "admin":
      return window.location.assign("/adminHome");

    default:
      break;
  }
};

export const RedirectUser = (role) => {
  switch (role) {
    case "student":
      return <Redirect to="/studentHome" />;
    case "classTeacher":
      return <Redirect to="/staffHome" />;
    case "admin":
      return <Redirect to="/adminHome" />;

    default:
      break;
  }
};
