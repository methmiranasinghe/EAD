import React, { useEffect, useState } from "react";
const entry = {
  id: "",
  nic: "",
  firstName: "",
  lastName: "",
  email: "",
  gender: 0,
  contactNo: "",
 
};
export default function EditBackOfficer(props) {
  const [data, setData] = useState({});
  const [gender, setGender] = useState(0);

  const [tid, setTid] = useState("");
  //Update Backofficer
  const updateBackOfficer = () => {
    //console.log( "The Updated Travller is", entry);
    fetch("api/backofficer/" + tid, {
      method: "PUT",
      body: JSON.stringify(entry),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((r) => {
        console.log("Response for updating a backofficer:", r);
        window.location = "/backofficers";
      })
      .catch((e) => console.log("Error updating backofficer"));
  };

  const newData = (e) => {
    const name_ = e.target.name;
    let v_ = e.target.value;

    if (name_ === "gender") {
      v_ = Number(v_);
      setGender(v_);
    }

    entry[name_] = v_;
  };

  useEffect(() => {
    let id_ = window.location.search;
    if (id_) {
      id_ = id_.split("=")[1];
    }
    if (id_) {
      setTid(id_);
      fetch("api/backofficer/" + id_)
        .then((r) => r.json())
        .then((d) => {
          console.log("Backofficer for update", d);
          setGender(d.gender);
          setData(d);
          Object.assign(entry, d);
        })
        .catch((e) => console.log("Error getting backofficer for update", e));
    }
  }, []);

  return (
    <section className="container mt-5 d-flex justify-content-center">
      <div className="card p-4">
        <h1>Update Backofficer</h1>

        <div className="mb-3">
          <label htmlFor="nic" className="form-label">
            NIC
          </label>
          <input
            type="text"
            className="form-control"
            name="nic"
            defaultValue={data.nic}
            onChange={newData}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            defaultValue={data.firstName}
            onChange={newData}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            defaultValue={data.lastName}
            onChange={newData}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            defaultValue={data.email}
            onChange={newData}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <select
            name="gender"
            id="gender"
            className="form-select"
            value={gender}
            onChange={newData}
          >
            <option value={1}>Male</option>
            <option value={0}>Female</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="contactno" className="form-label">
            Contact No
          </label>
          <input
            type="number"
            className="form-control"
            name="contactno"
            defaultValue={data.contactNo}
            onChange={newData}
          />
        </div>

        <div className="d-flex justify-content-between">
          <div
            className="btn btn-secondary"
            onClick={() => (window.location = "/backofficers")}
          >
            Cancel
          </div>
          <div className="btn btn-primary" onClick={updateBackOfficer}>
            Update
          </div>
        </div>
      </div>
    </section>
  );
}
