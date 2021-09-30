import React, { useState, useEffect } from 'react';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
} from 'mdb-react-ui-kit';
import { httpService } from '../../data/services';

export default function ExamChoiceItem(subject) {
  const [testTypes, setTestTypes] = useState([]);
  //fetch the terms
  const fetchTestTypes = async () => {
    const path = 'testType';
    const res = await httpService.get(path);
    if (res) {
      setTestTypes(res.data.testTypes);
    }
  };

  useEffect(() => {
    fetchTestTypes();
  }, []);

  return (
    <div>
      <MDBCol style={{ maxWidth: '22rem' }}>
        <MDBCard>
          <MDBCardImage
            className="img-fluid"
            src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg"
            waves
          />
          <MDBCardBody>
            <MDBCardTitle>{subject.subject.subject.title}</MDBCardTitle>
            <MDBCardText>
              {testTypes.map((testType, index) => {
                return (
                  <a
                    key={index}
                    target="_blank"
                    href={`/takeExam/${subject.subject.subject._id}/${testType._id}`}
                    className="btn btn-pink"
                    rel="noreferrer"
                  >
                    {testType.testType}
                  </a>
                );
              })}
            </MDBCardText>
            {/* <MDBBtn href="#">Click</MDBBtn> */}
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </div>
  );
}
