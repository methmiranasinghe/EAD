import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
export default function BackOfficers() {
  const [backofficers, setBackOfficers] = useState([]);
  const [bkid, setBkid] = useState("");

  //handle the delete modal
  const handleModal = (hide) => {
    const deleteModal = document.querySelector(".delete-modal");
    if (deleteModal) {
      if (hide) {
        deleteModal.classList.add("hidden");
      } else {
        deleteModal.classList.remove("hidden");
      }
    }
  };
  //open the delete modal
  const openDeleteModal = (id) => {
    setBkid(id);
    handleModal(false);
  };
  
  //delete backofficer
  const deleteBackofficer = () => {
    fetch("api/backofficer/" + bkid, {
      method: "DELETE",
    })
      .then((r) => {
        console.log("Response for deleting a backofficer:", r);
        handleModal(true);
        window.location.reload();
      })
      .catch((e) => console.log("Error deleting a  traveller"));
  };
  useEffect(() => {
    fetch("api/backofficer")
      .then((r) => r.json())
      .then((d) => {
        console.log("The backofficers are ", d);
        setBackOfficers(d);
      })
      .catch((e) => console.log("The error fetching all travellers", e));
  }, []);

  return (
    <main className="container mt-5">
      <h1>Train Ticket Reservation Management</h1>
      <a className="btn btn-primary mb-3" href="/new-backofficer">
        Create Backofficer
      </a>

      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>NIC</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Contact No</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {backofficers.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                Loading...
              </td>
            </tr>
          ) : (
            backofficers.map((backofficer) => (
              <tr key={backofficer.id}>
                <td>{backofficer.nic}</td>
                <td>{backofficer.firstName}</td>
                <td>{backofficer.lastName}</td>
                <td>{backofficer.email}</td>
                <td>{backofficer.gender === 0 ? "Female" : "Male"}</td>
                <td>{backofficer.contactNo}</td>
                <td>
                  <a href={"/edit-backofficers?id=" + backofficer.id}>
                    <button className="btn btn-warning mx-1">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </a>

                  <button
                    onClick={() => {
                      openDeleteModal(backofficer.id);
                    }}
                    className="btn btn-danger mx-1"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <section className="delete-modal hidden">
        <div className="modal-item">
          <h3>Delete Backofficer</h3>
          <p>Are you sure you want to delete this backofficer ?</p>
          <div className="row mt-20 justify-btw">
            <div
              className="btn cancel"
              onClick={() => {
                handleModal(true);
              }}
            >
              Cancel
            </div>
            <div className="btn delete" onClick={deleteBackofficer}>
              Delete
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
