import React from "react";

const entry = {
  id: "",
  nic: "",
  firstName: "",
  lastName: "",
  email: "",
  contactno: "",
 
};

export default function CreateBackOfficer(props) {
  //Register a new Backofficer
   const addNewBackOfficer = async () => {
     if (entry.nic === "" || entry.firstName === "" || entry.lastName === "" || entry.email === "" || entry.contactno === "" ) 
     {
       alert("Please input all required data");
     } else {
       fetch("api/backofficer", {
         method: "POST",
         body: JSON.stringify(entry),
         headers: {
           "content-type": "application/json",
         },
       })
         .then((r) => {
           console.log("Response from backend for adding new backofficer:", r);
           window.location = "/backofficer-dashboard";
         })
         .catch((e) => console.log("Error adding a new backofficer"));
     }
   };

  const newData = (e) => {
    const name_ = e.target.name;
    let v_ = e.target.value; 

    entry[name_] = v_;

    console.log("The new Backofficer is ", entry);
  };

  return (
    <section className="container mt-5 d-flex justify-content-center">
      <div className="card p-4">
        <h1 className="mb-4">Register Backofficer</h1>

        <div className="mb d-flex align-items-center">
          <label className="form-label me-4">NIC: </label>
          <input
            type="text"
            className="form-control form-control-sm text-left"
            name="nic"
            onChange={newData}
          />
        </div>

        <div className="mb-3 d-flex align-items-center">
          <label className="form-label me-1">First Name:</label>
          <input
            type="text"
            name="firstName"
            className="form-control form-control-sm text-left"
            onChange={newData}
          />
        </div>

        <div className="mb-3 d-flex align-items-center">
          <label className="form-label me-1">Last Name:</label>
          <input
            type="text"
            name="lastName"
            className="form-control form-control-sm text-left"
            onChange={newData}
          />
        </div>

        <div className="mb-3 d-flex align-items-center">
          <label className="form-label me-4">Email:</label>
          <input
            type="email"
            name="email"
            className="form-control form-control-sm text-left"
            onChange={newData}
          />
        </div>

        <div className="mb-3 d-flex align-items-center">
          <label className="form-label ">Contact No:</label>
          <input
            type="number"
            name="contactno"
            className="form-control form-control-sm text-left"
            onChange={newData}
          />
        </div>
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-secondary"
            onClick={() => (window.location = "/backofficer-dashboard")}
          >
            Cancel
          </button>
          <button className="btn btn-primary" onClick={addNewBackOfficer}>
            Register
          </button>
        </div>
      </div>
    </section>
  );
}
