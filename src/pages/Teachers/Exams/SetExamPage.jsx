import React, { useState, useEffect } from 'react';
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/Navbar/Navbar';
import { StaffSideMenu } from '../../../components/SideMenu/StaffSideMenu/StaffSideMenu';
import { useParams } from 'react-router';
import { httpService } from '../../../data/services';
import { MDBCollapse } from 'mdb-react-ui-kit';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { HttpError } from '../../../assets/aesthetics/HttpError';
import Swal from 'sweetalert2';

export default function SetExamPage() {
  const defaultData = {
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAns: '',
  };
  const { subjectId, levelId } = useParams();
  const [subject, setSubject] = useState({});
  const [level, setLevel] = useState({});
  const [showShow, setShowShow] = useState(false);
  const [paperDetail, setPaperDetail] = useState({});
  const [question, setQuestion] = useState({});
  const [questions, setQuestions] = useState([]);
  const [questionCollectionId, setQuestionCollectionId] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateQuestionId, setUpdateQuestionId] = useState('');

  const [showTerm, setShowTerm] = useState(false);
  const [testTypes, setTestTypes] = useState([]);
  const [currentTerm, setCurrentTerm] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleShow = () => setShowShow(!showShow);

  const toggleTerm = () => setShowTerm(!showTerm);
  async function getSubject() {
    setLoading(true);
    const path = `subjects/${subjectId}`;
    const res = await httpService.get(path);
    if (res) {
      setSubject(res.data.subject);
      setLoading(false);
    } else {
      return HttpError;
    }
  }
  async function getLevel() {
    setLoading(true);
    const path = `levels/${levelId}`;
    const res = await httpService.get(path);
    if (res) {
      setLevel(res.data.level);
      setLoading(false);
    } else {
      return HttpError;
    }
  }
  async function getTestTypes() {
    setLoading(true);
    const path = 'testType';
    const res = await httpService.get(path);
    if (res) {
      setTestTypes(res.data.testTypes);
      setLoading(false);
    } else {
      return HttpError;
    }
  }

  async function getTerms() {
    setLoading(false);
    const path = 'terms';
    const res = await httpService.get(path);
    if (res) {
      setCurrentTerm(res.data.terms);
      setLoading(true);
    } else {
      return HttpError;
    }
  }

  async function fetchQuestions() {
    setLoading(true);
    const path = `questions?currentClass=${level._id}&subject=${subject._id}&currentTerm=${paperDetail.termId}&testType=${paperDetail.testTypeId}`;
    const res = await httpService.get(path);
    if (res) {
      if (!res.data.message) {
        setQuestionCollectionId(res.data.questions._id);
        setQuestions(res.data.questions.questions);
        setLoading(false);
      } else {
        return HttpError;
      }
    }
  }
  async function postQuestions(e) {
    setLoading(true);
    if (!paperDetail.termId) {
      setLoading(false);
      return alert(`You haven't set the term yet`);
    }
    if (!paperDetail.testTypeId) {
      setLoading(false);
      return alert(`You haven't set the test type yet`);
    }

    const path = 'questions';
    const body = {
      ...question,
      currentTerm: paperDetail.termId,
      testType: paperDetail.testTypeId,
      subject: subject._id,
      currentClass: level._id,
    };
    const res = await httpService.post(path, body);
    if (res) {
      console.log(res);
      fetchQuestions();
      setLoading(false);
      setQuestion(defaultData);
    } else {
      setLoading(false);
    }
  }

  function deleteQuestion(questionId) {
    console.log(questionId);
    Swal.fire({
      icon: 'question',
      title: 'Are you sure?',
      text: 'Do you want to delete this question?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: 'green',
      confirmButtonText: 'Yes delete',
      cancelButtonColor: 'red',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const path = `/questions/delete/${questionCollectionId}`;
        const body = { questionId };
        const res = await httpService.post(path, body);
        if (res) {
          fetchQuestions();
          Swal.fire({
            icon: 'success',
            title: 'Deleted',
            text: 'Question deleted',
          });
        }
      }
    });
  }

  async function fetchQuestion(questionId) {
    setLoading(true);
    const path = `/questions/${questionCollectionId}/${questionId}`;
    const res = await httpService.get(path);
    if (res) {
      setLoading(false);
      setIsUpdate(true);
      setQuestion(res.data.question);
    }
  }

  async function updateQuestion() {
    setLoading(true);
    const path = `/questions/${questionCollectionId}/${updateQuestionId}`;
    const res = await httpService.patch(path, question);
    if (res) {
      setLoading(false);
      fetchQuestions();
      setIsUpdate(false);
      setQuestion(defaultData);
      Swal.fire({
        icon: 'success',
        titleText: 'success',
        text: 'Question updated successfully',
      });
    }
  }
  useEffect(() => {
    getSubject();
    getLevel();
    getTestTypes();
    getTerms();
    fetchQuestions();
  }, []);

  const handleChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="row">
        <div className="col-md-3">
          <StaffSideMenu />
        </div>
        <div className="col-md-9 border-left ">
          <div className="mt-3 pr-2">
            <div>
              <div className="row">
                <div className="col-md-4">
                  <div className="alert alert-success">
                    <div className="text-center">
                      <button
                        className="btn btn-danger mb-2"
                        onClick={toggleShow}
                      >
                        {paperDetail.type || 'Choose paper type'}
                      </button>
                      <hr className="bg-white" />
                    </div>
                    <div className="text-center">
                      <MDBCollapse show={showShow}>
                        {testTypes.map((testType, index) => {
                          return (
                            <button
                              key={index}
                              className="btn btn-info"
                              onClick={() => {
                                setPaperDetail({
                                  ...paperDetail,
                                  testTypeId: testType._id,
                                  type: testType.testType,
                                });
                                setShowShow(!showShow);
                              }}
                            >
                              {testType.testType}
                            </button>
                          );
                        })}
                      </MDBCollapse>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="alert alert-info">
                    <div className="text-center">
                      <button
                        className="btn btn-secondary mb-2"
                        onClick={toggleTerm}
                      >
                        {paperDetail.term || 'Choose term to set'}
                      </button>
                      <hr className="bg-white" />
                    </div>
                    <div className="text-cetner">
                      <MDBCollapse show={showTerm}>
                        {currentTerm.map((term, index) => {
                          return (
                            <button
                              key={index}
                              className="btn btn-info"
                              onClick={() => {
                                setPaperDetail({
                                  ...paperDetail,
                                  termId: term._id,
                                  term: term.term,
                                });
                                setShowTerm(!showTerm);
                              }}
                            >
                              {term.term}
                            </button>
                          );
                        })}
                      </MDBCollapse>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="alert alert-danger mb-2">
                    <div className="d-flex justify-content-between">
                      <div>
                        <div className="h5">Subject: {subject.title}</div>
                        <div className="h5">Class: {level.level}</div>
                      </div>
                      <div>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            fetchQuestions();
                          }}
                        >
                          FETCH QUESTIONS
                        </button>
                      </div>
                    </div>

                    <hr className="bg-white" />
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <div className="col-md-6">
                {loading ? (
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className="col-md-6 ">
                <div className="alert alert-secondary">
                  {!paperDetail.type && !paperDetail.term ? (
                    <span>Please select a paper type and a term</span>
                  ) : (
                    <b>
                      You are currently working on {subject.title} for{' '}
                      {level.level} and you are setting{' '}
                      <span>
                        {' '}
                        <strong>{paperDetail.type}</strong>{' '}
                      </span>{' '}
                      questions for{' '}
                      <span>
                        {' '}
                        <strong>{paperDetail.term}.</strong>{' '}
                      </span>
                      <span>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => {
                            fetchQuestions();
                          }}
                        >
                          If this is not the question you wish to set for you
                          can reload
                        </button>{' '}
                        <a href="/chooseExamToSet" className="nav-link">
                          Go back to the SELECT CLASS TO SET PAGE.
                        </a>
                      </span>
                    </b>
                  )}
                </div>
              </div>
            </div>
            <div className="border border-dark p-4 mb-3">
              <div className="h3 text-secondary">SET QUESTIONS</div>
              <div className="d-flex flex-wrap">
                <div className="col-md-4 mb-2">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon">
                        Question
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Question"
                      aria-label="Username"
                      aria-describedby="basic-addon"
                      name="question"
                      value={question.question}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-4 mb-2">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon">
                        Option A
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Option A"
                      name="optionA"
                      value={question.optionA}
                      onChange={handleChange}
                      aria-label="Username"
                      aria-describedby="basic-addon"
                    />
                  </div>
                </div>
                <div className="col-md-4 mb-2">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon">
                        Option B
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Option B"
                      aria-label="Username"
                      aria-describedby="basic-addon"
                      name="optionB"
                      value={question.optionB}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-4 mb-2">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon">
                        Option C
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Option C"
                      aria-label="Username"
                      aria-describedby="basic-addon"
                      name="optionC"
                      value={question.optionC}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-4 mb-2">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon">
                        Option D
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Option D"
                      aria-label="Username"
                      aria-describedby="basic-addon"
                      name="optionD"
                      value={question.optionD}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-4 mb-2">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon">
                        Correct Answer
                      </span>
                    </div>
                    <select
                      className="form-control"
                      aria-label="Default select example"
                      value={question.correctAns}
                      onChange={handleChange}
                      name="correctAns"
                    >
                      <option selected>Select correct answer </option>
                      <option value={question.optionA}>
                        {question.optionA}
                      </option>
                      <option value={question.optionB}>
                        {question.optionB}
                      </option>
                      <option value={question.optionC}>
                        {question.optionC}
                      </option>
                      <option value={question.optionD}>
                        {question.optionD}
                      </option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4 mb-2">
                  {isUpdate ? (
                    <button className="btn btn-unique" onClick={updateQuestion}>
                      Update this question
                    </button>
                  ) : (
                    <button
                      className="btn btn-deep-purple"
                      onClick={postQuestions}
                    >
                      POST QUESTION
                    </button>
                  )}
                  <button
                    className="btn btn-pink"
                    type="reset"
                    onClick={() => {
                      setQuestion({});
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            <MDBTable hover bordered>
              <MDBTableHead color="secondary-color" textWhite>
                <tr>
                  <th>Question</th>
                  <th>Option A</th>
                  <th>Option B</th>
                  <th>Option C</th>
                  <th>Option D</th>
                  <th>Correct Answer</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {questions.map((q, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <p>{q.question}</p>
                      </td>
                      <td>
                        <p>{q.optionA}</p>
                      </td>
                      <td>
                        <p>{q.optionB}</p>
                      </td>
                      <td>
                        <p>{q.optionC}</p>
                      </td>
                      <td>
                        <p>{q.optionD}</p>
                      </td>
                      <td>
                        <p>{q.correctAns}</p>
                      </td>
                      <td>
                        <button
                          className="btn btn-deep-purple"
                          onClick={() => {
                            setUpdateQuestionId(q._id);
                            fetchQuestion(q._id);
                          }}
                        >
                          UPdate
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-deep-orange"
                          onClick={() => {
                            deleteQuestion(q._id);
                          }}
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </MDBTableBody>
            </MDBTable>
          </div>
        </div>
      </div>
    </div>
  );
}
