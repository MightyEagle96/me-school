import React from 'react';

export default function NewAccountBanner() {
  return (
    <div>
      <div className="alert alert-info">
        <div className="p">
          Welcome to your new account. Your user password was created by an
          administrator.
          <br />
          Please update your password to dismiss this message.
        </div>
        <div>
          <a href="/profile" className="btn btn-link">
            Update password
          </a>
        </div>
      </div>
    </div>
  );
}
