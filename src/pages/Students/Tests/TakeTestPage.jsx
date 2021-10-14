import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { HttpError } from "../../../assets/aesthetics/HttpError";

import { httpService } from "../../../data/services";

export const TakeTestPage = () => {
  const { subjectId, testTypeId } = useParams();
  const [preview, setPreview] = useState({
    candidate: {
      fullName: "",
      currentSession: { session: "" },
      currentTerm: { term: "" },
      level: { level: "" },
    },
    subject: { title: "" },
    testType: { testType: "" },
  });
  const [loading, setLoading] = useState(false);

  const fetchPreview = async () => {
    setLoading(true);
    const path = `/takeExams/review/${subjectId}/${testTypeId}`;
    const res = await httpService.get(path);
    if (res) {
      setPreview(res.data);
      console.log(res.data);
      setLoading(false);
    } else {
      setLoading(false);
      return <HttpError />;
    }
  };

  useEffect(() => {
    fetchPreview();
  }, []);

  return (
    <div>
      <div className="border border-elegant m-3 p-5 ">
        <div className="row">
          <div className="col-md-6">
            {loading ? (
              <div className="spinner-grow text-danger" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <div>
                <div className="alert alert-primary col-md-4">
                  <div className="h5">
                    {" "}
                    Please preview the details below before you proceed
                  </div>
                </div>
                <div>
                  <div className="h5">Candidate:</div>
                  <div className="h3">{preview.candidate.fullName}</div>
                </div>
                <div>
                  <div className="h5">Class:</div>
                  <div className="h3">{preview.candidate.level.level}</div>
                </div>
                <div>
                  <div className="h5">Session:</div>
                  <div className="h3">
                    {preview.candidate.currentSession.session} session
                  </div>
                </div>
                <div>
                  <div className="h5">Term:</div>
                  <div className="h3">{preview.candidate.currentTerm.term}</div>
                </div>
                <div>
                  <div className="h5">Subject:</div>
                  <div className="h3">{preview.subject.title}</div>
                </div>
                <div className="mt-4">
                  <div className="h5">Paper Type:</div>
                  <div className="h3">{preview.testType.testType}</div>
                </div>
                <div className="mt-4">
                  <button className="btn btn-primary">{`Begin ${
                    preview.testType.testType.startsWith("E")
                      ? "Examination"
                      : "Test"
                  }`}</button>
                </div>
              </div>
            )}
          </div>
          <div className="col-md-6 border-left">
            <div className="h3 text-primary col-md-7 mb-4">
              IMPORTANT NOTICE TO TEST TAKERS
              <div className="border border-primary"></div>
            </div>
            <div>
              <ol>
                <li>
                  <h5>
                    {" "}
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Dolore nobis, quas accusantium modi animi nesciunt
                    reiciendis ea facilis quibusdam enim, earum reprehenderit
                    eveniet iure? Obcaecati explicabo iusto atque vel itaque?
                  </h5>
                </li>
                <li>
                  <h5>
                    {" "}
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Dolore nobis, quas accusantium modi animi nesciunt
                    reiciendis ea facilis quibusdam enim, earum reprehenderit
                    eveniet iure? Obcaecati explicabo iusto atque vel itaque?
                  </h5>
                </li>
                <li>
                  <h5>
                    {" "}
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Dolore nobis, quas accusantium modi animi nesciunt
                    reiciendis ea facilis quibusdam enim, earum reprehenderit
                    eveniet iure? Obcaecati explicabo iusto atque vel itaque?
                  </h5>
                </li>
                <li>
                  <h5>
                    {" "}
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Dolore nobis, quas accusantium modi animi nesciunt
                    reiciendis ea facilis quibusdam enim, earum reprehenderit
                    eveniet iure? Obcaecati explicabo iusto atque vel itaque?
                  </h5>
                </li>
                <li>
                  <h5>
                    {" "}
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Dolore nobis, quas accusantium modi animi nesciunt
                    reiciendis ea facilis quibusdam enim, earum reprehenderit
                    eveniet iure? Obcaecati explicabo iusto atque vel itaque?
                  </h5>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
