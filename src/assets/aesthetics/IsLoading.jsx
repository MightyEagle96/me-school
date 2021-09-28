import React from 'react';
import { MDBSpinner } from 'mdb-react-ui-kit';
export const IsLoading = ({ color, show }) => {
  return (
    <div>
      {show ? (
        <MDBSpinner role="status">
          {/* <span className="hidden">Loading...</span> */}
        </MDBSpinner>
      ) : (
        ''
      )}
    </div>
  );
};
