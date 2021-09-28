import React, { useState, useEffect } from 'react';
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/Navbar/Navbar';
import { StaffSideMenu } from '../../../components/SideMenu/StaffSideMenu/StaffSideMenu';
import { useParams } from 'react-router';
import { httpService } from '../../../data/services';
import { MDBCollapse } from 'mdb-react-ui-kit';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

export default function SetExamPage() {
  const { subjectId, levelId } = useParams();
  const [subject, setSubject] = useState({});
  const [level, setLevel] = useState({});
  const [showShow, setShowShow] = useState(false);
  const [paperDetail, setPaperDetail] = useState({});
  const [question, setQuestion] = useState({});
  const [questions, setQuestions] = useState([]);

  const [showTerm, setShowTerm] = useState(false);
  const [testTypes, setTestTypes] = useState([]);
  const [currentTerm, setCurrentTerm] = useState([]);
  const toggleShow = () => setShowShow(!showShow);

  const toggleTerm = () => setShowTerm(!showTerm);
  async function getSubject() {
    const path = `subjects/${subjectId}`;
    const res = await httpService.get(path);
    if (res) {
      setSubject(res.data.subject);
    }
  }
  async function getLevel() {
    const path = `levels/${levelId}`;
    const res = await httpService.get(path);
    if (res) {
      setLevel(res.data.level);
    }
  }
  async function getTestTypes() {
    const path = 'testType';
    const res = await httpService.get(path);
    if (res) {
      setTestTypes(res.data.testTypes);
    }
  }

  async function getTerms() {
    const path = 'terms';
    const res = await httpService.get(path);
    if (res) {
      setCurrentTerm(res.data.terms);
    }
  }

  async function fetchQuestions() {
    const path = `questions?currentClass=${level._id}&subject=${subject._id}&currentTerm=${paperDetail.termId}&testType=${paperDetail.testTypeId}`;
    //const path = 'questions';
    const res = await httpService.get(path);
    if (res) {
      if (!res.data.message) {
        console.log(res.data.questions.questions);
        setQuestions(res.data.questions.questions);
      }
    }
  }
  async function postQuestions(e) {
    e.preventDefault();
    const path = 'questions';

    const body = {
      ...question,
      currentTerm: paperDetail.termId,
      testType: paperDetail.testTypeId,
      subject: subject._id,
      currentClass: level._id,
    };
    const res = httpService.post(path, body);
    if (res) {
      fetchQuestions();
    }
  }

  useEffect(() => {
    getSubject();
    getLevel();
    getTestTypes();
    getTerms();
  }, []);

  const handleChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <Navbar></Navbar>
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
                        {paperDetail.term || 'Choose paper type'}
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
            <div className="d-flex justify-content-end">
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
                          className="btn btn-info"
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
            <div className="border border-dark p-3 mb-3">
              <form onSubmit={postQuestions}>
                <div className="d-flex flex-wrap">
                  <div className="col-md-4 mb-2">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon">
                          <i className="fa fa-user prefix"></i>
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
                          <i className="fa fa-user prefix"></i>
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
                          <i className="fa fa-user prefix"></i>
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
                          <i className="fa fa-user prefix"></i>
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
                          <i className="fa fa-user prefix"></i>
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
                  <div className="col-md-4 mb-2">
                    <button className="btn btn-success" type="submit">
                      POST QUESTION
                    </button>
                    <button
                      className="btn btn-danger"
                      type="reset"
                      onClick={() => {
                        setQuestion({});
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <MDBTable hover>
              <MDBTableHead color="default-color" textWhite>
                <tr>
                  <th>Question</th>
                  <th>Option A</th>
                  <th>Option B</th>
                  <th>Option C</th>
                  <th>Option D</th>
                  <th>Correct Answer</th>
                  <th>Action</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {questions.map((q, index) => {
                  return (
                    <tr key={index}>
                      <td>{q.question}</td>
                      <td>{q.optionA}</td>
                      <td>{q.optionB}</td>
                      <td>{q.optionC}</td>
                      <td>{q.optionD}</td>
                      <td>{q.correctAns}</td>
                      <td>
                        <button className="btn btn-warning">UPdate</button>
                        <button className="btn btn-danger">delete</button>
                      </td>
                    </tr>
                  );
                })}
              </MDBTableBody>
            </MDBTable>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
