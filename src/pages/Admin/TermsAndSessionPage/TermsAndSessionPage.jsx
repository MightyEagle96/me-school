import React, { useState, useEffect } from 'react';
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import { httpService, loggedInUser } from '../../../data/services';
import { IsLoading } from '../../../assets/aesthetics/IsLoading';
import Swal from 'sweetalert2';

export default function TermsAndSessionPage() {
  const [showSession, setShowSession] = useState(false);
  const [showTerm, setShowTerm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [term, setTerm] = useState({ term: '', activeTerm: false });
  const [session, setSession] = useState({
    sessionStart: '',
    sessionEnd: '',
    activeSession: false,
  });
  const [sessions, setSessions] = useState([]);
  const [terms, setTerms] = useState([]);
  const [loadTerm, setLoadTerm] = useState(false);
  const [loadSession, setLoadSession] = useState(false);
  const [activeSession, setActiveSession] = useState({ session: '-' });
  const [activeTerm, setActiveTerm] = useState({ term: '-' });

  const showModal = (e) => {
    if (e === 'term') {
      setShowTerm(!showTerm);
    }
    if (e === 'session') {
      setShowSession(!showSession);
    }
  };
  const toggle = (e) => {
    if (e === 'term') {
      setShowTerm(!showTerm);
    } else if (e === 'session') {
      setShowSession(!showSession);
    }
  };

  const createTerm = async () => {
    const path = '/terms/create';
    const res = await httpService.post(path, term);
    if (res) {
      console.log(res.data);

      localStorage.setItem(
        'loggedInUser',
        JSON.stringify({
          ...loggedInUser,
          currentTerm: res.data.currentTerm._id,
        })
      );
      listTerms();
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: res.data.message,
      }).then(() => {
        toggle('term');
      });
    }
  };

  const createSession = async () => {
    //toggle("session");
    if (session.sessionStart === session.sessionEnd) {
      return Swal.fire({
        icon: 'error',
        text: 'The start of a session and the end of a session cannot be the same',
        timer: 2000,
      });
    } else if (Number(session.sessionStart) > Number(session.sessionEnd)) {
      return Swal.fire({
        icon: 'error',
        text: 'The start of a session year cannot be greater than the end of a session year',
        timer: 2000,
      });
    } else if (
      Number(session.sessionEnd) - Number(session.sessionStart) !==
      1
    ) {
      return Swal.fire({
        icon: 'error',
        text: 'This must be a calendar year',
        timer: 2000,
      });
    }

    const sessionString = `${session.sessionStart}-${session.sessionEnd}`;

    const body = {
      session: sessionString,
    };
    const path = '/session/create';
    toggle('session');
    const res = await httpService.post(path, body);
    if (res) {
      localStorage.setItem(
        'loggedInUser',
        JSON.stringify({
          ...loggedInUser,
          currentSession: res.data.currentSession._id,
        })
      );
      Swal.fire({ icon: 'success', titleText: res.data.message });
      listSessions();
    }
  };

  const listSessions = async () => {
    setLoadSession(true);
    const path = '/session/view';

    const res = await httpService.get(path);
    if (res) {
      setLoadSession(false);

      setSessions(res.data.sessions);
    } else {
      setLoadSession(false);
    }
    getActiveSession();
  };
  const listTerms = async () => {
    setLoadTerm(true);
    const path = '/terms/view';
    const res = await httpService.get(path);
    if (res) {
      console.log(res.data);
      setLoadTerm(false);
      if (res.data.terms.length > 0) setTerms(res.data.terms);
    } else {
      setLoadTerm(false);
    }
    getActiveTerm();
  };

  const activateSession = async (id) => {
    Swal.fire({
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      title: 'Activate?',
      text: 'Do you wish to make this session the active session?',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const path = `/session/update/${id}`;

        const res = await httpService.patch(path, { activeSession: true });
        if (res) {
          Swal.fire({ icon: 'success', text: res.data.message });
          listSessions();
        }
      }
    });
  };

  const activateTerm = async (id) => {
    Swal.fire({
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      title: 'Activate?',
      text: 'Do you wish to make this term the active term?',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const path = `/terms/update/${id}`;

        const res = await httpService.patch(path, { activeTerm: true });
        if (res) {
          Swal.fire({ icon: 'success', text: res.data.message });
          listTerms();
        }
      }
    });
  };

  const getActiveSession = async () => {
    const path = '/session/activeSession';
    const res = await httpService.get(path);

    if (res) {
      setActiveSession(res.data.activeSession);
    }
  };

  const getActiveTerm = async () => {
    const path = '/terms/activeTerm';
    const res = await httpService.get(path);

    if (res) {
      setActiveTerm(res.data.activeTerm);
    }
  };

  useEffect(() => {
    listSessions();
    listTerms();
    getActiveSession();
    getActiveTerm();
  }, []);
  return (
    <div>
      <div
        className=" mb-3 h3 text-secondary p-3 shadow-lg rounded"
        style={{ fontWeight: 400 }}
      >
        ACADEMIC SESSIONS & TERMS
      </div>
      <hr />
      <div className="p-3">
        <div className="row alert alert-success ">
          <div className="col-md-6">
            <div className="d-flex justify-content-between">
              <div>
                <div className="h5">Current Session</div>
                <div className="h3">
                  {activeSession ? activeSession.session : '-'}
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="h1 ">
                  <i class="fas fa-calendar"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="d-flex justify-content-between">
              <div>
                <div className="h5">Current Term</div>
                <div className="h3">{activeTerm ? activeTerm.term : '-'}</div>
              </div>
              <div className="d-flex align-items-center">
                <div className="h1">
                  <i class="fas fa-clock    "></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />

        <div className="row mt-5">
          <div className="col-md-6">
            <div className="d-flex justify-content-between">
              <div className="h5 text-secondary">ACADEMIC SESSIONS</div>
              <div>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    showModal('session');
                  }}
                >
                  Add Session
                </button>
              </div>
            </div>
            <IsLoading show={loadSession} color={'text-secondary'} />
            <table className="table table-condensed">
              <thead>
                <tr>
                  <th>Session</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((ses, index) => {
                  return (
                    <tr key={index}>
                      <td>{ses.session}</td>
                      <td>
                        {ses.activeSession ? (
                          <span className="badge badge-success"> Active </span>
                        ) : (
                          <span className="badge badge-danger">
                            {' '}
                            Not active{' '}
                          </span>
                        )}
                      </td>
                      <td>
                        {!ses.activeSession ? (
                          <button
                            className="btn btn-light"
                            onClick={() => {
                              activateSession(ses._id);
                            }}
                          >
                            Activate
                          </button>
                        ) : (
                          ''
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="border-left col-md-6">
            <div className="d-flex justify-content-between">
              <div className="h5 text-secondary">TERMS</div>
              <div>
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    showModal('term');
                  }}
                >
                  Add Term
                </button>
              </div>
            </div>
            <IsLoading show={loadTerm} color={'text-warning'} />
            <table className="table table-condensed">
              <thead>
                <tr>
                  <th>Term</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {terms.map((term, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div> {term.term}</div>
                      </td>
                      <td>
                        {term.activeTerm ? (
                          <span className="badge badge-success">Active</span>
                        ) : (
                          <div>
                            <span className="badge badge-danger">
                              Not active
                            </span>
                          </div>
                        )}
                      </td>
                      <td>
                        {!term.activeTerm ? (
                          <button
                            className="btn btn-light"
                            onClick={() => {
                              activateTerm(term._id);
                            }}
                          >
                            Activate
                          </button>
                        ) : (
                          ''
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* term */}
      <MDBModal show={showTerm} getOpenState={(e) => setShowTerm(e)}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Create Term</MDBModalTitle>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => {
                  toggle('term');
                }}
              >
                x
              </button>
            </MDBModalHeader>
            <MDBModalBody>
              <div>
                <label htmlFor="term">Term Name</label>
                <input
                  id="term"
                  type="text"
                  className="form-control"
                  placeholder="E.g First Term"
                  onChange={(e) => {
                    setTerm({ ...term, term: e.target.value });
                  }}
                  value={term.term}
                />
                {/* <div className="mt-2">
                  <label htmlFor="active">Make it active</label>
                  <select
                    name=""
                    id="active"
                    className="form-control"
                    onChange={(e) => {
                      setTerm({ ...term, activeTerm: e.target.value });
                    }}
                  >
                    <option value="">Select and option</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div> */}
                <button
                  className="btn btn-primary btn-sm mt-3"
                  onClick={createTerm}
                >
                  Create Term
                </button>
                <IsLoading color={'text-primary'} show={loading} />
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <MDBModal show={showSession} getOpenState={(e) => setShowSession(e)}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Create Session</MDBModalTitle>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => {
                  toggle('session');
                }}
              >
                x
              </button>
            </MDBModalHeader>
            <MDBModalBody>
              <div>
                <label htmlFor="term">Session Start</label>
                <input
                  id="term"
                  type="text"
                  className="form-control"
                  placeholder="E.g 2020"
                  onChange={(e) => {
                    setSession({ ...session, sessionStart: e.target.value });
                  }}
                  value={session.sessionStart}
                />
                <div className="mt-2">
                  <label htmlFor="term">Session End</label>
                  <input
                    id="term"
                    type="text"
                    className="form-control"
                    placeholder="E.g 2021"
                    onChange={(e) => {
                      setSession({ ...session, sessionEnd: e.target.value });
                    }}
                    value={session.sessionEnd}
                  />
                </div>
                {/* <div className="mt-2">
                  <label htmlFor="active">Make it active</label>
                  <select
                    name=""
                    id="active"
                    className="form-control"
                    onChange={(e) => {
                      setSession({ ...session, activeSession: e.target.value });
                    }}
                  >
                    <option value="">Select and option</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div> */}
                <div className="mt-3">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={createSession}
                  >
                    Create Session
                  </button>
                  <IsLoading color={'text-primary'} show={loading} />
                </div>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}
