import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Swal from 'sweetalert2';
import { httpService, loggedInUser } from '../../../data/services';
import QuestionTemplate from './QuestionTemplate';
import TimerTemplate from './TimerTemplate';

export const TakeTestPage = () => {
  const { subjectId, testTypeId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [questionId, setQuestionId] = useState('');
  const [subjectDetail, setSubjectDetail] = useState({});

  const [testDetail, setTestDetail] = useState({
    duration: 0,
  });

  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const [questionNumber, setQuestionNumber] = useState(0);

  const [timeUp, setTimeUp] = useState(false);

  const [testType, setTestType] = useState({});

  const [displayExam, setDisplayExam] = useState(false);

  const [hasTakenPaper, setHasTakenPaper] = useState();

  const [divisor, setDivisor] = useState(0);

  async function HasTaken(paperId) {
    const path = `takeExams/hasTakenPaper/${paperId}`;
    const res = await httpService.get(path);

    if (res) {
      setHasTakenPaper(res.data.hasTaken);
    }
  }

  async function GetQuestions() {
    const path = `questions?currentClass=${loggedInUser.level._id}&subject=${subjectId}&currentTerm=${loggedInUser.currentTerm._id}&testType=${testTypeId}`;
    const res = await httpService.get(path);

    if (res && res.data.questions) {
      setQuestions(res.data.questions.questions);
      setQuestionId(res.data.questionId);

      setTestDetail({
        activated: res.data.questions.activated,
        duration: res.data.questions.duration,
      });
      if (res.data.questionId) {
        console.log(res.data);
        HasTaken(res.data.questionId);
        setSubjectDetail(res.data.questions.subject);
        setDivisor(res.data.questions.divisor);
        setTestType(res.data.questions.testType);
      } else {
        setSubjectDetail({ message: 'Paper not available' });
      }
    }
  }

  async function BeginPaper() {
    /**
     * Register the student against the paper
     *
     */
  }

  function ChangeButtonColor(index) {
    if (index === questionNumber) return 'btn-danger';

    const hasAnswered = answeredQuestions.find((q) => q.questionId === index);

    if (hasAnswered) {
      return 'btn-success';
    } else return 'btn-warning';
  }
  useEffect(() => {
    GetQuestions();
  }, []);

  async function CalculateScoreAndSubmit() {
    Swal.fire({
      icon: 'question',
      title: 'Submit?',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        submitPaper();
      }
    });
  }
  async function submitPaper() {
    let score = 0;
    answeredQuestions.forEach((a) => {
      score += a.score;
    });
    const totalScore = Math.ceil((score / questions.length) * divisor);
    const path = `student/result/${questionId}`;
    const res = await httpService.post(path, { score: totalScore });

    if (res) {
      Swal.fire({ icon: 'success', titleText: 'Paper submitted' }).then(() => {
        window.close();
      });
    }
  }
  function ShowTimeUp() {
    if (timeUp) {
      Swal.fire({ icon: 'info', titleText: 'TIME UP' }).then(() => {
        submitPaper();
      });
    }
  }

  async function startExam() {
    //1. display the exam panel
    setDisplayExam(true);
    function getCountDown() {
      setTimeout(() => {
        setTimeUp(true);
      }, testDetail.duration);
    }

    getCountDown();
    //2. register the student against the exam
    const path = 'takeExams/registerStudentWithPaper';
    const body = { paper: questionId };
    const res = await httpService.post(path, body);
    if (res) {
      console.log(res.data);
    }
  }

  function ShowButtonOrNot() {
    //1. if paper is not activated don't show the button
    if (!testDetail.activated) {
      return <h3>This paper is not yet activated, contact your teacher</h3>;
    }

    //2. if the user has taken the paper show a text
    else if (hasTakenPaper) {
      return <h3>You have already taken this paper</h3>;
    }

    //3. if none of these is true display the button
    return (
      <button className="btn btn-primary" onClick={startExam}>
        Begin <i class="fas fa-pen  ml-3  "></i>
      </button>
    );
  }

  ShowTimeUp();
  return (
    <div>
      <div className="p-3">
        <div className="border border-primary p-5">
          {!displayExam ? (
            <div>
              {subjectDetail && !subjectDetail.message ? (
                <div>
                  <div className="card col-md-3 mb-2 ">
                    <div className="card-body">
                      <h3 className="card-title">{loggedInUser.fullName}</h3>
                      <h6 class="card-subtitle mb-2 text-muted">
                        Candidate Name
                      </h6>
                    </div>
                  </div>
                  <div className="card col-md-3 mb-2 ">
                    <div className="card-body">
                      <h3 className="card-title">{loggedInUser.level.level}</h3>
                      <h6 class="card-subtitle mb-2 text-muted">
                        Candidate Class
                      </h6>
                    </div>
                  </div>
                  <div className="card col-md-3 mb-2 ">
                    <div className="card-body">
                      <h3 className="card-title">{subjectDetail.title}</h3>
                      <h6 class="card-subtitle mb-2 text-muted">Subject</h6>
                    </div>
                  </div>
                  <div className="form-group">{ShowButtonOrNot()}</div>
                </div>
              ) : (
                ''
              )}

              <div>
                {subjectDetail && subjectDetail.message ? (
                  <div>
                    <div>
                      <div className="text-center h1 text-danger">
                        {subjectDetail.message}
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          ) : (
            ''
          )}
          {displayExam ? (
            <div>
              <div className="row">
                <div className="col-md-6">
                  <QuestionTemplate
                    question={questions[questionNumber]}
                    index={questionNumber}
                    answeredQuestion={answeredQuestions}
                    setAnsweredQuestion={setAnsweredQuestions}
                  />
                </div>
                <div className="col-md-6">
                  <div className="float-right">
                    <div>
                      {testDetail.duration > 0 ? (
                        <TimerTemplate
                          examTime={testDetail.duration}
                          setTimeUp={setTimeUp}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                    <div className="mt-2">
                      <div className="card">
                        <div className="card-body">
                          <div className="h5">
                            Subject: {subjectDetail.title}
                          </div>
                          <div className="h5">
                            Paper Type: {testType.testType}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                {questions.map((question, index) => {
                  return (
                    <button
                      key={index}
                      className={`btn ${ChangeButtonColor(index)}`}
                      onClick={() => {
                        setQuestionNumber(index);
                      }}
                    >
                      {index + 1}
                    </button>
                  );
                })}
                <button
                  className="btn btn-primary"
                  onClick={CalculateScoreAndSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};
