import React from "react";

const BackOfficerDashboard = () => {
  return (
    <div className="container mt-5">
      <h1>Back Officer Dashboard</h1>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Backofficer Management</h5>
              <p className="card-text">Manage backofficers here.</p>
              <a href="/backofficers" className="btn btn-secondary">
                Backofficer Management
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Update Status</h5>
              <p className="card-text">Update status for traveller accounts.</p>
              <a href="/update-status-management" className="btn btn-primary">
                Activate or Inactive the Traveller Accounts
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Train Management</h5>
              <p className="card-text">
                Manage training sessions and schedules.
              </p>
              <a href="/train-management" className="btn btn-primary">
                Train Management
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackOfficerDashboard;
