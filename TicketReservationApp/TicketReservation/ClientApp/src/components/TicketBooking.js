import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import stations from "../constants/stations";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import { reservations } from "../data/data";

function TicketBooking() {
    // const [travellers, setTravellers] = useState([]);
    // const [tid, setTid] = useState("");

    const {state} = useLocation();
    const {id} = state;

    const [origin , setOrigin] = useState("");
    const [destination , setDestination] = useState("");
    const [train , setTrain] = useState("");
    const [startDate, setStartDate] = useState(new Date());

    const [showModal, setShowModal] = useState(false);

    const [data , setData] = useState([]);

    useEffect(() => {
        setData(reservations);
    },[])


    const handleModalOpen = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

   

    const handleOrigin = e => {
        setOrigin(e.target.value)
    }

    const handleDestination = e => {
        setDestination(e.target.value)
    }

    const handleDateSelect = d => {
        setStartDate(d);
        console.log(d)
    }
    const handleTrain = e => {
        setTrain(e.target.value);
    }

    const handleSubmit = () => {
        if(origin === "") return alert("Origin is required!");
        if(destination === "") return alert("Destination is required!");
        if(train === "") return alert("Train is required!");
        setShowModal(false);
        alert("Submitted");
    }

    const handleDelete = id => {
        const oldData = [...data];
        oldData.pop();
        setData(oldData);
    }

    const handleUpdate = data => {
        setOrigin(data.origin);
        setDestination(data.destination);
        setTrain(data.train.name);
        setStartDate(new Date(data.reservationDate));
        setShowModal(true);
    }

    const renderModal = () => {
        return(
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
                 <select name="origin" className="form-select" onChange={handleOrigin} value={origin}>
                 <option value={""}>Select</option>
                     {
                         stations.map((item) => <option value={item.name} id={item.name} key={item.name}>{item.name}</option>)
                     }
                 </select>

             </div>
             <div className="mb-3 d-flex align-items-center">
                 <label className="form-label me-2">Destination: </label>
                 <select name="origin" className="form-select" value={destination} onChange={handleDestination} disabled={origin === ""} >
                 <option value={""}>Select</option>
                     {
                         stations.map((item) => <option value={item.name} id={item.name} key={item.name}>{item.name}</option>)
                     }
                 </select>

             </div>
             <div className="mb-3 d-flex align-items-center">
                 <label className="form-label me-2">Date: </label>
             <DatePicker selected={startDate} onChange={(date) => handleDateSelect(date)} />

             </div>

             <div className="mb-3 d-flex align-items-center">
                 <label className="form-label me-2">Train: </label>
                 <select name="origin" className="form-select" onChange={handleTrain} value={train}>
                     <option value={""}>Select</option>
                     {
                         stations.map((item, i) => <option value={item.name} id={item.name} key={item.name}>Train {i+1}</option>)
                     }
                 </select>

             </div>


             
         </div>
         <div className="modal-footer">
             <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Close</button>
             <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
         </div>
     </div>
 </div>
</div>

        )
    }

    return (
        <main className="container mt-5">
            <div style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 25 }}>

                <h1 style={{ display: 'inline' }}>Ticket Bookings - User ID - {id}</h1>
                <button type="button" className="btn btn-primary" onClick={handleModalOpen} style={{ float: "right" }}>
                    Create New Booking
                </button>

            {renderModal()}
               

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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(item => {
                            return(
                <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.train.name}</td>
                        <td>{item.reservationDate.toDateString()}</td>
                        <td>{item.origin}</td>
                        <td>{item.destination}</td>
                        <td>{item.timestamp.toDateString()}</td>
                        <td>
                        <button type="button" class="btn btn-warning btn-sm" onClick={() => handleUpdate(item)}>Update</button>
                        <button type="button" class="btn btn-danger btn-sm" style={{marginLeft:10}} onClick={() => handleDelete(item.id)} >Delete</button>
                        </td>
                    </tr>

                            )
                        })
                    }
                </tbody>
            </table>
     

        </main>
    )
}

export default TicketBooking;
