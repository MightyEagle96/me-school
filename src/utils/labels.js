export const CATEGORY_LABEL = {
  JUNIOR_LABEL: 'junior',
  SENIOR_LABEL: 'senior',
  BOTH_LABEL: 'both',
};

export const ADDCLASS_INFO = {
  headerText: 'To create a new class',
  step1: 'Enter a class name',
  step2: 'Select the class category',
  step3: 'Create the class',

  CREATE_CLASS_TEXT:
    'Do you want to create this class, please note that this process cannot be undone as many users might be attached to this class',
};

export const NOTIFICATIONS_PAGE = {
  CLASS_ASSIGNMENT_TEXT:
    "Are you sure you want to assign this student to this class?\nThis change can't be undone.",
};

export const TEST_AND_EXAMINATIONS_PAGE = {
  information_text:
    'A test type can either be a continuous assessment like a test, quiz or an examination. \nStudents will be tested on any of the subjects based on a certain test type.',
};

export const TEST_TYPES = [
  'First Continous Assessment',
  'Second Continous Assessment',
  'Third Continous Assessment',
  'Examination',
];

export const ROLE = (role) => {
  switch (role) {
    case 'admin':
      return 'Admin';

    case 'teacher':
      return 'Teacher';

    case 'classTeacher':
      return 'Class Teacher';

    case 'student':
      return 'Student';
    default:
      break;
  }
};
