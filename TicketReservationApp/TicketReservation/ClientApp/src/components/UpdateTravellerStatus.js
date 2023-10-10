import React, { useEffect, useState } from "react";
const entry = {
  id: "",
  nic: "",
  firstName: "",
  lastName: "",
  email: "",
  gender: 0,
  contactNo: "",
  status: false,
};
export default function UpdateTravellerStatus(props) {
  
  const [data, setData] = useState({});

  const [isActive, setActive] = useState(false);
  const [tid, setTid] = useState("");

  //Update traveller account status
  const updateTraveller = () => {
    console.log( "The Updated Traveller is", entry);
    fetch("api/traveller/" + tid, {
      method: "PUT",
      body: JSON.stringify(entry),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((r) => {
        console.log("Response for updating a traveller:", r);
        window.location = "/update-status-management";
      })
      .catch((e) => console.log("Error updating traveller"));
  };

  const newData = (e) => {
    const name_ = e.target.name;
    let v_ = e.target.value;

    if (name_ === "status") {

      v_ = v_ === "true";
      setActive(v_);
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
      fetch("api/traveller/" + id_)
        .then((r) => r.json())
        .then((d) => {
          console.log("Traveller for update", d);
          setActive(d.status);
          setData(d);
          Object.assign(entry, d);
        })
        .catch((e) => console.log("Error getting traveller for update", e));
    }
  }, []);

  return (
    <section className="container mt-5 d-flex justify-content-center">
      <div className="card p-4">
        <h1>Update Traveller</h1>

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
            disabled
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
            disabled
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
            disabled
          />
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <select name="status" id="status" value={isActive} onChange={newData}>
            <option value={true}>Active</option>
            <option value={false}>Deactive</option>
          </select>
        </div>

        <div className="d-flex justify-content-between">
          <div
            className="btn btn-secondary"
            onClick={() => (window.location = "/travellers")}
          >
            Cancel
          </div>
          <div className="btn btn-primary" onClick={updateTraveller}>
            Update
          </div>
        </div>
      </div>
    </section>
  );
}
