import React from "react";

const data = [
  {
    "title":"Backofficer Management",
    "subtitle":"Manage backofficers here.",
    "path":"/backofficers",
    "buttonText":"Backofficer Management"
  },
  {
    "title":"Update Status",
    "subtitle":"Update status for traveller accounts.",
    "path":"/update-status-management",
    "buttonText":"Activate or Inactive the Traveller Accounts"
  },
  {
    "title":"Train Management",
    "subtitle":"Manage trains.",
    "path":"/train-management",
    "buttonText":"Train Management"
  },
  {
    "title":"Schedule Management",
    "subtitle":"Manage train schedules.",
    "path":"/schedule-management",
    "buttonText":"Schedule Management"
  },
  {
    "title":"Agency Management",
    "subtitle":"Manage agencies",
    "path":"/travellers",
    "buttonText":"Manage Agency"
  },
]

const BackOfficerDashboard = () => {
  return (
    //Back Officer Dashboard
    <div className="container mt-5">
      <h1>Back Officer Dashboard</h1>
      <div className="row mt-4">
        {
          data.map((item ,i) => <Tile key={i} title={item.title} path={item.path} subtitle={item.subtitle} buttonText={item.buttonText} /> )
        }
        {/* <Tile title={"Back"} />
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
                Manage trains.
              </p>
              <a href="/train-management" className="btn btn-primary">
                Train Management
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Schedule Management</h5>
              <p className="card-text">
                
              </p>
              <a href="/schedule-management" className="btn btn-primary">
                Schedule Management
              </a>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default BackOfficerDashboard;

const Tile = ({title, subtitle , path  , buttonText}) => {
  return(
    <div className="col-md-4 mt-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">
                {subtitle}
              </p>
              <a href={path} className="btn btn-primary">
                {buttonText}
              </a>
            </div>
          </div>
        </div>
  )
}
