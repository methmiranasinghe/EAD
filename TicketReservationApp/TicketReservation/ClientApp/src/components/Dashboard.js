import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    //Main Dashboard
    <div className="container mt-5 text-center">
      <h1>Welcome to the Dashboard</h1>
      <div className="mt-4">
        <h2>Select User Type</h2>
        <div className="row mt-4 justify-content-center">
          <div className="col-md-3 mb-3">
            <Link
              to="/new-backofficer"
              className="btn btn-primary btn-lg btn-block"
            >
              Back Office Register
            </Link>
          </div>
          <div className="col-md-3">
            <Link
              to="/new-traveller"
              className="btn btn-success btn-lg btn-block"
            >
              Traveller Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
