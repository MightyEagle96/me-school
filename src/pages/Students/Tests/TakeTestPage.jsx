import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { httpService, loggedInUser } from '../../../data/services';
import QuestionTemplate from './QuestionTemplate';

export const TakeTestPage = () => {
  const { subjectId, testTypeId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [questionId, setQuestionId] = useState('');
  const [subjectDetail, setSubjectDetail] = useState({});
  const [testType, setTestType] = useState({});
  const [testDetail, setTestDetail] = useState({
    activated: false,
    duration: 0,
  });

  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const [questionNumber, setQuestionNumber] = useState(0);

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
  return (
    <div>
      <div className="p-3">
        <div className="border border-primary p-5">
          {/* {subjectDetail && !subjectDetail.message ? (
            <div>
              <div className="card col-md-3 mb-2 ">
                <div className="card-body">
                  <h3 className="card-title">{loggedInUser.fullName}</h3>
                  <h6 class="card-subtitle mb-2 text-muted">Candidate Name</h6>
                </div>
              </div>
              <div className="card col-md-3 mb-2 ">
                <div className="card-body">
                  <h3 className="card-title">{loggedInUser.level.level}</h3>
                  <h6 class="card-subtitle mb-2 text-muted">Candidate Class</h6>
                </div>
              </div>
              <div className="card col-md-3 mb-2 ">
                <div className="card-body">
                  <h3 className="card-title">{subjectDetail.title}</h3>
                  <h6 class="card-subtitle mb-2 text-muted">Subject</h6>
                </div>
              </div>
              <div className="form-group">
                <button className="btn btn-primary">
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
          </div> */}
          <div className="h3">
            <div className="row">
              <div className="col-md-6">
                <QuestionTemplate
                  question={questions[questionNumber]}
                  index={questionNumber}
                  answeredQuestion={answeredQuestions}
                  setAnsweredQuestion={setAnsweredQuestions}
                />
              </div>
              <div className="col-md-6"></div>
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
        </div>
      </div>
    </div>
  );
};
