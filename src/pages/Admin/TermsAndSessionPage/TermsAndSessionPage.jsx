import React, { useState, useEffect } from "react";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
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
  const [terms, setTerms] = useState([]);

  const showModal = (e) => {
    if (e === "term") {
      setShowTerm(!showTerm);
    } else if (e === "session") {
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
      Swal.fire({
        icon: "success",
        title: "Success",
        text: res.data.message,
      }).then(() => {
        toggle("term");
      });
    }
  };

  const listTerms = async () => {
    const path = "/terms/view";
    const res = await httpService.get(path);
    if (res) {
      setTerms(res.data.terms);
    }
  };

  useEffect(() => {
    listTerms();
  }, []);
  return (
    <div>
      <div className="p-3">
        <div className="mt-3 mb-3 h3">Terms And Sessions</div>
        <hr />
        <div className="row">
          <div className="col-md-4">
            <div className="alert alert-primary">
              <div className="h3">Current Session</div>
              <div className="h2">2021-2022</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="alert alert-primary">
              <div className="h3">Current Term</div>
              <div className="h2">FIRST TERM</div>
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
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Session</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody></tbody>
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
                          <button className="btn btn-light">Make active</button>
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
                    <option value="true">Yes</option>
                    <option value="false">No</option>
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
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <button className="btn btn-primary" onClick={createTerm}>
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
