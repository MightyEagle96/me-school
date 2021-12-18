import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router';
import { httpService } from '../../data/services';
import { MDBCollapse } from 'mdb-react-ui-kit';

import { HttpError } from '../../assets/aesthetics/HttpError';
import Swal from 'sweetalert2';
import { MyTable } from '../../assets/aesthetics/MyTable';

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
  const [questionId, setQuestionId] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateQuestionId, setUpdateQuestionId] = useState('');

  const [showTerm, setShowTerm] = useState(false);
  const [testTypes, setTestTypes] = useState([]);
  const [currentTerm, setCurrentTerm] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isActivated, setIsActivated] = useState(false);

  const [duration, setDuration] = useState({
    hour: 0,
    minute: 0,
  });

  const [divisor, setDivisor] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const uploadQuestion = async () => {
    if (!paperDetail.termId) {
      setLoading(false);
      return alert(`You haven't set the term yet`);
    }
    if (!paperDetail.testTypeId) {
      setLoading(false);
      return alert(`You haven't set the test type yet`);
    }
    setLoading(true);
    console.log(selectedFile);

    const formData = new FormData();
    formData.append('questions', selectedFile, selectedFile.name);

    console.log(formData);
    const path = `questions?currentTerm=${paperDetail.termId}&testType=${paperDetail.testTypeId}&subject=${subject._id}&currentClass=${level._id}`;
    // const body ={...}

    const res = await httpService.post(path, formData);

    if (res) {
      // setSelectedFile(null);
      fetchQuestions();
      Swal.fire({ icon: 'success', title: 'Document uploaded successfully' });
    }
  };

  const toggleShow = () => setShowShow(!showShow);

  const toggleTerm = () => setShowTerm(!showTerm);
  async function getSubject() {
    setLoading(true);
    const path = `subjects/view/${subjectId}`;
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
    const path = 'terms/view';
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
        setQuestionId(res.data.questionId);
        setIsActivated(res.data.questions.activated);
        setLoading(false);
        setDivisor(res.data.questions.divisor);

        if (res.data.questions.duration) {
          setDuration({
            hour: Math.floor(res.data.questions.duration / (60 * 60 * 1000)),
            minute: Math.floor(
              (res.data.questions.duration / (60 * 1000)) % 60
            ),
          });
        }
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
      fetchQuestions();
      setLoading(false);
      setQuestion(defaultData);
    } else {
      setLoading(false);
    }
  }

  function deleteQuestion(questionId) {
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

  async function toggleActivation(toggleStatus) {
    const path = `questions/${questionId}/toggleActivate/paper`;

    const res = await httpService.patch(path, {});

    if (res) {
      Swal.fire({ icon: 'success', title: `Paper ${toggleStatus}` });
      fetchQuestions();
    }
  }

  async function setTimer() {
    const path = `questions/${questionId}/timer/paper`;

    const res = await httpService.patch(path, duration);

    if (res) {
      Swal.fire({ icon: 'success', title: res.data.message });
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
  async function SetDivisor() {
    Swal.fire({
      icon: 'question',
      text: 'Do you want to update the divisor for this paper?',
      showCancelButton: true,
      showConfirmButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const path = `questions/${questionCollectionId}/divisor/paper`;
        const body = { divisor };
        const res = await httpService.patch(path, body);

        if (res) {
          Swal.fire({ icon: 'success', title: 'Divisor Updated' }).then(() => {
            fetchQuestions();
          });
        }
      }
    });
  }

  const columns = [
    { title: 'Question', field: 'question' },
    { title: 'Option A', field: 'optionA' },
    { title: 'Option B', field: 'optionB' },
    { title: 'Option C', field: 'optionC' },
    { title: 'Option D', field: 'optionD' },
    { title: 'Correct Answer', field: 'correctAns' },
    {
      title: 'Update',
      field: '_id',
      render: (rowData) => (
        <button
          className="btn btn-warning"
          onClick={() => {
            setUpdateQuestionId(rowData._id);
            fetchQuestion(rowData._id);
          }}
        >
          Update
        </button>
      ),
    },
    {
      title: 'Delete',
      field: '_id',
      render: (rowData) => (
        <button
          className="btn btn-danger"
          onClick={() => {
            deleteQuestion(rowData._id);
          }}
        >
          Delete
        </button>
      ),
    },
  ];
  return (
    <div>
      <div className="mt-3 pr-3">
        <div>
          <div className="row">
            <div className="col-md-4">
              <div className="shadow-lg rounded p-3">
                <div className="text-center">
                  <button className="btn btn-danger mb-2" onClick={toggleShow}>
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
              <div className="shadow-lg rounded p-3">
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
              <div className="shadow-lg rounded p-3 mb-2">
                <div className="d-flex justify-content-between">
                  <div>
                    <div className="h6">Subject: {subject.title}</div>
                    <div className="h6">Class: {level.level}</div>
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
        <div className="row">
          <div className="col-md-6">
            <div className="alert alert-light pt-5">
              {/* {loading ? (
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  ''
                )} */}
              <div className="row">
                <div className="col-md-3">
                  {isActivated ? (
                    <div>
                      <div className="text-center h1 text-success ">
                        <i
                          className="fas fa-lock-open   delete "
                          onClick={() => {
                            Swal.fire({
                              icon: 'question',
                              title: 'Deactivate paper?',
                              showCancelButton: true,
                              showConfirmButton: true,
                              confirmButtonText: 'Yes',
                              cancelButtonText: 'No',
                            }).then((result) => {
                              if (result.isConfirmed) {
                                toggleActivation('Deactivated');
                              }
                            });
                          }}
                        ></i>
                      </div>
                      <div className="text-center">
                        <div className="h6">Paper Activated</div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-center h1 text-danger ">
                        <i
                          className="fas fa-lock    delete"
                          onClick={() => {
                            Swal.fire({
                              icon: 'question',
                              title: 'Activate paper?',
                              showCancelButton: true,
                              showConfirmButton: true,
                              confirmButtonText: 'Yes',
                              cancelButtonText: 'No',
                            }).then((result) => {
                              if (result.isConfirmed) {
                                toggleActivation('Activated');
                              }
                            });
                          }}
                        ></i>
                      </div>
                      <div className="text-center">
                        <div className="h6">Paper Deactivated</div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="border-left col-md-6">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-primary text-white">
                        <i class="fas fa-clock    "></i>
                      </span>
                    </div>
                    <input
                      type="number"
                      placeholder="HH"
                      className="form-control"
                      min="0"
                      max="3"
                      value={duration.hour}
                      onChange={(e) => {
                        setDuration({ ...duration, hour: e.target.value });
                      }}
                    />
                    <input
                      type="number"
                      placeholder="MM"
                      className="form-control"
                      min="0"
                      max="59"
                      value={duration.minute}
                      onChange={(e) => {
                        setDuration({ ...duration, minute: e.target.value });
                      }}
                    />
                  </div>

                  <div className="text-center">
                    <button className="btn btn-primary" onClick={setTimer}>
                      Set Duration
                    </button>
                  </div>
                </div>
                <div className="border-left col-md-3">
                  <div className="form-group mb-3">
                    <label htmlFor="" className="form-label">
                      Divisor
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      onChange={(e) => {
                        setDivisor(e.target.value);
                      }}
                      value={divisor}
                    />
                    <button className="btn btn-warning" onClick={SetDivisor}>
                      <i class="fa fa-check" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="alert alert-secondary">
              {!paperDetail.type && !paperDetail.term ? (
                <span>Please select a paper type and a term</span>
              ) : (
                <b>
                  You are currently working on {subject.title} for {level.level}{' '}
                  and you are setting{' '}
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
                      If this is not the question you wish to set for you can
                      reload
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
        <div className="shadow-lg rounded p-4 mb-3">
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
                  <option value={question.optionA}>{question.optionA}</option>
                  <option value={question.optionB}>{question.optionB}</option>
                  <option value={question.optionC}>{question.optionC}</option>
                  <option value={question.optionD}>{question.optionD}</option>
                </select>
              </div>
            </div>
            <div className="col-md-4 mb-2">
              {isUpdate ? (
                <button className="btn btn-unique" onClick={updateQuestion}>
                  Update this question
                </button>
              ) : (
                <button className="btn btn-deep-purple" onClick={postQuestions}>
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
              {/* <button className="btn btn-success">
                  upload csv{' '}
                  <span>
                    <i className="fas fa-upload    ml-3"></i>
                  </span>
                </button> */}
              <div className="mt-3">
                <label htmlFor="customFile" className="form-label">
                  Upload CSV file for this paper
                </label>
                <input
                  type="file"
                  name=""
                  id="customFile"
                  className="form-control"
                  accept=".csv"
                  onChange={(e) => {
                    setSelectedFile(e.target.files[0]);
                  }}
                />
              </div>
              <div className="mt-3">
                {selectedFile ? (
                  <button className="btn btn-success" onClick={uploadQuestion}>
                    Upload{' '}
                    <span>
                      <i class="fas fa-upload    ml-2"></i>
                    </span>
                  </button>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <MyTable
            title={`${subject.title} questions`}
            data={questions}
            columns={columns}
          />
        </div>
      </div>
    </div>
  );
}
