import React, { useState, useEffect } from "react";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { httpService } from "../../../data/services";
import { IsLoading } from "../../../assets/aesthetics/IsLoading";
import Swal from "sweetalert2";

export default function TermsAndSessionPage() {
  const [showSession, setShowSession] = useState(false);
  const [showTerm, setShowTerm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [term, setTerm] = useState({ term: "", activeTerm: false });
  const [session, setSession] = useState({
    sessionStart: "",
    sessionEnd: "",
    activeSession: false,
  });
  const [sessions, setSessions] = useState([]);
  const [terms, setTerms] = useState([]);
  const [loadTerm, setLoadTerm] = useState(false);
  const [loadSession, setLoadSession] = useState(false);

  const showModal = (e) => {
    if (e === "term") {
      setShowTerm(!showTerm);
    }
    if (e === "session") {
      setShowSession(!showSession);
    }
  };
  const toggle = (e) => {
    if (e === "term") {
      setShowTerm(!showTerm);
    } else if (e === "session") {
      setShowSession(!showSession);
    }
  };

  const createTerm = async () => {
    console.log(term);
    const path = "/terms/create";
    const res = await httpService.post(path, term);
    if (res) {
      listTerms();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: res.data.message,
      }).then(() => {
        toggle("term");
      });
    }
  };

  const createSession = async () => {
    //toggle("session");
    if (session.sessionStart === session.sessionEnd) {
      return Swal.fire({
        icon: "error",
        text: "The start of a session and the end of a session cannot be the same",
        timer: 2000,
      });
    } else if (Number(session.sessionStart) > Number(session.sessionEnd)) {
      return Swal.fire({
        icon: "error",
        text: "The start of a session year cannot be greater than the end of a session year",
        timer: 2000,
      });
    } else if (
      Number(session.sessionEnd) - Number(session.sessionStart) !==
      1
    ) {
      return Swal.fire({
        icon: "error",
        text: "This must be a calendar year",
        timer: 2000,
      });
    }

    const sessionString = `${session.sessionStart}-${session.sessionEnd}`;

    const body = {
      session: sessionString,
      activeSession: session.activeSession,
    };
    const path = "/session/create";
    toggle("session");
    const res = await httpService.post(path, body);
    if (res) {
      Swal.fire({ icon: "success", titleText: res.data.message });
      listSessions();
    }
  };

  const listSessions = async () => {
    setLoadSession(true);
    const path = "/session/view";

    const res = await httpService.get(path);
    if (res) {
      setLoadSession(false);

      setSessions(res.data.sessions);
    } else {
      setLoadSession(false);
    }
  };
  const listTerms = async () => {
    setLoadTerm(true);
    const path = "/terms/view";
    const res = await httpService.get(path);
    if (res) {
      setLoadTerm(false);
      setTerms(res.data.terms);
    } else {
      setLoadTerm(false);
    }
  };

  const activateSession = async (id) => {
    Swal.fire({
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
      title: "Activate?",
      text: "Do you wish to make this session the active session?",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const path = `/session/update/${id}`;

        const res = await httpService.patch(path, { activeSession: true });
        if (res) {
          Swal.fire({ icon: "success", text: res.data.message });
          listSessions();
        }
      }
    });
  };

  const activateTerm = async (id) => {
    Swal.fire({
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
      title: "Activate?",
      text: "Do you wish to make this term the active term?",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const path = `/terms/update/${id}`;

        const res = await httpService.patch(path, { activeTerm: true });
        if (res) {
          Swal.fire({ icon: "success", text: res.data.message });
          listTerms();
        }
      }
    });
  };

  useEffect(() => {
    listSessions();
    listTerms();
  }, []);
  return (
    <div>
      <div className="p-3">
        <div className="mt-3 mb-3 h3">Terms And Sessions</div>
        <hr />
        <div className="row alert alert-success ">
          <div className="col-md-4">
            <div className="h5">Current Session</div>
            <div className="h2">
              {sessions.length > 0
                ? sessions.find((t) => {
                    return t.activeSession === true;
                  }).session
                : "-"}
            </div>
          </div>
          <div className="col-md-4">
            <div className="h5">Current Term</div>
            <div className="h3">
              {terms.length > 0
                ? terms.find((t) => {
                    return t.activeTerm === true;
                  }).term
                : "-"}
            </div>
          </div>
          <div className="col-md-4"></div>
          <hr />
        </div>
        <hr />
        <div className="row">
          <div className="col-md-4">
            <div className="d-flex justify-content-between">
              <div className="h3">Sessions List</div>
              <div>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    showModal("session");
                  }}
                >
                  Add Session
                </button>
              </div>
            </div>
            <IsLoading show={loadSession} color={"text-secondary"} />
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
                            {" "}
                            Not active{" "}
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
                          ""
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="border-left col-md-4">
            <div className="d-flex justify-content-between">
              <div className="h3">Term List</div>
              <div>
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    showModal("term");
                  }}
                >
                  Add Term
                </button>
              </div>
            </div>
            <IsLoading show={loadTerm} color={"text-warning"} />
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
                          ""
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
                className="btn btn-danger"
                onClick={() => {
                  toggle("term");
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
                <div className="mt-2">
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
                </div>
                <button className="btn btn-primary" onClick={createTerm}>
                  Create Term
                </button>
                <IsLoading color={"text-primary"} show={loading} />
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
                className="btn btn-danger"
                onClick={() => {
                  toggle("session");
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
                <div className="mt-2">
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
                </div>
                <button className="btn btn-primary" onClick={createSession}>
                  Create Session
                </button>
                <IsLoading color={"text-primary"} show={loading} />
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}
