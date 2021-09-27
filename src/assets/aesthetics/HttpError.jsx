import React from 'react';

export default function HttpErrorComponent() {
  return (
    <div className="col-md-4 alert alert-danger">
      Can't fetch data at this time. Please refresh the page or check your
      internet connectivity
    </div>
  );
}
