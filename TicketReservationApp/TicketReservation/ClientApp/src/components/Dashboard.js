import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const buttonStyle = { width: "200px" }; // Set the desired fixed width

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          {/* Image on the left filling the entire column */}
          <img
            src="1.jpg"
            alt="Sri Lanka Railways"
            style={{ width: "100%", height: "85vh", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
          {/* Buttons on the right */}
          <div className="text-center">
            <h2>Welcome to Sri Lanka Railways</h2>
          </div>
          <div className="text-center mt-4">
            <div className="mb-3">
              <Link to="/new-backofficer" className="btn btn-primary btn-lg btn-block" style={buttonStyle}>
                Back Office Register
              </Link>
            </div>
            <div className="mb-3">
              <Link to="/new-traveller" className="btn btn-success btn-lg btn-block" style={buttonStyle}>
                Traveller Register
              </Link>
            </div>
            <div>
              <Link to="/ticket-booking-management" className="btn btn-success btn-lg btn-block" style={buttonStyle}>
                Travel Agent
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
