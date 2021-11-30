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
    activated: false,
    duration: 0,
  });

  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const [questionNumber, setQuestionNumber] = useState(0);

  const [timeUp, setTimeUp] = useState(false);

  const [testType, setTestType] = useState({});

  const [displayExam, setDisplayExam] = useState(false);

  async function HasTaken(paperId) {
    const path = `takeExams/hasTakenPaper/${paperId}`;
    const res = await httpService.get(path);

    if (res) {
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
    let score = 0;
    answeredQuestions.forEach((a) => {
      score += a.score;
    });

    alert(score);
    const path = `student/result/${questionId}`;
    const res = await httpService.post(path, { score });

    console.log(res.data);
  }

  function ShowTimeUp() {
    if (timeUp) {
      Swal.fire({ icon: 'info', titleText: 'TIME UP' });
    }
  }

  function startExam() {
    //1. display the exam panel
    setDisplayExam(true);
    //2. register the student against the exam
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
                  <div className="form-group">
                    <button className="btn btn-primary" onClick={startExam}>
                      Begin <i class="fas fa-pen  ml-3  "></i>
                    </button>
                  </div>
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
