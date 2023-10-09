import React from "react";

const entry = {
  id: "",
  nic: "",
  firstName: "",
  lastName: "",
  email: "",
  gender: 0,
  contactno: "",
 
};

export default function CreateBackOfficer(props) {
   const addNewBackOfficer = async () => {
    console.log("calling API")
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
   };

  const newData = (e) => {
    const name_ = e.target.name;
    let v_ = e.target.value;

    if (name_ === "gender") {
      v_ = Number(v_);
    }

    

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
          <label className="form-label me-2">Gender: </label>
          <select name="gender" className="form-select" onChange={newData}>
            <option value={1}>Male</option>
            <option value={0}>Female</option>
          </select>
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
