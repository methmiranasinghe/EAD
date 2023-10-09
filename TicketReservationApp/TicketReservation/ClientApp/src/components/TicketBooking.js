import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import stations from "../constants/stations";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TicketBooking() {
    const [travellers, setTravellers] = useState([]);
    const [tid, setTid] = useState("");
    const [startDate, setStartDate] = useState(new Date());

    const [showModal, setShowModal] = useState(false);

    const handleModalOpen = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleModal = (hide) => {
        const deleteModal = document.querySelector(".delete-modal");
        if (deleteModal) {
            if (hide) {
                deleteModal.classList.add("hidden");
            }
            else {
                deleteModal.classList.remove("hidden");
            }
        }
    }
    const openDeleteModal = (id) => {
        setTid(id)
        handleModal(false);
    }
    const deleteTraveller = () => {

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

    const handleOrigin = e => {

    }

    return (
        <main className="container mt-5">
            <div style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 25 }}>

                <h1 style={{ display: 'inline' }}>Ticket Booking</h1>
                <button type="button" className="btn btn-primary" onClick={handleModalOpen} style={{ float: "right" }}>
                    Create New Booking
                </button>


                {/* Modal */}
                <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">New Booking</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClose}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <div className="mb-3 d-flex align-items-center">
                                    <label className="form-label me-2">Origin: </label>
                                    <select name="origin" className="form-select" onChange={handleOrigin}>
                                        {
                                            stations.map((item) => <option value={item.name} id={item.name} key={item.name}>{item.name}</option>)
                                        }
                                    </select>

                                </div>
                                <div className="mb-3 d-flex align-items-center">
                                    <label className="form-label me-2">Destination: </label>
                                    <select name="origin" className="form-select" onChange={handleOrigin}>
                                        {
                                            stations.map((item) => <option value={item.name} id={item.name} key={item.name}>{item.name}</option>)
                                        }
                                    </select>

                                </div>
                                <div className="mb-3 d-flex align-items-center">
                                    <label className="form-label me-2">Date: </label>
                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect />

                                </div>

                                <div className="mb-3 d-flex align-items-center">
                                    <label className="form-label me-2">Train: </label>
                                    <select name="origin" className="form-select" onChange={handleOrigin}>
                                        {
                                            stations.map((item, i) => <option value={item.name} id={item.name} key={item.name}>Train {i+1}</option>)
                                        }
                                    </select>

                                </div>


                                
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleModalClose}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Modal */}

            </div>
            <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Train</th>
                        <th>Reservation Date</th>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Date Created</th>
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
            {/* <section className="delete-modal hidden">
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
      </section> */}

        </main>
    )
}

export default TicketBooking