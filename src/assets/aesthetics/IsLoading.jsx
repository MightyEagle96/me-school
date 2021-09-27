import React from 'react';

export const IsLoading = ({ color }) => {
  return (
    <div className={`spinner-border ${color}`} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
};
