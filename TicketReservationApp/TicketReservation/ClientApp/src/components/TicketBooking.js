import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import stations from "../constants/stations";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import { reservations } from "../data/data";
import apiCall from "../utils/apiCall";

function TicketBooking() {
    // const [travellers, setTravellers] = useState([]);
    // const [tid, setTid] = useState("");
    const {state} = useLocation();
    const {id , name} = state;

    const [origin , setOrigin] = useState("");
    const [destination , setDestination] = useState("");
    const [train , setTrain] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [isUpdate , setIsUpdate] = useState(false);
    const [bookingId,setBookingId]=useState("");

    const [showModal, setShowModal] = useState(false);

    const [data , setData] = useState([]);

    

    // schedule 
    const [allSchedules , setAllSchedules]  = useState([]);
    const [schedules , setSchedules ] = useState([]);
    const loadSchedules = async () => {
        try {
            const schedules = await apiCall('get','api/trainschedule');
            console.log('schdels ',schedules);
            setAllSchedules(schedules);
        } catch (error) {
            console.log('err ',error);
        }
    }

    function filterDataByStations() {
        // Use the filter method to create a new array with items that meet the condition
        const filteredData = allSchedules.filter(item => {
            console.log('item inside filter ',item)
            // Check if both station1 and station2 are available in the stops array
            const hasStation1 = item.stops.some(stop => stop.station === origin);
            const hasStation2 = item.stops.some(stop => stop.station === destination);
            const itemDate = new Date(item.date);
    //         const dateParts = item.date.match(/\d+/g);
    // const itemDate = new Date(
    //   Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2], dateParts[3], dateParts[4])
    // );
            const onDate = itemDate.toLocaleDateString() === startDate.toLocaleDateString();

            return hasStation1 && hasStation2 && onDate;
        });

        return filteredData;
    }

    const filterSchedules = () => {
        if(allSchedules.length && origin && destination && startDate){
            const filetedData = filterDataByStations();
            console.log('filted data ',filetedData);
            if(filetedData.length){
                setSchedules(filetedData);
            }else{
                setSchedules([]);
            }
        }else{
            console.log('filter not applied')
        }
    }

    useEffect(() => {
        filterSchedules();
    },[allSchedules, origin, destination , startDate])

   

    // useEffect(() => {
    //     setData(reservations);
    // },[])


    const handleModalOpen = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setIsUpdate(false);
        setShowModal(false);
        setBookingId("");
    };

   

    const handleOrigin = e => {
        setOrigin(e.target.value)
    }

    const handleDestination = e => {
        setDestination(e.target.value)
    }

    const handleDateSelect = d => {
        setStartDate(d);
    }
    const handleTrain = e => {
        console.log('selected train2 ',schedules[e.target.value])
        if(e.target.selectedIndex > 0){
            console.log('selected train ',schedules[e.target.selectedIndex-1])
            setTrain(schedules[e.target.selectedIndex-1])
        }else{
            setTrain(null);
        }
    }

    const submitData = async () => {
        try {
            if(!train) return alert("Select train");
            console.log('submit train data ',train);
            console.log('submit train data name',train.name);
            console.log('submit train data id',train.id);
            const data = {
                origin,
                destination,
                trainId: {
                    id: train.id,
                    name: train.name
                },
                reservationDate: startDate,
                timestamp: new Date(),
                userId: id,
                scheduleId: train.id
            };
            let response;
            if(isUpdate){
                response = await apiCall('put', 'api/booking/'+bookingId, data);
            }else{
                response = await apiCall('post', 'api/booking', data);
            }
            console.log('response ',response);
            handleModalClose();
            loadBookings()
        } catch (error) {
            console.log('add schdle erro ',error);
        }
    }

    const handleSubmit = () => {
        if(origin === "") return alert("Origin is required!");
        if(destination === "") return alert("Destination is required!");
        if(train === "") return alert("Train is required!");
        submitData();
    }

    const handleDelete = async id => {
        try {
            const response = await apiCall('delete', 'api/booking/'+id);
            console.log('delete response ',response);
            loadBookings();
        } catch (error) {
            console.log('error delete booking ',error)
        }
    }

    const handleUpdate = async data => {
        setIsUpdate(true)
        setOrigin(data.origin);
        setDestination(data.destination);
        setTrain("");
        setStartDate(new Date(data.reservationDate));
        setShowModal(true);
        setBookingId(data.id);

        console.log("data:::", data)
    }

    const getArrivalTime = obj => {
        const a = obj.stops.filter(item => item.station === origin)
        console.log('a ',a);
        return a[0];
    }

    const renderModal = () => {
        return(
 <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
 <div className="modal-dialog" role="document">
     <div className="modal-content">
         <div className="modal-header">
             <h5 className="modal-title">{isUpdate ? "Update" : "New"} Booking</h5>
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
                 <select name="origin" className="form-select" onChange={handleTrain}
                 >
                     <option value={""}>Select</option>
                     {
                        schedules.length ?
                         schedules.map((item, i) => <option value={item._id} id={item._id} key={item._id}>{item.train?.name} {new Date(item.date).toLocaleDateString()} {getArrivalTime(item)?.time} </option>)
                         : null
                     }
                 </select>

             </div>


             
         </div>
         <div className="modal-footer">
             <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Close</button>
             <button type="button" className="btn btn-primary" onClick={handleSubmit}>{isUpdate ? "Update": "Submit"}</button>
         </div>
     </div>
 </div>
</div>

        )
    }

    const loadBookings = async () => {
        try {
            const response = await apiCall('get', "api/booking");
            const userBookings = [];
            if(response){
                response.map(r => {
                    if(r.userId === id){
                        userBookings.push(r);
                    }
                });
                setData(userBookings);
            }else{
                setData([])
            }
        } catch (error) {
            console.log('error ',error)
        }
    }


    

    useEffect(()=> {
        loadBookings();
        loadSchedules()
    },[])

    return (
        <main className="container mt-5">
            <div style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 25 }}>

                <h1 style={{ display: 'inline' }}>Ticket Bookings of {name}</h1>
                <button type="button" className="btn btn-primary" onClick={handleModalOpen} style={{ float: "right" }}>
                    Create New Booking
                </button>

            {renderModal()}
               

            </div>
            <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
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
                        data?.length &&
                        data?.map(item => {
                            console.log('table row data ',item)
                            return(
                <tr key={item.id}>
                        <td>{item.trainId.name}</td>
                        <td>{new Date(item.reservationDate).toDateString()}</td>
                        <td>{item.origin}</td>
                        <td>{item.destination}</td>
                        <td>{new Date(item.timestamp).toDateString()}</td>
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
