import React from "react";

export const IsLoading = ({ color, show }) => {
  return show == true ? (
    <div class="spinner-border text-light" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  ) : (
    ""
  );
};
