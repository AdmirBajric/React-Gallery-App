import React from "react";
// Rendering when no searches are found
const NotFoundSearch = () => {
  return (
    <li className="not-found">
      <h2>No Results Found</h2>
      <h3>You search did not return any results. Please try again.</h3>
    </li>
  );
};

export default NotFoundSearch;
