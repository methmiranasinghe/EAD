import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
//Manage Travellers
export default function Travellers() {

  const [travellers, setTravellers] = useState([]);
  const [tid, setTid] = useState("");

  //handle delete modal
  const handleModal = (hide)=>{
    const deleteModal = document.querySelector(".delete-modal");
    if (deleteModal){
      if(hide){
        deleteModal.classList.add("hidden");
      }
      else{
        deleteModal.classList.remove("hidden");
      }
    }
  }
  //open the delete modal
  const openDeleteModal = (id)=>{
    setTid(id)
    handleModal(false);
  }
  //delete traveller
  const deleteTraveller = ()=>{

    fetch("api/traveller/" + tid, {
      method: "DELETE",
     }).then((r) => {
        console.log("Response for deleting a traveller:", r);
        handleModal(true)
        window.location.reload()
      })
      .catch((e) => console.log("Error deleting a traveller"));
  }
  useEffect(() => {
    fetch("api/traveller")
      .then((r) => r.json())
      .then((d) => {
        console.log("The travellers are ", d);
        setTravellers(d);
      })
      .catch((e) => console.log("The error fetching all travllers", e));
  }, []);

  return (
    <main className="container mt-5">
      <h1>Train Ticket Reservation Management</h1>
      <a className="btn btn-primary mb-3" href="/new-traveller">
        Create Traveller
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
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {travellers.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                Loading...
              </td>
            </tr>
          ) : (
            travellers.map((traveller) => (
              <tr key={traveller.id}>
                <td>{traveller.nic}</td>
                <td>{traveller.firstName}</td>
                <td>{traveller.lastName}</td>
                <td>{traveller.email}</td>
                <td>{traveller.gender === 0 ? "Female" : "Male"}</td>
                <td>{traveller.contactNo}</td>
                <td
                  style={{
                    backgroundColor:
                      traveller.status === false ? "red" : "white",
                  }}
                >
                  {traveller.status ? "Active" : "Inactive"}
                </td>
                <td>
                  <a href={"/edit-travellers?id=" + traveller.id}>
                    <button className="btn btn-warning mx-1">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </a>

                  <button
                    onClick={() => {
                      openDeleteModal(traveller.id);
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
          <h3>Delete Traveller</h3>
          <p>Are you sure you want to delete this traveller ?</p>
          <div className="row mt-20 justify-btw">
            <div className="btn cancel" onClick={() =>{handleModal(true)}}>
              Cancel
            </div>
            <div className="btn delete" onClick={deleteTraveller}>
              Delete
            </div>
          </div>
        </div>
      </section>
      
    </main>
  );
}