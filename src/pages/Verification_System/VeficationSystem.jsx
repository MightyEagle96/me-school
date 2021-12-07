import React from 'react';

export default function VeficationSystem() {
  return (
    <div>
      <div className="p-3">
        <div className="text-center">
          <button className="btn btn-success">
            Upload{' '}
            <span className="ml-2">
              <i class="fas fa-upload    "></i>
            </span>
          </button>
        </div>
        <table className="table table-striped">
          <thead>
            <th>Surname</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th></th>
          </thead>
        </table>
      </div>
    </div>
  );
}
