import React, { useState, useEffect } from 'react';

import { httpService } from '../../data/services';
import './ExamChoiceItem.scss';

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
  console.log(subject);
  return (
    <div className="cardWidth mr-3">
      <div className="subjectBanner  text-white">
        <div className="p-3">
          <h3 className="marginText">{subject.subject.subject.title}</h3>
        </div>
        {/* <div className="mb-2">
         
        </div> */}
      </div>
      <div className="border border-white shadow-lg p-3 selectDiv">
        <div class="dropdown">
          <button
            class="btn btn-dark dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Select test type
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {testTypes.map((testType, index) => {
              return (
                <a
                  key={index}
                  target="_blank"
                  href={`/takeExam/${subject.subject.subject._id}/${testType._id}`}
                  className="dropdown-item"
                  rel="noreferrer"
                >
                  {testType.testType}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
    // <div>
    //   <MDBCol style={{ maxWidth: '22rem' }}>
    //     <MDBCard>
    //       <MDBCardImage
    //         className="img-fluid"
    //         src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg"
    //         waves
    //       />
    //       <MDBCardBody>
    //         <MDBCardTitle>{subject.subject.subject.title}</MDBCardTitle>
    //         <MDBCardText>
    //           {testTypes.map((testType, index) => {
    //             return (
    //               <a
    //                 key={index}
    //                 target="_blank"
    //                 href={`/takeExam/${subject.subject.subject._id}/${testType._id}`}
    //                 className="btn btn-pink"
    //                 rel="noreferrer"
    //               >
    //                 {testType.testType}
    //               </a>
    //             );
    //           })}
    //         </MDBCardText>
    //         {/* <MDBBtn href="#">Click</MDBBtn> */}
    //       </MDBCardBody>
    //     </MDBCard>
    //   </MDBCol>
    // </div>
  );
}
