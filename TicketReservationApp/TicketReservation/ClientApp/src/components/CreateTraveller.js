import React from "react";

const entry = {
  id: "",
  nic: "",
  firstName: "",
  lastName: "",
  email: "",
  gender: 0,
  contactno: "",
  status: false,
};

export default function CreateTraveller(props) {
  const addNewTraveller = async () => {
    fetch("api/traveller", {
      method: "POST",
      body: JSON.stringify(entry),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((r) => {
        console.log("Response from backend for adding new traveller:", r);
        window.location = "/travellers";
      })
      .catch((e) => console.log("Error adding a new traveller"));
  };

  const newData = (e) => {
    const name_ = e.target.name;
    let v_ = e.target.value;

    if (name_ === "gender") {
      v_ = Number(v_);
    }

    if (name_ === "isActive") {
      v_ = v_ === "1";
    }

    entry[name_] = v_;

    console.log("The new Traveller is ", entry);
  };

  return (
    <section className="container mt-5 d-flex justify-content-center">
      <div className="card p-4">
        <h1 className="mb-4">Add new Traveller</h1>

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

        <div className="mb-3 d-flex align-items-center">
          <label className="form-label me-4">Status:</label>
          <select
            name="isActive"
            className="form-select"
            onChange={newData}
            disabled
          >
            <option value={0}>InActive</option>
            <option value={1}>Active</option>
          </select>
        </div>

        <div className="d-flex justify-content-between">
          <button
            className="btn btn-secondary"
            onClick={() => (window.location = "/")}
          >
            Cancel
          </button>
          <button className="btn btn-primary" onClick={addNewTraveller}>
            Create
          </button>
        </div>
      </div>
    </section>
  );
}
