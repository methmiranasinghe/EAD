import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import stations from "../constants/stations";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TicketBooking() {
    // const [travellers, setTravellers] = useState([]);
    // const [tid, setTid] = useState("");
    const [startDate, setStartDate] = useState(new Date());

    const [showModal, setShowModal] = useState(false);

    const handleModalOpen = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

   

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
                    
                </tbody>
            </table>
     

        </main>
    )
}

export default TicketBooking