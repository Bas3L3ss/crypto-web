import React from "react";
import { Link } from "react-router-dom";

const ErrorElement = () => {
  return (
    <div>
      <h1>Error</h1>
      <Link to="/">
        <div className="coinPage-RouteButton">
          please try again (click to go back)
        </div>
      </Link>
    </div>
  );
};

export default ErrorElement;
