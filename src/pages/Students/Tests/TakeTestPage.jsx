import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { HttpError } from '../../../assets/aesthetics/HttpError';
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/Navbar/Navbar';
import { httpService } from '../../../data/services';

export const TakeTestPage = () => {
  const { subjectId, testTypeId } = useParams();
  const [preview, setPreview] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchPreview = async () => {
    setLoading(true);
    const path = `/takeExams/review/${subjectId}/${testTypeId}`;
    const res = await httpService.get(path);
    if (res) {
      setLoading(false);
      setPreview(res.data);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPreview();
  }, []);
  console.log(useParams());
  return (
    <div>
      <Navbar></Navbar>
      <div className="border border-elegant m-3 p-5 ">
        <div className="row">
          <div className="col-md-6">
            <div>
              <div>
                <HttpError />
                <div className="h4">Subject:</div>
                <div className="h1">That One</div>
              </div>
              <div className="mt-4">
                <div className="h4">Paper Type:</div>
                <div className="h1">That One</div>
              </div>
            </div>
          </div>
          <div className="col-md-6"></div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};
